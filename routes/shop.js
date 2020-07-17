const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
   //delete before use pug templating engine
   // console.log('shop.js', adminData.products);
   // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
   res.render('shop');
});


module.exports = router;