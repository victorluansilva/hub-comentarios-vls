const CommentService = require('../services/comment.services');
const CommentController = {
    getComments: (req, res) => {
        CommentService.getDBComments().then( resultado =>{
            res.json({success: true, comment: resultado})
        }).catch(error => {
            res.status(500).json({success: false, error: `Internal server error: ${error.message}`})
        })
    },
    getCommentsByUserId: (req, res) => {
        const {id} = req.params.userId;
        CommentService.getDBCommentsByUserId(userId).then( resultado =>{
            res.json({success: true, comments: resultado})
        }).catch(error => {
            res.status(500).json({success: false, error: `Internal server error: ${error.message}`})
        })
    }
}
module.exports = CommentController;