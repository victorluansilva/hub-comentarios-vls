const UserController = require('../controller/user.controller')
const express = require('express');
const UserRouter = express.Router();

UserRouter.get('/', UserController.getUsers);
UserRouter.get('/:id', UserController.getUserById);

module.exports = UserRouter;