import { User } from "../models/user.model.js";

const StoragedItems = {
    user: {
        store: (user) =>{
            try {
                const storeAsJSON = JSON.stringify(user);
                localStorage.setItem('user', storeAsJSON);        
            } catch (error) {
                console.error(error)
            }
        },
        get:() =>{
            try {
                if (localStorage.getItem('user')) {
                    const user = new User(JSON.parse(localStorage.getItem('user')));
                    return user;
                } else {
                    console.log('User not found')
                    return null;
                }
            } catch (error) {
                console.error(error)
            }
        },
        remove:() =>{
            localStorage.removeItem('user');
        }
    }
}

export { StoragedItems }


