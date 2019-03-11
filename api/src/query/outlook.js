import outlook from 'node-outlook';
import pool from '../db/pool';
import moment from 'moment';
import schedule from 'node-schedule';
import utils from './utils';

var queryParams = {
    '$select': 'Subject,ReceivedDateTime,From',
    '$orderby': 'ReceivedDateTime desc',
    '$top': 1
};

async function getListAction(userId) {
    let actionData = await utils.getActionsFromUser(userId, 3);
    return actionData;
}

async function getReactionList(actionID) {
    var listReaction = await utils.getReactionsFromAction(actionID);
    return listReaction;
}

function triggerReactions(data) {
    console.log('triggered')
    getReactionList(data.id).then((res) => {
        console.log('res', res)
        if (res) {
            utils.execGoodReaction(res);
        }
    })
}

function convertDate(dateParam2) {
    let date = dateParam2.split('T');
    date[1] = date[1].substr(0, date[1].length - 1);
    let dateResult = moment(date[0] + " " + date[1]);
    return dateResult;
}

function datePassing(dateParam, userID) {
    let date = dateParam.split('T');
    date[1] = date[1].substr(0, date[1].length - 1);
    let newDate = moment(date[0] + " " + date[1]);
    pool.query('SELECT * from outlook WHERE fk_user = $1', [userID], (err, res) => {
        if (res.rows[0]) {
            const oldDate = res.rows[0].date_pulling;
            const idOldDate = res.rows[0].id;
            const bool = newDate.isAfter(convertDate(oldDate));
            if (bool) {
                console.log("NEW MAIL DETECTED");
                pool.query('UPDATE outlook SET date_pulling = $1 WHERE id = $2', [dateParam, idOldDate], (error, results) => {
                    if (results) {
                        console.log("New mail sucessly updated futur result for bad email should be false");
                    }
                })
                getListAction(userID).then((res) => {
                    res.map((data) => {
                        if (data.nom === "On mail receive") {
                            triggerReactions(data)
                        }
                    });
                });
            } else {
                console.log("OUTLOOK: NO NEW MAIL")
            }
        } else if (userID) {
            console.log("bf", userID)
            pool.query(`INSERT INTO outlook (date_pulling, fk_user) VALUES ($1, $2)`, [dateParam, userID], (err, res) => {
                if (!res) {
                    console.log(err)
                }
            })
        }
    })
}

function sendNewMail(id, sendTo, text) {
    pool.query("SELECT access_token FROM services WHERE fk_users = $1 AND nom = 'outlook'", [id], (err, res) => {
        if (err || !res || !res.rows.length)
            return console.log(err, res, id)
        var newMsg = {
            Subject: 'AREA message',
            Importance: 'Low',
            Body: {
                ContentType: 'HTML',
                Content: text
            },
            ToRecipients: [
                {
                    EmailAddress: {
                        Address: sendTo
                    }
                }
            ]
        };

        outlook.mail.sendNewMessage({ token: res.rows[0].access_token, message: newMsg },
            function (error, result) {
                if (error) {
                    console.log('sendNewMessage returned an error: ' + error);
                }
                else if (result) {
                    console.log(JSON.stringify(result, null, 2));
                }
            });
    })
}

function outlookNewMailDetect() {
    pool.query("SELECT id, access_token, fk_users from services WHERE nom = 'outlook'", (err, results) => {
        if (results) {
            results.rows.map(data => {
                const token = data.access_token;
                outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
                outlook.mail.getMessages({
                    token: token, odataParams: queryParams
                }, function (error, result) {
                    if (error && error.toString().indexOf('TokenExpired') !== 1) {
                        return pool.query("DELETE FROM services WHERE id = $1", [data.id], (err, res) => {
                            console.log(err ? err : ("DELETED outdated outlook token " + data.id))
                        })
                    } else if (error) {
                        console.log('Outlook Area - Error detected' + error);
                    }
                    else if (result) {
                        result.value.forEach(function (message) {
                            datePassing(message.ReceivedDateTime.toString(), data.fk_users);
                        });
                    }
                });
            })
        }
    })
}

schedule.scheduleJob('*/10 * * * * *', function () {
    console.log("OUTLOOK WEBHOOK RUN");
    outlookNewMailDetect();
});


export default {
    sendNewMail
}