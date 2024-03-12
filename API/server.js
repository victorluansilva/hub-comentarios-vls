const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()


const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(bodyParser.json());

const PORT = 7000;

server.listen(PORT, () =>{
    console.log(`O server está rodando em http:\\localhost:${PORT}`)
} )