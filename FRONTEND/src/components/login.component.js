import { User } from "../models/user.model.js";
import { LoginService } from "../services/login.service.js";
import { setCommentField } from "./comment.component.js";


const getLoginInputs = () => {
    return {
        username: document.getElementById('username'),
        password: document.getElementById('password')
    }
}

const handleShowHide = () => {
    const newCommentTag = document.getElementById('form-comentario');
    const loginTag = document.getElementById('login-form');
    const userProfile = document.getElementById('user-profile')

    if (newCommentTag.classList.contains('disabled')) {
        newCommentTag.classList.remove('disabled');
        userProfile.classList.remove('disabled');
        loginTag.classList.add('disabled');
    } else {
        newCommentTag.classList.add('disabled');
        userProfile.classList.add('disabled');
        loginTag.classList.remove('disabled');
    }
}

const userProfileHeader = (name) => {
    const aLink = document.getElementById("user-profile-title");
    aLink.innerHTML = ``;
    aLink.innerHTML = `<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
    <p class="small lh-sm text-gray-dark">
        <strong class=" text-gray-dark dropdown-toggle">@${name}</strong>
    </p>`;
}

const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = getLoginInputs();
    const usr = {
        username: username.value,
        password: password.value
    }
    LoginService.apiAuthUser(usr).then(result => {
        alert(result)
        const user = LoginService.getUserSession()
        handleShowHide();
        userProfileHeader(user.getFirstname());
        setCommentField(user);
    }).catch(error => {
        alert(`Login inválido. Erro:${error.message}`)
    })
}


const LoginComponent = {
    run: () => {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', handleLogin);
    }
}

export { LoginComponent }