const LoginService = require('../services/login.services')

const LoginController = {
    login: (req, res) =>{
        const {username, password} = req.body;
        LoginService.authUser(username, password).then((token) =>{
            res.cookie('token', token, { httpOnly: true });
            res.json({success: true, token: token})
        }).catch((error) =>{
            res.status(500).json({success: false, error: error.message})
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.json({success: true, message: 'Logout concluído com sucesso'});
    }
}

module.exports = LoginController;