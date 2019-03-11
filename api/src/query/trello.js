import Trello from 'trello';
import pool from '../db/pool';
import knex from '../db/knex';
import utils from '../query/utils';
import schedule from 'node-schedule';

async function getListAction(userId) {
    let actionData = await utils.getActionsFromUser(userId, 4);
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

function addListBoard(userID, nameBoard, nameList) {
    console.log(userID, nameBoard, nameList);
    const accessKey = '6024d5f22a41615485463eec6095dde8';
    knex.select('access_token').from('services').where('fk_users', userID).then((res) => {
        const token = res[0].access_token;
        var trelloManager = new Trello(accessKey, token);
        trelloManager.makeRequest('get', '/1/members/me/boards', { lists: 'open' }).then((res) => {
            if (res !== "invalid token") {
                console.log(res);
                res.map((dataRes) => {
                    if (dataRes.name === nameBoard) {
                        trelloManager.addListToBoard(dataRes.id, nameList).then((res) => {
                            console.log("TRELLO: board added for user")
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                })

            }
        });
    })
}


function addCardBoard(userID, nameBoard, nameList, cardText) {
    const accessKey = '6024d5f22a41615485463eec6095dde8';
    knex.select('access_token').from('services').where('fk_users', userID).then((res) => {
        const token = res[0].access_token;
        var trelloManager = new Trello(accessKey, token);
        trelloManager.makeRequest('get', '/1/members/me/boards', { lists: 'open' }).then((res) => {
            if (res !== "invalid token") {
                res.map((dataRes) => {
                    if (dataRes.name === nameBoard) {
                        dataRes.lists.map((dataList) => {
                            if (nameList === null) {
                                trelloManager.addCard("ACTION DONE", '', dataList.id).then((res) => {
                                    console.log("TRELLO: card added for user")
                                }).catch((err) => {
                                    console.log(err);
                                })
                                return;
                            } else {
                                if (dataList.name === nameList) {
                                    trelloManager.addCard(cardText, '', dataList.id).then((res) => {
                                        console.log("TRELLO: card added for user")
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                    return;
                                }
                            }
                        })
                    }
                })

            }
        });
    })
}


async function detectNewBoard(trelloManager, userID) {
    let newBoardNbr = await trelloManager.makeRequest('get', '/1/members/me/boards').then((res) => {
        return res.length;
    });
    knex.select('boards_nbr', 'id').from('trello_boards').where('fk_user', userID).then((res) => {
        if (res) {
            if (res.length === 0) {
                knex('trello_boards').insert({ fk_user: userID, boards_nbr: newBoardNbr }).then((res) => {
                    console.log("Trello: First boards number added")
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                const oldBoardsNbr = res[0].boards_nbr;
                const oldBoardsId = res[0].id;
                const bool = newBoardNbr > oldBoardsNbr;
                if (bool) {
                    knex('trello_boards').where({ id: oldBoardsId }).update({ boards_nbr: newBoardNbr }).then((results) => {
                        console.log("TRELLO : NEW BOARD")
                        if (results) {
                            getListAction(userID).then((res) => {
                                res.map((data) => {
                                    if (data.nom === "On new board") {
                                        triggerReactions(data)
                                    }
                                });
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log("TRELLO: NO NEW BOARDS");
                }
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}

function trelloWebHook() {
    pool.query("SELECT id, access_token, fk_users from services WHERE nom = 'trello'").then((res) => {
        if (res) {
            res.rows.map(data => {
                const accessKey = '6024d5f22a41615485463eec6095dde8';
                const token = data.access_token;
                var trello = new Trello(accessKey, token);
                detectNewBoard(trello, data.fk_users);
            })
        }
    }).catch((err) => {
        console.log("Trello ERROR ----- ", err)
    })
}


// schedule.scheduleJob('*/10 * * * * *', function () {
trelloWebHook();
// });
export default {
    addListBoard,
    addCardBoard
}