const http = require('http');

const express = require('express');

//express is a framework.
const app = express();

const server = http.createServer(app);

server.listen(3010); 