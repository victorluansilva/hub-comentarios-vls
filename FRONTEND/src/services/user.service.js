import { mapComments } from "../models/comment.model.js";

const URL_API = "http://localhost:7000";

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
    }
}

export default UserService;