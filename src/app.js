require('dotenv').config(); 
const { Server } = require('./models');

//start server
const server = new Server();

server.listen();