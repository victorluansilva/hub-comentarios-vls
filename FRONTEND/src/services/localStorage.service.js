import { User } from "../models/user.model.js";

const StorageServices = {
    user: {
        store: (user) => {
            try {
                const storeAsJSON = JSON.stringify(user);
                localStorage.setItem('user', storeAsJSON);
            } catch (error) {
                console.error(error)
            }
        },
        get: () => {
            try {
                if (localStorage.getItem('user')) {
                    const result = JSON.parse(localStorage.getItem('user'));
                    const user = new User(result.id, result.username, null, result.firstname, result.lastname);
                    return user;
                } else {
                    console.log('User not found')
                    return null;
                }
            } catch (error) {
                console.error(error)
            }
        },
        remove: () => {
            localStorage.removeItem('user');
        }
    }
}

export { StorageServices }


