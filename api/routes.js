const route = require('express').Router()
const db = require('./database')
const passport = require('./passport')
const crypto = require('crypto')

function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc','wu23x7po')
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex')
    return crypted
}

route.get('/testapi', function(req, res, next){
    res.send('We recieved your request!')
})

// User Authentication
route.post('/signup', function (req, res, next) {
    db.users.create({
        username:req.body.username,
        name:req.body.name,
        password: encrypt(req.body.password)
    }).then((user) => {
        res.send(true)
    }).catch((err) => {
        res.send(false)
    })
})

route.post('/signin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.send(false) }
      if (!user) { return res.send(false) }
      req.logIn(user, function(err) {
        if (err) { return res.send(false) }
        return res.send(user)
      })
    })(req, res, next)
})

route.post('/logout', function(req, res, next) {
    req.logout()
    res.send(true)
})

module.exports = route