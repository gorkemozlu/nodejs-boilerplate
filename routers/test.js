var express = require('express');

const router = new express.Router()

router.get('/test',(req,res)=>{
    
    res.render("test")    
})
router.get('/test2',(req,res)=>{
    
    res.send({"respond":"Hello"})   
})
router.get('/health',(req,res)=>{
    
    res.send({"respond":"200"})   
})

module.exports = router