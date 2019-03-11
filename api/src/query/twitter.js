import knex from '../db/knex';
import Twit from 'twit';
import utils from './utils';

const getUsersTwitterID = async () => {
    let actionUserGet = [];
    let twitterUserIDs = [];

    await knex.from('services').select().where('nom', 'twitter').then((res) => {
        if (res) {
            res.map((data) => {
                actionUserGet = [...actionUserGet, { userId: data.fk_users, everyData: data }]
                twitterUserIDs = [...twitterUserIDs, data.user_serviceid]
            })
        }
    }).catch((err) => {
        console.log(err);
        return [];
    });
    return [twitterUserIDs, actionUserGet];
}

var TweetFunc = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: '860467521916456960-6dvO2DQ0deBVw2GfRrS2bxBS21ulVSn',
    access_token_secret: 'wnjK5nM1dsDVcceZ7XZ5VAA3EKmuoJARp9yeAZ3MTmITA'
})

function sendTweetReaction(message) {
    TweetFunc.post('statuses/update', { status: message }).then((res) => {
        console.log("Tweet done.")
    }).catch((err) => {

    })
}

(async () => {
    const value = await getUsersTwitterID();
    const tabID = value[0];
    const userObj = value[1];

    async function getListAction() {
        var listAction = await Promise.all(userObj.map(async (data) => {
            let actionData = { dataAction: await utils.getActionsFromUser(data.userId, 1), dataUserService: data.everyData };
            return actionData;
        }))
        return listAction;
    }

    async function getReactionList(actionID) {
        var listReaction = await utils.getReactionsFromAction(actionID);
        return listReaction;
    }
    var webhookTwitter;
    if (tabID.length === 0) {
        console.log("No tabID detected");
        webhookTwitter = TweetFunc.stream('statuses/filter', { follow: ['860467521916456960'] });
    } else {
        console.log("tabID detected twitters protected from crash");
        webhookTwitter = TweetFunc.stream('statuses/filter', { follow: tabID });
    }

    webhookTwitter.on('tweet', (tweet) => {
        getListAction().then((res) => {
            const serviceid = res[0].dataUserService.user_serviceid
            res[0].dataAction.map((data) => {
                if (data.nom === "On tweet") {
                    if (serviceid === tweet.user.id_str) {
                        getReactionList(data.id).then((res) => {
                            console.log("triggered on tweet")
                            if (res) {
                                utils.execGoodReaction(res);
                            }
                        }).catch(err => console.log(err))
                    }
                } else if (data.nom === "On tweet with X") {
                    if (serviceid === tweet.user.id_str) {
                        console.log("triggered on tweet with x")
                        //Réactions
                        getReactionList(data.id).then((res) => {
                            if (res) {
                                utils.execGoodReaction(res);
                            }
                        }).catch(err => console.log(err))
                    }
                }
            });
        });
    })

})()

export default {
    sendTweetReaction
}