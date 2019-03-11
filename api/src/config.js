require('dotenv').config()
const providers = ['facebook', 'twitter', 'trello', 'outlook', 'spotify', 'instagram']

const callbacks = providers.map(provider => {
  return `http://localhost:8080/${provider}/callback`
})

const [facebookURL, twitterURL, trelloURL, outlookURL, spotifyURL, instagramURL] = callbacks

exports.CLIENT_ORIGIN = 'http://localhost:8081'

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: facebookURL
}

exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: twitterURL,
}

exports.TRELLO_CONFIG = {
  consumerKey: process.env.TRELLO_KEY,
  consumerSecret: process.env.TRELLO_SECRET,
  callbackURL: trelloURL,
  passReqToCallback: true,
  trelloParams: {
    scope: "read,write",
    name: "AREAEpitech",
    expiration: "never"
  }
}

exports.OUTLOOK_CONFIG = {
  clientID: process.env.OUTLOOK_KEY,
  clientSecret: process.env.OUTLOOK_SECRET,
  callbackURL: outlookURL,
}

exports.SPOTIFY_CONFIG = {
  clientID: process.env.SPOTIFY_KEY,
  clientSecret: process.env.SPOTIFY_SECRET,
  callbackURL: spotifyURL,
}

exports.INSTAGRAM_CONFIG = {
  clientID: process.env.INSTAGRAM_KEY,
  clientSecret: process.env.INSTAGRAM_SECRET,
  callbackURL: instagramURL,
}
