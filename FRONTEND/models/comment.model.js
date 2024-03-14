class Comment {

    constructor(id, author, comment_text, created_at, updated_at) {
        if (id !== undefined, author !== undefined, comment_text !== undefined, created_at !== undefined, updated_at !== undefined) {
            this.id = id;
            this.author = author;
            this.comment_text = comment_text
            this.created_at = created_at;
            this.updated_at = updated_at;
        } else if (author !== undefined, comment_text !== undefined) {
            this.id = null;
            this.author = author;
            this.comment_text = comment_text
            this.created_at = null;
            this.updated_at = null;
        } else {
            this.id = null;
            this.author = null;
            this.comment_text = null;
            this.created_at = null;
            this.updated_at = null;
        }
    }
    getId() {
        return this.id;
    }
    getAuthor() {
        return this.author;
    }
    setAuthor(value) {
        this.author = value;
    }
    getComment() {
        return this.comment_text;
    }
    setComment(value) {
        this.comment_text = value;
    }

    getCreatedAt() {
        return this.created_at;
    }
    getUpdatedAt() {
        return this.updated_at;
    }
}
export { Comment }