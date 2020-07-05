
const express = require('express');
const app = express();

 
app.use((req, res, next) => {
   console.log('in the middleware!');
   next();
});


app.use((req, res, next) => {
   console.log('in the middleware 2 !')
   res.send('<h1>Hello from Express!</h1>');
});


app.listen(3010); 