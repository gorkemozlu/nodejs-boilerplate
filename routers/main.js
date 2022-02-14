var express = require('express');

const router = new express.Router()

router.get('/',(req,res)=>{
    
    res.render("main")    
})



module.exports = router