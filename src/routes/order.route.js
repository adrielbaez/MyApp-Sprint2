const express = require('express');
const router = express.Router();

router.post('/',(req, res)=>{
    console.log('hola orders');
})

module.exports = router 