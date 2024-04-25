const UserController = require('../controller/user.controller')
const express = require('express');
const UserRouter = express.Router();

UserRouter.get('/', UserController.getUsers);
UserRouter.get('/:id', UserController.getUserById);

UserRouter.post('/new', UserController.addNewUser);

UserRouter.put('/update', UserController.updateUser);
UserRouter.put('/icon', UserController.updateUserIcon);

UserRouter.delete('/delete/:id', UserController.deleteUser);

module.exports = UserRouter;