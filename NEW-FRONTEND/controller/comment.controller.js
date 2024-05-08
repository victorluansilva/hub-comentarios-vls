import View from "../view/main.view.js";
import Comment from "../model/comment.model.js";
import CommentService from "../services/comment.service.js"
import AuthService from "../services/authentication.service.js";

const loadCommentFeed = () => {
    CommentService.apiGetComment().then(result => {
        const comments = result.map(
            (comment) => new Comment(comment.id, comment.userId, comment.author, comment.comment_text, comment.created_at, comment.updated_at)
        );

        View.renderCommentFeed(comments, 'Feed');

    }).catch(error => {
        console.error(error);
        alert(error);
        View.renderCommentFeed(null, 'Feed');

    })
}

const CommentController = {
    run() {
        loadCommentFeed();
        if(AuthService.isUserLoggedIn()) {
            View.renderCommentForm();
        } else {
            View.renderLogin();
        }
    }
}

export default CommentController;