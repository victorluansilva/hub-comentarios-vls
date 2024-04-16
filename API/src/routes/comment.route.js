const express = require('express');
const CommentController = require('../controller/comment.controller');

const CommentRouter = express.Router();
CommentRouter.get('/', CommentController.getComments);
CommentRouter.get('/:userId', CommentController.getCommentsByUserId);


module.exports = CommentRouter;


