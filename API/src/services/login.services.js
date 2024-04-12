const jwt = require('jsonwebtoken');
const db = require('../db_connect');

const LoginService = {
    authUser: (username, password) => {
        return new Promise((resolve, reject) => {
            const { username, password } = req.body;
            db.query('SELECT * FROM user WHERE username = ? AND password = ?',
                [username, password], (err, results) => {
                    if (err) {
                        reject(err);
                    }else if (results.lenght > 0) {
                        const user = results[0];
                        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1hs'})
                        resolve(token);
                    } else {
                        reject('Usuário ou senha inválidos');
                    }
                })
        })
    }
}

module.exports = LoginService;