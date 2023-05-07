var passport = require('passport');
var LocalStratege = require('passport-local').Strategy;

var account = require('../models/account');

passport.use('local-login', new LocalStratege((username, password, done) => {
    account.findOne({ username: username })
        .then(user => {
            if (!user)
                return done(null, false);

            if (!user.verifyPassword(password))
                return done(null, false)

            return done(null, user)
        })
        .catch(err => {
            return done(err, null)
        })
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    account.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            done(err, null);
        })
})



module.exports = passport