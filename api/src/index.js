require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import query from './query/users';
import cors from 'cors';
import http from 'http';
import passport from 'passport';
import socketio from 'socket.io';
import authRouter from './lib/auth.router';
import passportInit from './lib/passport.init';
// Start - Import for different webhooks;
import webhookFacebook from './query/facebook';
import './query/twitter';
import './query/outlook';
import './query/spotify';
import './query/instagram';
// End -

const session = require('express-session')
const { CLIENT_ORIGIN } = require('./config')
const moment = require('moment');

const app = express()
const port = 8080
let server

server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))
app.use(passport.initialize())
passportInit()
app.use(cors({
  origin: CLIENT_ORIGIN
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.get('/getUsers', query.getUsers)
app.post('/user/register', query.createUser)
app.post('/user/login', query.loginUser)
app.post('/getToken', query.getToken)
app.post('/setServiceToken', query.setServiceToken)
app.post('/convertToken', query.sendToken)

app.get('/webhookFacebook', webhookFacebook.facebookGet);
app.post('/webhookFacebook', webhookFacebook.facebookPost);

app.param('serviceName', function (req, res, next, name) {
  req.service = name;
  next();
});

app.param('content', function (req, res, next, value) {
  if (['actions', 'reactions'].includes(value)) {
    req.content = value;
  } else {
    req.content = null;
  }
  next();
});


app.post('/service/:serviceName/get/:content', query.getContent);
app.post('/service/:serviceName/add/:content', query.addContent);
app.post('/service/:serviceName/delete/:content', query.deleteContent);

app.post('/offAllServices', query.offAllServices);

app.get('/about.json', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  return res.json({
    client: {
      host: ip
    },
    server: {
      current_time: moment().unix(),
      services: [{
        name: "facebook",
        actions: [{
          name: "new_post",
          description: "When i received a new post"
        }, {
          name: "new_like",
          description: "When i received a new like"
        }],
        reactions: [{
          name: "none",
          description: "none"
        }]
      }, {
        name: "spotify",
        actions: [{
          name: "new_follower",
          description: "When i get a new follower"
        }],
        reactions: [{
          name: "none",
          description: "none"
        }]
      }, {
        name: "trello",
        actions: [{
          name: "new_board",
          description: "When i create a new board"
        }],
        reactions: [{
          name: "add_list",
          description: "Add list to a board"
        }, {
          name: "add_card",
          description: "Add a card to a list"
        }]
      }, {
        name: "twitter",
        actions: [{
          name: "new_tweet",
          description: "When i make a new tweet"
        }],
        reactions: [{
          name: "add_tweet",
          description: "Tweet something"
        }]
      }, {
        name: "outlook",
        actions: [{
          name: "new_email",
          description: "I received a new email"
        }],
        reactions: [{
          name: "send_email",
          description: "Send a new email"
        }]
      }]
    }
  });
});


const io = socketio(server)
app.set('io', io)
app.use('/', authRouter)

server.listen(port, () => {
  console.log(`App running on port ${port}.`)
  query.initDatabase()
})