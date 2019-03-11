import pool from '../db/pool';

function addServiceToken(email, serviceName, user, access_token) {
  let alreadyExist = false;
  pool.query('SELECT id FROM users WHERE email = $1', [email], (error, results) => {
    if (!error) {
      if (results.rows[0]) {
        const userId = results.rows[0].id;
        pool.query('SELECT * from services WHERE fk_users = $1', [userId], (error, results) => {
          if (!error) {
            if (results.rows) {
              results.rows.map(async (res, index) => {
                if (res.nom === serviceName) {
                  alreadyExist = true;
                }
              })
              if (alreadyExist === false) {
                pool.query('INSERT INTO services (nom, access_token, fk_users, username, profile_img, user_serviceid) VALUES ($1, $2, $3, $4, $5, $6)', [serviceName, access_token, userId, user.name, user.photo, user.serviceID], (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                  console.log("Token has been added into database services " + serviceName);
                })
              } else {
                pool.query('UPDATE services SET nom = $1, access_token = $2, username = $4, profile_img = $5, user_serviceid = $6 WHERE fk_users = $3 AND nom = $1', [serviceName, access_token, userId, user.name, user.photo, user.serviceID], (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                  console.log("Token has been UPDATED into database services " + serviceName);
                })
              }
            }
          } else {
            console.log(error);
          }
        })
      }
    }
  })
}

exports.facebook = (req, res) => {
  const io = req.app.get('io')
  const { givenName, familyName } = req.user.name
  const user = {
    name: `${givenName} ${familyName}`,
    photo: req.user.photos[0].value,
  }
  const email = req.session.email;
  const access_token = req.authInfo;
  addServiceToken(email, 'facebook', user, access_token);
  io.in(req.session.socketId).emit('facebook', user)
  res.end()
}

exports.twitter = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value.replace(/_normal/, ''),
    serviceID: req.user.id
  }
  const email = req.session.email;
  const access_token = req.authInfo;
  addServiceToken(email, 'twitter', user, access_token);
  io.in(req.session.socketId).emit('twitter', user);
  res.end()
}

exports.trello = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.fullName,
    photo: req.user.avatarURL
  }
  const email = req.session.email;
  const access_token = req.authInfo;
  addServiceToken(email, 'trello', user, access_token);
  io.in(req.session.socketId).emit('trello', user);
  res.end()
}

exports.outlook = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.displayName,
    photo: ''
  }
  const email = req.session.email;
  const access_token = req.authInfo;
  addServiceToken(email, 'outlook', user, access_token);
  io.in(req.session.socketId).emit('outlook', user);
  res.end()
}

exports.spotify = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.displayName,
    photo: '',
    serviceID: req.user.id
  }
  const email = req.session.email;
  const access_token = req.authInfo;
  addServiceToken(email, 'spotify', user, access_token);
  io.in(req.session.socketId).emit('spotify', user);
  res.end()
}

exports.instagram = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: '',
    photo: ''
  }
  const email = req.session.email;
  const access_token = req.authInfo;
  addServiceToken(email, 'instagram', user, access_token);
  io.in(req.session.socketId).emit('instagram', user);
  res.end()
}


