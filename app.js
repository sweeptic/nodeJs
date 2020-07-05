
const express = require('express');
const app = express();


app.use('/', (req, res, next) => {
   console.log("this allways runs ! ");
   next();
});


app.use('/add-product', (req, res, next) => {
   res.send('<h1>the add product page</h1>');
});

app.use('/', (req, res, next) => {
   res.send('<h1>Hello from Express!</h1>');
});


app.listen(3010); 