import LoginService from "../services/login.service.js";
import { handleShowHideUser } from "../components/user.component.js";

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

    if (newCommentTag.classList.contains('disabled') && LoginService.isLoggedIn()) {
        newCommentTag.classList.remove('disabled');
        userProfile.classList.remove('disabled');
        loginTag.classList.add('disabled');
    } else if (!LoginService.isLoggedIn()) {
        newCommentTag.classList.add('disabled');
        userProfile.classList.add('disabled');
        loginTag.classList.remove('disabled');
    }
}

const userProfile = (id, name, imgLink,) => {
 return ` <div class=" dropdown flex-shrink-0 m-2 ">
        <a href="#" class="d-flex flex-row link-body-emphasis text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">
            <img src="${imgLink}" alt="mdo" width="32" height="32" class="rounded-circle">
                <p class="small lh-sm text-gray-dark">
                    <strong class=" text-gray-dark dropdown-toggle">@${name}</strong>
                </p>
        </a>
        <ul class="dropdown-menu text-small shadow">
            <li><a id="btnMeusDados${id}" class="dropdown-item" href="#" >Meus dados</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a id="btnSair${id}" class="dropdown-item" href="#">Sair</a></li>
        </ul>
    </div>
    `;
}

const setUserProfile = () => {
    const { username, imgLink } = LoginService.getUserSession();

    const navProfileLink = document.getElementById("user-profile-title");
    navProfileLink.innerHTML = '';
    navProfileLink.innerHTML = userProfile(0,username, imgLink);
   
    const btnMeusDados0 = document.getElementById('btnMeusDados0');
    btnMeusDados0.addEventListener('click', handleShowHideUser);
    
    const btnSair0 = document.getElementById('btnSair0');
    btnSair0.addEventListener('click', handleShowHideUser);
    

    const authorProfile = document.getElementById('authorProfile');
    authorProfile.innerHTML = '';
    authorProfile.innerHTML = userProfile(1,username, imgLink);

    const btnMeusDados1 = document.getElementById('btnMeusDados1');
    btnMeusDados1.addEventListener('click', handleShowHideUser);
    
    const btnSair1 = document.getElementById('btnSair1');
    btnSair1.addEventListener('click', handleShowHideUser);
    
}

const setSignedUser = () => {
    handleShowHide();
    setUserProfile();

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
        setSignedUser()

    }).catch(error => {
        alert(`Login inválido. Erro:${error.message}`)
    })
}


const LoginComponent = {
    run: () => {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', handleLogin);
    },
}

export { LoginComponent, setSignedUser, userProfile }