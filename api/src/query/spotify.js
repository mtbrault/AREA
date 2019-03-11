import pool from '../db/pool';
import SpotifyWebApi from 'spotify-web-api-node';
import utils from './utils';
import schedule from 'node-schedule';

var spotifyApi = new SpotifyWebApi({
    clientId: 'fcecfc72172e4cd267473117a17cbd4d',
    clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
    redirectUri: 'http://localhost:8080/spotify/callback'
});

async function getListAction(userId) {
    let actionData = await utils.getActionsFromUser(userId, 6);
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

function spotifyCheckNewFollowers(userID) {
    spotifyApi.getMe()
        .then((data) => {
            const newFollowers = data.body.followers.total;
            pool.query('SELECT * from spotify_followers WHERE fk_user = $1', [userID], (err, res) => {
                if (res.rows[0]) {
                    const oldFollowers = res.rows[0].followers_nbr;
                    const idOldFollowers = res.rows[0].id;
                    const bool = newFollowers > oldFollowers;
                    if (bool) {
                        console.log("SPOTIFY : NEW FOLLOWERS");
                        pool.query('UPDATE spotify_followers SET followers_nbr = $1 WHERE id = $2', [newFollowers, idOldFollowers], (error, results) => {
                            if (results) {
                                getListAction(userID).then((res) => {
                                    res.map((data) => {
                                        if (data.nom === "On new follower") {
                                            triggerReactions(data)
                                        }
                                    });
                                });
                            }
                        })
                    } else {
                        console.log("SPOTIFY: NO NEW FOLLOWERS")
                    }
                } else {
                    pool.query(`INSERT INTO spotify_followers (followers_nbr, fk_user) VALUES ($1, $2)`, [newFollowers, userID], (err, res) => {
                        if (res) {
                            console.log(res);
                        } else {
                            console.log(err)
                        }
                    })
                }
            }, function (err) {
                console.log('Something went wrong!', err);
            });
        }).catch((err) => {
            console.log(err)
        })

}

function spotifyWebhook() {
    console.log("SPOTIFY WEBHOOK RUN")
    pool.query(`SELECT fk_users, access_token, user_serviceid from services WHERE nom = 'spotify'`, (error, results) => {
        if (results) {
            results.rows.forEach((data) => {
                const token = data.access_token;
                spotifyApi.setAccessToken(token);
                spotifyCheckNewFollowers(data.fk_users);
            })
        }
    })
}

schedule.scheduleJob('*/10 * * * * *', function () {
    spotifyWebhook();
});