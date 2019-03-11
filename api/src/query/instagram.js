import Instagram from 'node-instagram';
import pool from '../db/pool';
import knex from '../db/knex';
import utils from '../query/utils';
import schedule from 'node-schedule';

async function getListAction(userId) {
    let actionData = await utils.getActionsFromUser(userId, 5);
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

async function instagramOnNewPost(instagramManager, userID, instaParam) {
    const dataUser = await instagramManager.get('users/self');
    let newInstaNbr = 0;
    switch (instaParam) {
        case "post":
            newInstaNbr = dataUser.data.counts.media;
            break;
        case "follow":
            newInstaNbr = dataUser.data.counts.follows;
            break;
        case "followers":
            newInstaNbr = dataUser.data.counts.followed_by;
            break;
        default:
            break;
    }

    knex.select('insta_nbr', 'id').from('instagram_' + instaParam).where('fk_user', userID).then((res) => {
        if (res) {
            if (res.length === 0) {
                knex('instagram_' + instaParam).insert({ fk_user: userID, insta_nbr: newInstaNbr }).then((res) => {
                    console.log("INSTAGRAM: First " + insta_param + " number added")
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                const oldInstaNbr = res[0].insta_nbr;
                const oldInstaId = res[0].id;
                const bool = newInstaNbr > oldInstaNbr;
                if (bool) {
                    knex('instagram_' + instaParam).where({ id: oldInstaId }).update({ insta_nbr: newInstaNbr }).then((results) => {
                        if (results) {
                            getListAction(userID).then((res) => {
                                res.map((data) => {
                                    if (data.nom === `On new ${instaParam} ` + 'insta') {
                                        triggerReactions(data)
                                    }
                                });
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log("INSTAGRAM: NO NEW " + instaParam);
                }
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}

function instagramWebhook() {
    pool.query("SELECT id, access_token, fk_users from services WHERE nom = 'instagram'").then((res) => {
        if (res) {
            res.rows.map(data => {
                const token = data.access_token;
                const instagram = new Instagram({
                    clientId: '028beb7af1cb4321a825d15bfca4488f',
                    clientSecret: '1eea656a53094dc49fd5bdbf145b88f8',
                    accessToken: token,
                });
                const instaParam = ['post', 'follow', 'followers'];
                instaParam.forEach(element => {
                    instagramOnNewPost(instagram, data.fk_users, element);
                });
            })
        }
    }).catch((err) => {
        console.log("Instagram ERROR ----- ", err)
    })
}


schedule.scheduleJob('*/10 * * * * *', function () {
    instagramWebhook();
});