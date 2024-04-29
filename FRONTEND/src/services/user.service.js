import { mapComments } from "../models/comment.model.js";

const URL_API = "http://localhost:7000";
const URL_API_USER = "http://localhost:7000/user";

const UserService = {
    apiGetUserComments: (userId) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL_API}/comment/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        resolve(mapComments(data.comments));
                    } else {
                        reject(data.error);
                    }
                })
        })
    }, 
    apitUpdateUser: (user) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL_API_USER }/update`, {
                method: 'PUT',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
               .then(response => response.json())
               .then(data => {
                    if (data.success) {
                        resolve(data.error);
                    } else {
                        reject(data.error);
                    }
                }).catch(err => {
                    reject(err);
                });
        })
    },
    apiUpdataImgLink: ({id, imgLink}) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL_API_USER}/icon`, {
                method: 'PUT',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, imgLink})
            })
               .then(response => response.json())
               .then(data => {
                    if (data.success) {
                        resolve(data.message);
                    } else {
                        reject(data.error);
                    }
                }).catch(err => {
                    reject(err);
                });
        })
    }
}

export default UserService;