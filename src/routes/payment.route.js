const express = require('express');
const router = express.Router();

router.post('/',(req, res)=>{
    console.log('hola payment');
})

module.exports = router 