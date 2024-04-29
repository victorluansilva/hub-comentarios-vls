const LoginService = require('../services/login.services')
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');

const LoginController = {
    login: (req, res) => {
        const { username, password } = req.body;
        LoginService.authUser(username, password).then((token) => {
            res.cookie('token', token, { httpOnly: true });
            res.json({ success: true, token: token })
        }).catch((error) => {
            res.status(500).json({ success: false, error: error })
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.json({ success: true, message: 'Logout concluído com sucesso' });
    },
    updateUserSession: (req, res) => {
        const user = req.user;
        const editedUser = req.body;
        if (!(user && user.id === editedUser.userId)) {
            res.status(401).json({ success: false, error: 'Não autorizado.' })
        }
        UserService.updateDBUser(editedUser).then((error) => {
            if (error) {
                res.status(500).json({ success: false, error: error });
            }
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
            // res.cookie('token', token, { httpOnly: true });
            res.json({ success: true, token: token });
            
        }).catch((error) => {
            res.status(500).json({ success: false, error: error });
        })
    },
    isAuthenticated: (req, res, next) => {
        const auth = req.headers['authorization'];
        if (auth && auth.startsWith('Bearer ')) {
            const token = auth.split(' ')[1];
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                    if (err) {
                        res.status(401).json({ error: err, message: "Token inválido" });
                    } else {
                        req.user = decodedToken;
                        next();
                    }
                }
                )
            }
        }
    }
}

module.exports = LoginController;