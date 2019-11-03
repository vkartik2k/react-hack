const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('./database').users

passport.serializeUser(function(user, done){
    done(null, user.username)
})

passport.deserializeUser(function(username, done){
    users.findOne({
        where : {
            username : username
        }
    }).then((user) => {
        if (!user) {
            return done(new Error('No such user'))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
})

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},function (username, password, done) {
    users.findOne({
        where: {
            username : username
        }
    }).then((user) => {
        console.log(user);
        if (!user) {
            return done(null, false, {message: 'No such user'})
        }
        if (user.password !== password) {
            return done(null, false, {message: 'Wrong password'})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

exports = module.exports = passport