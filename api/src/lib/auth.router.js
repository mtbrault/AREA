const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

const facebookAuth = passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages', 'user_posts', 'email', 'pages_messaging_subscriptions', 'user_events', 'user_photos', 'publish_to_groups', 'user_likes', 'publish_pages'] })
const twitterAuth = passport.authenticate('twitter')
const trelloAuth = passport.authenticate('trello')
const instagramAuth = passport.authenticate('instagram')
const spotifyAuth = passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private']
})
const outlookAuth = passport.authenticate('windowslive', {
  scope: [
    'openid',
    'profile',
    'offline_access',
    'https://outlook.office.com/Mail.Read',
    'https://outlook.office.com/Mail.Send',
    'https://outlook.office.com/Mail.ReadWrite'
  ]
})

router.get('/facebook/callback', facebookAuth, authController.facebook)
router.get('/twitter/callback', twitterAuth, authController.twitter)
router.get('/trello/callback', trelloAuth, authController.trello)
router.get('/outlook/callback', outlookAuth, authController.outlook)
router.get('/spotify/callback', spotifyAuth, authController.spotify)
router.get('/instagram/callback', instagramAuth, authController.instagram)


router.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  req.session.email = req.query.email
  next()
})

router.get('/facebook', facebookAuth)
router.get('/twitter', twitterAuth)
router.get('/trello', trelloAuth)
router.get('/outlook', outlookAuth)
router.get('/spotify', spotifyAuth)
router.get('/instagram', instagramAuth)

module.exports = router