var mysql = require('mysql')
//const MysqlCache = require('mysql-cache')

const environment = process.env.NODE_ENV  || 'development';
if(environment == "development"){
    var con = ()=>{
        var con = mysql.createPool({
            host:'10.213.217.67',
            user:'root',
            password:'top-secret',
            database:'sample-app',
            multipleStatements: true
        })
    return con
    }
}
if(environment == "production"){
    var con = ()=>{
        var con = mysql.createPool({
            host: process.env.RDS_HOSTNAME,
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DBNAME,
            port: process.env.RDS_PORT,
            multipleStatements: true
        })
    return con
    }
}



module.exports = {

    condb: con
}