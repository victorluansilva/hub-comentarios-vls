const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

const CommentRouter = require('./src/routes/comment.route');
server.use('/comment', CommentRouter);

const PORT = 7000;

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM user WHERE username = ? AND password = ?',
        [username, password], (err, results) => {
            if (err) {
                res.status(500).json({ success: false, error: 'Internal server error' });
                return;
            }
            if (results.length > 0) {
                const { id, username, firstname, lastname } = results[0];
                res.json({ success: true, user: { id, username, firstname, lastname } });
            } else {
                res.json({ success: false, error: 'Usuário ou senha inválidos' });
            }
        })
})


server.get('/user-comments/:userId', (req, res) => {
    const userId = req.params.userId;
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

     db.query(query, [userId], (err,result)=>{
        if (err) {
            return res.status(500).json({ success: false, error: 'Internal server error' });
        } else if (result.length <= 0) {
            return res.status(500).json({ success: false, error: 'Nenhum comentário encontrado com este usuário' });
        } else {
            res.json({ success: true, comments: result });
        }
     })           
}

)

server.post('/comment', (req, res) => {
    const { userId, comment_text } = req.body;
    db.query('INSERT INTO comment (userId, comment_text) VALUES (?, ?)', [userId, comment_text], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        res.json({ success: true });
    })
})

server.listen(PORT, () => {
    console.log(`O server está rodando em http://localhost:${PORT}`)
})