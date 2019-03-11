const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: TrelloStrategy } = require('passport-trello')
const { Strategy: OutlookStrategy } = require('passport-outlook')
const { Strategy: SpotifyStrategy } = require('passport-spotify')
const { Strategy: InstagramStrategy } = require('passport-instagram')
const { FACEBOOK_CONFIG, TWITTER_CONFIG, TRELLO_CONFIG, OUTLOOK_CONFIG, SPOTIFY_CONFIG, INSTAGRAM_CONFIG } = require('../config')
module.exports = () => {
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))

  passport.use(new FacebookStrategy(FACEBOOK_CONFIG,
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile, accessToken);
    }));

  passport.use(new TwitterStrategy(TWITTER_CONFIG,
    function (accessToken, accessTokenSecret, refreshToken, profile, cb) {
      return cb(null, profile, accessToken, accessTokenSecret);
    }));

  passport.use(new TrelloStrategy(TRELLO_CONFIG,
    function (req, token, tokenSecret, profile, done) {
      done(null, profile, token);
    }));

  passport.use(new OutlookStrategy(OUTLOOK_CONFIG,
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile, accessToken);
    }));

  passport.use(new SpotifyStrategy(SPOTIFY_CONFIG,
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile, accessToken);
    }));

  passport.use(new InstagramStrategy(INSTAGRAM_CONFIG,
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile, accessToken);
    }));
}
