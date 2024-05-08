import { mapComments } from "../model/common.model.js";

const URL_API = "http://localhost:7000";
const URL_API_USER = "http://localhost:7000/user";

const UserService = {
    apiGetUserComments: (userId) => {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            LoginService.tokenToHeader(headers)
            fetch(`${URL_API}/comment/user/${userId}`, {
                method: 'GET',
                headers: headers
            })
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
            const headers = {
                'Content-Type': 'application/json'
            }
            LoginService.tokenToHeader(headers)
            fetch(`${URL_API_USER}/update`, {
                method: 'PUT',
                headers: headers,
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
    apiUpdataImgLink: ({ id, imgLink }) => {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            LoginService.tokenToHeader(headers)
            fetch(`${URL_API_USER}/icon`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({ id, imgLink })
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