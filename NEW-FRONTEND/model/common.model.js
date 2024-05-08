import Comment from "./comment.model.js";

const mapComments = (comments) => {
    return comments.map(
        (comment) => new Comment(comment.id, comment.userId, comment.author, comment.comment_text, comment.created_at, comment.updated_at)
    );
}

export {mapComments}