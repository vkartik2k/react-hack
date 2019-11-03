const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const route = require('./routes')
const server = express()

server.use(express.json())
server.use(express.urlencoded({extenstion:true}))

server.use(session({
    secret: 'iloveabigstringwhichissecret'
}))
server.use(passport.initialize())
server.use(passport.session())

server.use('/',route)

server.listen(4000, function(){
    console.log('Server running on http://localhost:4000')
})