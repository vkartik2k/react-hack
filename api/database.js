const Sequelize = require('sequelize')

const apidb = new Sequelize('apidb','root','SYSADMIN@1234!',{
    host : 'localhost',
    dialect : 'mysql',
    pool : {
        min:0,
        max:5
    }
})

const users = apidb.define('Users', {
    username : {
        type: Sequelize.STRING,
        primaryKey : true
    },
    name : {
        type: Sequelize.STRING
    },
    password : {
        type: Sequelize.STRING
    }
})

apidb.sync()
    .then(() => console.log('DATABASE HAS BE SYNCED'))
    .catch((err) => console.error('PROBLEM IN SYNCING DATABASE'))

exports = module.exports = {users}