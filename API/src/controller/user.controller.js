const UserService = require('../services/user.services');

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
    },
    addNewUser: (req, res) =>{
        const user = req.body;
        UserService.addDBNewUser(user).
        then(() =>{
            res.json({success: true, message: "Usuário adicionado com sucesso!"});
        }).catch((error) =>{
            res.status(500).json({success: false, error: error});
        })
    },
    updateUser: (req, res) =>{
        const user = req.body;
        UserService.updateDBUser(user).
        then(() =>{
            res.json({success: true, message: "Usuário atualizado com sucesso!"});
        }).catch((error) =>{
            res.status(500).json({success: false, error: error});
        })
    },
    updateUserIcon: (req, res) =>{
        const user = req.body;
        UserService.updateDBUserIcon(user).
        then(() =>{
            res.json({success: true, message: "Imagem atualizada com sucesso!"});
        }).catch((error) =>{
            res.status(500).json({success: false, error: error});
        })
    },
    deleteUser: (req, res) =>{
        const id = req.params.id;
        UserService.deleteDBUser(id).
        then(() =>{
            res.json({success: true, message: "Usuário deletado com sucesso!"});
        }).catch((error) =>{
            res.status(500).json({success: false, error: error});
        })
    }

}

module.exports = UserController;