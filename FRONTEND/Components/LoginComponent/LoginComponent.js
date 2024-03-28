import { User } from "../../models/user.model.js";
import { LoginService } from "../../services/login.services.js";

let _currentUser = new User();

const getCurrentUser = () => {
    return _currentUser;
}


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

const userProfileTitle = (name) => {
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

    _currentUser = new User(null, username.value, password.value)

    LoginService.apiAuthUser(_currentUser).then(result => {
        _currentUser = new User(result)
        _currentUser.setPassword(null);
        userProfileTitle(_currentUser.getFirstname())

        const inputAuthor = document.getElementById('inputAuthor');
        inputAuthor.value = result.firstname + ' ' + result.lastname;
        inputAuthor.style.backgroundColor = '#444'
        inputAuthor.style.color = '#FFF'

        handleShowHide();
    }).catch(error => {
        alert(`Login inválido. Erro:${error.message}`)
    })

    console.log(_currentUser)
}


const LoginComponent = {
    run: () => {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', handleLogin);
    }
}

export { LoginComponent, getCurrentUser }