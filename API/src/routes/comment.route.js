const express = require('express');
const CommentController = require('../controller/comment.controller');
const CommentRouter = express.Router();
const LoginController = require('../controller/login.controller');

CommentRouter.get('/', CommentController.getComments);

CommentRouter.get('/:id', CommentController.getCommentById);

CommentRouter.get('/user/:userId',LoginController.isAuthenticated, CommentController.getCommentsByUserId);

CommentRouter.post('/add', LoginController.isAuthenticated,CommentController.addComment);

CommentRouter.put('/update', LoginController.isAuthenticated,CommentController.updateComment);

CommentRouter.delete('/delete/:id', LoginController.isAuthenticated,CommentController.deleteComment);


module.exports = CommentRouter;


