//This is something that we don't have to memorise. 
//all of this code comes from this strategy for passport. Came from Azure strategy. 

const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
//need to require the strategy 
const mongoose = require('mongoose')
//need access to mongoose
const config = require('../config/config')
//require config because there are lots of cofigs below. So asking for config file to get all of those secrets. 
const User = require('../models/User')
//requiring our user model 
//talk to database, everything we need to know. 

//fancy passport stuff with our secret info from config file thanks to Microsoft 
module.exports = function (passport) {
  passport.use(
    new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },

      //once all of the above is verified, the function below is going to run 
      async (accessToken, refreshToken, profile, done) => {
        //this function allows us to create a new user. 
        console.log('auth: ', profile)
        const newUser = {
          microsoftId: profile.oid,
          displayName: profile.displayName,
          //with every request we make, we get back an ID and a displayName - all the data that's stored in our Microsoft account. 
        }
        //using the above information to see if there is a match in my Database with the same ID. 
        try {
          let user = await User.findOne({ microsoftId: profile.oid })

          if (user) {
            done(null, user)
            //if user exists, that's great we move on 
          } else {
            user = await User.create(newUser)
            done(null, user)
            //otherwise we create a new user using my newUser model above which has microsoftID and newUser model. 
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
