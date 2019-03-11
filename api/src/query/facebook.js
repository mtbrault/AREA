import utils from './utils';
import pool from '../db/pool';

async function getListAction(userId) {
    let actionData = await utils.getActionsFromUser(userId, 2);
    return actionData;
}

async function getReactionList(actionID) {
    var listReaction = await utils.getReactionsFromAction(actionID);
    return listReaction;
}

function triggerReactions(data) {
    console.log('facebook triggered')
    getReactionList(data.id).then((res) => {
        console.log('res', res)
        if (res) {
            utils.execGoodReaction(res);
        }
    })
}

function facebookManager(fbData, userID) {
    getListAction(userID).then((res) => {
        res.map((data) => {
            if (fbData) {
                console.log("here =>", fbData)
                if (fbData.changes[0].field == 'status' && data.nom == 'On user post') {
                    triggerReactions(data)
                } else if (fbData.changes[0].field == 'feed' && data.nom == 'On user like') {
                    triggerReactions(data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
    });
}

const getUserId = (fbId) => {
    return pool.query("SELECT fk_users FROM services WHERE user_serviceid = '$1' AND nom = 'facebook'", [fbId], (err, res) => {
        if (res && res.rows && res.rows.length) {
            return res.rows[0].fk_users
        } else {
            console.log(err)
            return (null)
        }
    })
}

const facebookPost = (req, res) => {
    let body = req.body;

    if (body.object === 'user') {
        body.entry.forEach(function (entry) {
            if (entry) {
                console.log(entry);
                pool.query("SELECT fk_users FROM services WHERE user_serviceid = $1 AND nom = 'facebook'", [entry.id], (err, res) => {
                    if (res && res.rows && res.rows.length) {
                        facebookManager(entry, res.rows[0].fk_users)
                    } else {
                        console.log("error => ", err, res)
                        return (null)
                    }
                })
            }
        })
        res.status(200).send('EVENT_RECEIVED');
    } else if (body.object === 'page') {
        body.entry.forEach(function (entry) {
            if (entry) {
                facebookDetectPage(entry);
            }
        })
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
};

const facebookGet = (req, res) => {
    let challenge = req.query['hub.challenge'];
    res.status(200).send(challenge);
};

export default {
    facebookPost,
    facebookGet
}