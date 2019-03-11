import pool from '../db/pool';
import Joi from 'joi';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import JoiSchema from '../schema/userSchema';

const initDatabase = (request, response) => {
    pool.query(`CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(255) NOT NULL, email VARCHAR(30) NOT NULL, password VARCHAR(255) NOT NULL)`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table user déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table user.");
        }
    })

    pool.query(`CREATE TABLE service_list(id SERIAL PRIMARY KEY, nom VARCHAR(20) NOT NULL, color VARCHAR(6))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table service_list déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table service_list.");
            pool.query(`INSERT INTO service_list (nom, color) VALUES ('twitter', '00abec'), ('facebook', '3b579d'), ('outlook', '0072c6'), ('trello', '3C5DC3'), ('instagram', 'EC005B'), ('spotify', '00f252')`, (err, res) => {
                if (err) {
                    console.log("Could not populate table service_list", err)
                } else {
                    console.log("Populated table service_list")
                }
            })
        }
    })

    pool.query(`CREATE TABLE services(id SERIAL PRIMARY KEY, nom VARCHAR(20) NOT NULL, access_token VARCHAR(10000) NOT NULL, fk_users INT NOT NULL, username VARCHAR(20), profile_img VARCHAR(200), user_serviceid VARCHAR(200))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table services déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table services.");
        }
    })

    pool.query(`CREATE TABLE outlook(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, date_pulling VARCHAR(200))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table services déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table outlook.");
        }
    })

    pool.query(`CREATE TABLE spotify_followers(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, followers_nbr VARCHAR(200))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table services déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table spotify followers.");
        }
    })

    pool.query(`CREATE TABLE instagram_post(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, insta_nbr VARCHAR(200))`).then((res) => {
        console.log("Table insta_post");
    }).catch((err) => {
        if (err) {
            if (err.code == "42P07") {
                console.log("Table insta_post déjà existante.");
            }
        }
    })

    pool.query(`CREATE TABLE instagram_follow(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, insta_nbr VARCHAR(200))`).then((res) => {
        console.log("Table insta_follow");
    }).catch((err) => {
        if (err) {
            if (err.code == "42P07") {
                console.log("Table insta_follow déjà existante.");
            }
        }
    })

    pool.query(`CREATE TABLE instagram_followers(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, insta_nbr VARCHAR(200))`).then((res) => {
        console.log("Table insta_followers");
    }).catch((err) => {
        if (err) {
            if (err.code == "42P07") {
                console.log("Table insta_followers déjà existante.");
            }
        }
    })

    pool.query(`CREATE TABLE trello_boards(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, boards_nbr VARCHAR(200))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table services déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table trello boards.");
        }
    })

    pool.query(`CREATE TABLE spotify_playlist(id SERIAL PRIMARY KEY, fk_user INT NOT NULL, playlist_name VARCHAR(200))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table services déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table spotify playlist.");
        }
    })

    pool.query(`CREATE TABLE action_types(id SERIAL PRIMARY KEY, nom VARCHAR(40) NOT NULL, fk_services INT NOT NULL, param BOOLEAN)`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table action_types déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table action_types.");
            // ACTIONS SET
            pool.query(`INSERT INTO action_types (nom, fk_services, param) VALUES ('On tweet', 1, false), ('On tweet from X', 1, true), ('On #X call', 1, true), ('On new follower', 6, false), ('On new board', 4, false), ('On mail receive', 3, false), ('On user like', 2, false), ('On user post', 2, false), 
                        ('On new post inta', 5, false), ('On new follow insta', 5, false), ('On new followers insta', 5, false)`, (error, results) => {
                    if (error) {
                        console.log(error)
                    }
                    if (results) {
                        console.log("Table action_types populated");
                    }
                })

        }
    })

    pool.query(`CREATE TABLE reaction_types (id SERIAL PRIMARY KEY, nom VARCHAR(40) NOT NULL, fk_services INT NOT NULL, param BOOLEAN)`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table reaction_types déjà existante.");
            }
        }
        if (results) {
            pool.query(`INSERT INTO reaction_types (nom, fk_services, param) VALUES ('Tweet X', 1, true), ('On tweet with X', 1, true), ('Mail X', 3, true), ('Add List X to Board X', 4, true), ('Add Card to List X from Board X', 4, true)`).then((res) => {
                console.log("Successly added reaction types for all services");
            }).catch((err) => {
                console.log(err);
            })
            console.log("Création de la table reaction types.");
        }
    })

    pool.query(`CREATE TABLE actions(id SERIAL PRIMARY KEY, fk_types INT NOT NULL, fk_users INT NOT NULL, param VARCHAR(100))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table action déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table action.");
        }
    })

    pool.query(`CREATE TABLE reactions(id SERIAL PRIMARY KEY, fk_types INT NOT NULL, fk_actions INT NOT NULL, fk_users INT NOT NULL, param VARCHAR(100))`, (error, results) => {
        if (error) {
            if (error.code == "42P07") {
                console.log("Table reactions déjà existante.");
            }
        }
        if (results) {
            console.log("Création de la table reactions.");
        }
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

function sendResponse(validate, message) {
    return ({ validate, message });
}

const createUser = (request, response) => {
    console.log(request.body);
    const { username, email, password } = request.body
    const joiResult = Joi.validate({ username, email, password }, JoiSchema.userCreateSchema);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!joiResult.error) {
        pool.query('SELECT * FROM users WHERE email = $1', [email])
            .then((res) => {
                if (res.rowCount == 0) {
                    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hash], (error, results) => {
                        if (error) {
                            console.log("Impossible de créer l'utilisateur suivant " + request.body);
                            throw error
                        }
                        response.status(201).send(sendResponse(true, "Utilisateur créé"));
                    })
                } else {
                    response.status(500).send(sendResponse(false, "Email déjà existant"));
                }
            }).catch((err) => console.log(err))
    } else {
        response.status(500).send(sendResponse(false, joiResult.error.message));
    }
}

const loginUser = (request, response) => {
    const { email, password } = request.body
    const joiResult = Joi.validate({ email, password }, JoiSchema.userLoginSchema);

    console.log("==== LOGIN USER ====")
    if (!joiResult.error) {
        pool.query('SELECT * FROM users WHERE email = $1', [email])
            .then((res) => {
                if (res.rowCount == 1) {
                    if (bcrypt.compareSync(password, res.rows[0].password)) {
                        const payload = {
                            id: res.rows[0].id,
                            username: res.rows[0].username,
                            email: email
                        };
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) {
                                console.error('There is some error in token', err);
                                response.status(500).send(sendResponse(false, "Problème de token serveur."));
                            } else {
                                let obj = sendResponse((true), "Connexion réussi");
                                obj.token = token;
                                response.status(201).send(obj);
                            }
                        })
                    } else {
                        response.status(500).send(sendResponse(false, "Mauvais mot de passe."));
                    }
                } else {
                    response.status(500).send(sendResponse(false, "Votre email ne corresponds à aucun compte."));
                }
            }).catch((err) => console.log(err))
    } else {
        response.status(500).send(sendResponse(false, joiResult.error.message));
    }
}

const setServiceToken = (req, res) => {
    let data = req.body.res;
    const user = {
        name: data.name,
        access_token: data.accessToken,
        serviceName: req.body.serviceName,
        photo: data.picture.data.url,
        serviceID: data.id
    }
    let token = req.headers.authorization;
    let alreadyExist = false;
    let newToken = token.replace("JWT ", "");
    jwt.verify(newToken, 'secret', function (err, success) {
        if (err) {
            return res.
                status(401).
                end('Unauthorized, invalidtoken');
        } else {
            const { id } = success;

            pool.query('SELECT * from services WHERE fk_users = $1', [id], (error, results) => {
                if (!error) {
                    if (results.rows) {
                        results.rows.map(async (res, index) => {
                            if (res.nom === user.serviceName) {
                                alreadyExist = true;
                            }
                        })
                        if (alreadyExist === false) {
                            pool.query('INSERT INTO services (nom, access_token, fk_users, username, profile_img, user_serviceid) VALUES ($1, $2, $3, $4, $5, $6)', [user.serviceName, user.access_token, id, user.name, user.photo, user.serviceID], (error, results) => {
                                console.log("Token has been added into database services " + user.serviceName);
                            })
                        } else {
                            pool.query('UPDATE services SET nom = $1, access_token = $2, username = $4, profile_img = $5, user_serviceid = $6 WHERE fk_users = $3 AND nom = $1', [user.serviceName, user.access_token, id, user.name, user.photo, user.serviceID], (error, results) => {
                                console.log("Token has been UPDATED into database services " + user.serviceName);
                            })
                        }
                        res.send("OK");
                    }
                } else {
                    console.log(error);
                }
            })
        }
    })
}

const getToken = (req, res) => {
    var token = req.headers.authorization;
    var newToken = token.replace("JWT ", "");
    jwt.verify(newToken, 'secret', function (err, success) {
        if (err) {
            return res.
                status(401).
                end('Unauthorized, invalidtoken');
        } else {
            const { id } = success;
            pool.query('SELECT * from services WHERE fk_users = $1', [id], (error, results) => {
                if (!error) {
                    if (results.rows) {
                        res.send(results.rows);
                    }
                } else {
                    console.log(error);
                    end('Bad user, undefined');
                }
            })
        }
    })
}

const getActions = (id, req, res) => {
    pool.query('SELECT action_types.*, color FROM action_types JOIN service_list ON service_list.id = action_types.fk_services WHERE service_list.nom = $1', [req.service], (err, typeRes) => {
        if (err) {
            console.log(err);
            res.send('Bad service, undefined');
        } else {
            pool.query('SELECT actions.id, fk_types, fk_users, fk_services, action_types.nom, actions.param, color, (SELECT COUNT(*) FROM reactions WHERE fk_actions = actions.id) FROM actions JOIN action_types ON actions.fk_types = action_types.id INNER JOIN service_list ON action_types.fk_services = service_list.id WHERE fk_users = $1 AND service_list.nom = $2', [id, req.service], (error, results) => {
                if (!error) {
                    res.send({ types: typeRes.rows, data: results.rows })
                } else
                    res.send('Bad user, undefined');
            })
        }
    })
}

const getReactions = (id, req, res) => {
    const actionId = req.body.actionId
    pool.query('SELECT reaction_types.id, reaction_types.nom, param, fk_services, service_list.nom AS servicename, service_list.color from reaction_types JOIN service_list ON service_list.id = reaction_types.fk_services ORDER BY service_list.id ASC', [], (err, typeRes) => {
        if (err) {
            console.log(err);
            res.send('Bad service, undefined' + err);
        } else {
            console.log(actionId)
            pool.query("SELECT reactions.id, fk_types, fk_users, fk_services, reaction_types.nom, reactions.param, color FROM reactions JOIN reaction_types ON reactions.fk_types = reaction_types.id JOIN service_list ON reaction_types.fk_services = service_list.id WHERE fk_users = $1 AND fk_actions = $2", [id, actionId], (error, results) => {
                if (!error) {
                    pool.query("SELECT nom FROM actions JOIN action_types ON action_types.id = actions.fk_types WHERE actions.id = $1", [actionId], (err, name) => {
                        console.log(name)
                        if (!error && name.rows[0]) {
                            res.send({ name: name.rows[0].nom, types: typeRes.rows, data: results.rows })
                        } else {
                            res.send("Action was deleted")
                        }
                    })
                } else {
                    console.log("Error", error);
                    res.send('Bad user, undefined');
                }
            })
        }
    })
}

const getContent = (req, res) => {
    var token = req.headers.authorization
    var newToken = token.replace("JWT ", "");
    console.log("token is:", token)
    jwt.verify(newToken, 'secret', function (err, success) {
        const { id } = success;
        if (err)
            return res.status(401).end('Unauthorized, invalidtoken');
        else if (req.service != null && req.content != null) {
            if (req.content === "actions")
                return getActions(id, req, res)
            else if (req.content === "reactions" && req.body.actionId)
                return getReactions(id, req, res)
            console.log("=> " + req.content)
            res.send('Bad action, undefined');
        }
    })
}

const addContent = (req, res) => {
    var token = req.headers.authorization;
    var newToken = token.replace("JWT ", "");
    jwt.verify(newToken, 'secret', function (err, success) {
        if (err) {
            return res.send('Unauthorized, invalidtoken');
        } else if (req.service != null && req.content != null && req.body.askType !== undefined) {
            const { id } = success;
            const type = req.body.askType;
            const param = req.body.param === undefined ? null : req.body.param;
            const verifQuery = 'SELECT * FROM ' + (req.content === "actions" ? "action_types" : "reaction_types") + ' WHERE id = $1 AND fk_services = $2'
            pool.query(verifQuery, [type.id, type.fk_services], (err, results) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else if (results.rows.length) {
                    const actionId = req.body.actionId ? req.body.actionId : null;
                    const insertQuery = req.content === "actions" ? 'INSERT INTO actions (fk_types, fk_users, param) VALUES ($1, $2, $3) RETURNING fk_types, fk_users, id, param' :
                        'INSERT INTO reactions (fk_types, fk_users, param, fk_actions) VALUES ($1, $2, $3, $4) RETURNING fk_types, fk_users, id, param'
                    pool.query(insertQuery, (req.content === "actions" ? [type.id, id, param] : [type.id, id, param, actionId]), (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            var toSend = result.rows[0]
                            toSend.nom = results.rows[0].nom
                            toSend.fk_services = type.fk_services
                            toSend.color = type.color
                            res.send(toSend)
                        }
                    })
                } else {
                    res.send('Bad action, undefined');
                }
            })
        } else {
            res.send("Bad user, undefined")
        }
    })
}

const deleteContent = (req, res) => {
    var token = req.headers.authorization;
    var newToken = token.replace("JWT ", "")
    jwt.verify(newToken, 'secret', function (err, success) {
        if (err) {
            return res.send('Unauthorized, invalidtoken', err);
        } else if (req.service != null && req.content != null && req.body.item !== undefined) {
            const { id } = success;
            const type = req.body.item
            const verifQuery = 'SELECT * FROM ' + (req.content === "actions" ? "action_types" : "reaction_types") + ' WHERE id = $1 AND fk_services = $2'
            pool.query(verifQuery, [type.fk_types, type.fk_services], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else if (result.rows.length) {
                    const deleteQuery = 'DELETE FROM ' + (req.content === "actions" ? "actions" : "reactions") + ' WHERE id = $1'
                    pool.query(deleteQuery, [type.id], (err, results) => {
                        if (err)
                            res.send('Could not delete')
                        else {
                            if (req.content === 'actions')
                                pool.query('DELETE FROM reactions WHERE fk_actions = $1 AND fk_users = $2', [type.id, id], (err, result) => {
                                    res.send(err ? 'KO' : 'OK')
                                })
                            else
                                res.send('OK')
                        }
                    })
                } else {
                    res.send("Unknown action");
                }
            })
        } else {
            res.send("Something went wrong")
        }
    })
}

const offAllServices = (req, res) => {
    var token = req.headers.authorization;
    console.log(token);
    var newToken = token.replace("JWT ", "");
    jwt.verify(newToken, 'secret', function (err, success) {
        if (err) {
            return res.
                status(401).
                end('Unauthorized, invalidtoken');
        } else {
            const { id } = success;
            pool.query('DELETE from services WHERE fk_users = $1', [id]).then((results => {
                if (results)
                    res.send("ok")
            })).catch((err) => {
                console.log(err);
            })
        }
    })
}

const sendToken = (req, res) => {
    var token = req.headers.authorization
    var newToken = token.replace("JWT ", "");
    jwt.verify(newToken, 'secret', function (err, success) {
        if (err) {
            return res.
                status(401).
                end('Unauthorized, invalidtoken');
        } else {
            res.send(success)
        }
    })
}

export default {
    initDatabase,
    getUsers,
    createUser,
    loginUser,
    getToken,
    setServiceToken,
    getContent,
    addContent,
    deleteContent,
    offAllServices,
    sendToken
}