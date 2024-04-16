const db = require('../db_connect');
const CommentService = {
    getDBComments: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT comment.id,
                                user.username as author,
                                comment.comment_text,
                                comment.created_at,
                                comment.updated_at
                            FROM comment
                        INNER JOIN user ON comment.userId = user.id
                        ORDER BY comment.updated_at DESC;`
            db.query(query, (error, results) => {
                if (error) {
                    reject(error.message);
                }
                resolve(results);
            });
        });
    },
    getDBCommentsByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT 
                            comment.id, 
                            user.username AS author, 
                            comment.comment_text, 
                            comment.created_at,
                            comment.updated_at
                        FROM comment 
                        INNER JOIN user 
                        ON comment.userId = user.id
                        WHERE userId = ?`

            db.query(query, [userId], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.length <= 0) {
                    reject('Nenhum comentário encontrado com este usuário');
                } else {
                    resolve(result);
                }
            })
        })
    }
}
module.exports = CommentService;
