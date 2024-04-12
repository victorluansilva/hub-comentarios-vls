const LoginService = require('../services/login.services')

const LoginController = {
    login: (req, res) =>{
        const {username, password} = req.body;
        LoginService(username, password).then((token) =>{
            res.cookie('token', token, { httpOnly: true });
            res.json({success: true, token: token})
        }).catch((error) =>{});
    }
}