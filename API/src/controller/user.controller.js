const UserService = require('..//services/user.services');

const UserController = {
    getUsers: (req, res) =>{
        UserService.getDBUsers().
        then((result) =>{
            res.json({success: true, users: result});
        }).catch((error) =>{
            res.status(500).json({success: false, error: error});
        })
    },
    getUserById: (req, res) =>{
        const userId = req.params.id;
        UserService.getDBUserById(userId).
        then((result) =>{
            res.json({success: true, user: result});
        }).catch((error) =>{
            res.status(500).json({success: false, error: error});
        })
    }
}

module.exports = UserController;