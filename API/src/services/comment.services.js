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
    getDBCommentById:(id) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT comment.id,
                    comment.userId,
                    user.username as author,
                    comment.comment_text,
                    comment.created_at,
                    comment.updated_at
                    FROM comment
                INNER JOIN user ON comment.userId = user.id
                WHERE comment.id = ?
            `
            db.query(query, [id], (error, result) =>{
                if (error) {
                    reject(error.message);
                }
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject('Comentário não encontrado');
                }
            })


        })
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
    },
    addDBNewComment: ({ userId, comment_text }) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO comment (userId, comment_text) VALUES (?, ?)', [userId, comment_text], (err, result) => {
                if (err) {
                    reject('Error inserting comment');
                }
                resolve();
            })
        })
    },
    updateDBComment: ({ id, comment_text }) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE comment SET comment_text = ? WHERE id = ?', [comment_text, id], (err, result) => {
                if (err) {
                    reject('Error updating comment');
                }
                resolve();
            })
        })
    },
    deleteDBComment: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM comment WHERE id =?', [id], (err, result) => {
                if (err) {
                    reject('Error deleting comment');
                }
                resolve();
            })
        })
    }

}
module.exports = CommentService;
