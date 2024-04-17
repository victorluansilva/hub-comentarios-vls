const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

const CommentRouter = require('./src/routes/comment.route');
server.use('/comment', CommentRouter);

const UserRouter = require('./src/routes/user.route');
server.use('/user', UserRouter);

const LoginRouter = require('./src/routes/login.route');
server.use('/session', LoginRouter);

const PORT = 7000;

server.listen(PORT, () => {
    console.log(`O server está rodando em http://localhost:${PORT}`)
})