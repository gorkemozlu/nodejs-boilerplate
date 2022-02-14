var express = require('express');
const condb = require('./db.js');

const router = new express.Router()
const pool = condb.condb();

router.get('/test',(req,res)=>{
    
    res.render("test")    
})
router.get('/test2',(req,res)=>{
    
    res.send({"respond":"Hello"})   
})
router.get('/output',(req,res)=>{
    console.log("access to /output url")
    prices = []
    products = []

    queryProduct = "SELECT * FROM Product"
    queryPrice = "SELECT * FROM Price"
    queryTotal = queryProduct + ";" + queryPrice

    pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!
        con.query(queryTotal,[1,2], function(err, result) {
            if (err) {
                console.log(err.stack)
                console.log(req.body)
                res.render("500", {
                    errorDetails: err
                })
            } else {
                for(var i=0;i<(JSON.parse(JSON.stringify(result[0]))).length;i++){
                    var ProductTable = {
                        'id':(JSON.parse(JSON.stringify(result[0])))[i].id,
                        'product':(JSON.parse(JSON.stringify(result[0])))[i].product
                    }
                    products.push(ProductTable);
                  //console.log(products)
                  }; 
                  for(var i=0;i<(JSON.parse(JSON.stringify(result[1]))).length;i++){
                    var priceTable = {
                        'id':(JSON.parse(JSON.stringify(result[1])))[i].id,
                        'price':(JSON.parse(JSON.stringify(result[1])))[i].price
                    }
                    prices.push(priceTable);
                  //console.log(prices)
                  }; 
                res.render("output",{errorDetails:err,prices:prices,products:products})
            }
        })
        // When done with the connection, release it.
        con.release();
        // Handle error after the release.
        if (err) throw err;
    });
})
router.get('/populate-sql',(req,res)=>{
    console.log("access to /populate-sql url")
    prices = []
    products = []
    //queryDb = `CREATE DATABASE sample-app`
    queryCreateProduct="CREATE TABLE `sample-app`.`Product` (`id` int AUTO_INCREMENT,`product` text, PRIMARY KEY (id))"
    queryCreatePrice = "CREATE TABLE `sample-app`.`Price` (`id` int AUTO_INCREMENT,`price` int, PRIMARY KEY (id))"
    queryInsert1 = "INSERT INTO `sample-app`.`Price` (`id`, `price`) VALUES (1, 10)"
    queryInsert2 = "INSERT INTO `sample-app`.`Product` (`id`, `product`) VALUES (1, 'phone')"
    queryInsert3 = "INSERT INTO `sample-app`.`Product` (`id`, `product`) VALUES (2, 'computer')"
    queryInsert4 = "INSERT INTO `sample-app`.`Product` (`id`, `product`) VALUES (3, 'watch')"
    queryInsert5 = "INSERT INTO `sample-app`.`Product` (`id`, `product`) VALUES (4, 'motobike')"
    queryProduct = "SELECT * FROM Product"
    queryPrice = "SELECT * FROM Price"
    queryTotal = queryCreateProduct+ ";" + queryCreatePrice+ ";" + queryInsert1+ ";" + queryInsert2+ ";" + queryInsert3+ ";" + queryInsert4+ ";" + queryInsert5+ ";" + queryProduct+ ";" + queryPrice

    pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!
        con.query(queryTotal,[1,2], function(err, result) {
            if (err) {
                console.log(err.stack)
                console.log(req.body)
                res.render("500", {
                    errorDetails: err
                })
            } else {
                for(var i=0;i<(JSON.parse(JSON.stringify(result[7]))).length;i++){
                    var ProductTable = {
                        'id':(JSON.parse(JSON.stringify(result[7])))[i].id,
                        'product':(JSON.parse(JSON.stringify(result[7])))[i].product
                    }
                    products.push(ProductTable);
                  //console.log(products)
                  }; 
                  for(var i=0;i<(JSON.parse(JSON.stringify(result[8]))).length;i++){
                    var priceTable = {
                        'id':(JSON.parse(JSON.stringify(result[8])))[i].id,
                        'price':(JSON.parse(JSON.stringify(result[8])))[i].price
                    }
                    prices.push(priceTable);
                  //console.log(prices)
                  }; 
                res.render("output",{errorDetails:err,msg:"populated tables",prices:prices,products:products})
            }
        })
        // When done with the connection, release it.
        con.release();
        // Handle error after the release.
        if (err) throw err;
    });
})
router.get('/drop-tables',(req,res)=>{
    console.log("access to /drop-tables url")
    prices = []
    products = []
    //queryDb = `CREATE DATABASE sample-app`
    queryDropPrice="DROP TABLE `sample-app`.`Price`"
    queryDropProduct = "DROP TABLE `sample-app`.`Product`"
    queryTotal = queryDropPrice+ ";" + queryDropProduct

    pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!
        con.query(queryTotal,[1,2], function(err, result) {
            if (err) {
                console.log(err.stack)
                console.log(req.body)
                res.render("500", {
                    errorDetails: err
                })
            } else {
                res.render("output",{errorDetails:err,msg:"dropped tables"})
            }
        })
        // When done with the connection, release it.
        con.release();
        // Handle error after the release.
        if (err) throw err;
    });
})
router.get('/health',(req,res)=>{
    
    res.send({"respond":"200"})   
})

module.exports = router