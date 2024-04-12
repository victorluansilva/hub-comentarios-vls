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
    }

}

module.exports = UserService;