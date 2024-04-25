const db = require('../db_connect');

const UserService = {
    getDBUsers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },
    getDBUserById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id =?', [id], (error, result) => {
                if (error) {
                    reject(error.message);
                }
                if (result.length > 0) {
                    resolve(result);

                }
            })
        })
    },
    addDBNewUser: ({ username, password, firstname, lastname, imgLink }) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user (username, password, firstname, lastname, imgLink) VALUES (?, ?, ?, ?, ?)', [username, password, firstname, lastname, imgLink], (err, result) => {
                if (err) {
                    reject('Error inserting comment');
                }
                resolve('Usuário adicionado com sucesso!');
            })
        })
    },
    updateDBUser: ({ id, username, password, firstname, lastname, imgLink  }) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET username = ?, password = ?, firstname = ?, lastname = ?, imgLink = ? WHERE id = ?', [username, password, firstname, lastname, imgLink, id ], (err, result) => {
                if (err) {
                    reject('Error updating comment');
                }
                resolve('Usuário atualizado com sucesso!');
            })
        })
    },
    updateDBUserIcon: ({ id, imgLink  }) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET imgLink = ? WHERE id = ?', [ imgLink, id ], (err, result) => {
                if (err) {
                    reject('Error updating comment');
                }
                resolve('Imagem atualizada com sucesso');
            })
        })
    },
    deleteDBUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM user WHERE id =?', [id], (err, result) => {
                if (err) {
                    reject('Error deleting user');
                }
                resolve('Usuário deletado com sucesso');
            })
        })
    }


}

module.exports = UserService;