const http = require('http');

const express = require('express');

//express is a framework.
const app = express();


app.use((req, res, next) => {
   console.log('in the middleware!');
   next();
});


app.use((req, res, next) => {
   console.log('in the middleware 2 !')
   // ...
});

const server = http.createServer(app);

server.listen(3010); 