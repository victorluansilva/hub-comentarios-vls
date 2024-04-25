import UserService from "../services/user.service.js";
import LoginService from "../services/login.service.js";
import { randomColors } from "../utils.js";
import { loadComment } from "./comment.component.js";
import MainView from '../view/main.view.js';
import { userIcon } from './login.component.js';

let _inEdition = false;
let _modalExample;
let _modal;

const loadUserData = () => {
    const user = LoginService.getUserSession();
    displayUserData(user);
}
const iconeUsuario = (avatarColor, imgLink) => {

    if (imgLink)
        return `
                <div id='userIcon' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal">
                ${userIcon(imgLink, 200, 200)} 
                </div>        
                `
    else
        return `
        <div id='userIcon' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24"
                fill="none">

                <path
                    d="M11.9999 10.41C13.2868 10.41 14.33 9.36684 14.33 8.08002C14.33 6.79319 13.2868 5.75 11.9999 5.75C10.7131 5.75 9.66992 6.79319 9.66992 8.08002C9.66992 9.36684 10.7131 10.41 11.9999 10.41Z"
                    fill="#${avatarColor}" />
                <path
                    d="M14.6792 15.0601C15.4892 15.0601 15.9592 14.1601 15.5092 13.4901C14.8292 12.4801 13.5092 11.8 11.9992 11.8C10.4892 11.8 9.16918 12.4801 8.48918 13.4901C8.03918 14.1601 8.5092 15.0601 9.3192 15.0601H14.6792Z"
                    fill="#${avatarColor}" />
                </svg>
                </div>
            `
}
const changeProfileIcon = () => {
    const inputImgLink = document.getElementById('inputImgLink');
    inputImgLink.value = LoginService.getUserSession().getImgLink();
}
const displayUserData = (user) => {
    const userContent = document.getElementById('user-content');
    userContent.innerHTML = ``
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `

    <div class="groupBtnsUserData">
    <button id='btnMeusComentarios' class='btn-submit btn btn-dark my-2'>Meus Comentários</button>
    <button id='btnEditUsuario' class="btn-submit btn btn-dark my-2  ${_inEdition ? 'editUsuario' : ''}">${_inEdition ? 'Salvar Edições' : 'Editar Dados'}</button>
    </div>

    ${iconeUsuario(randomColors().dark, user.getImgLink())}


    <div class="row d-inline-flex text-body-secondary rounded">
        <div class="col-4">
            <label class="form-label" for="user_name">Nome</label>
            <input class="form-control" type="text" name="user_name" id="user_firstname" value="${user.getFirstname()}"
            ${_inEdition ? '' : 'readonly'}>
        </div>
        <div class="col-4">
            <label class="form-label" for="user_lastname">Sobrenome</label>
            <input class="form-control" type="text" name="user_lastname" id="user_lastname"
                value="${user.getLastname()}" ${_inEdition ? '' : 'readonly'}>
        </div>
    </div>
    <div class="row d-inline-flex text-body-secondary rounded">
        <div class="col-4">
            <label class="form-label" for="user_login">Login</label>
            <input class="form-control" type="text" name="user_login" id="user_login" value="${user.getUsername()}"
            ${_inEdition ? '' : 'readonly'}>
            </div>
        <div class="col-4">
            <label class="form-label" for="user_password">Senha</label>
            <input class="form-control" type="password" name="user_password" id="user_password"
                value="........" ${_inEdition ? '' : 'readonly'}>
        </div>
    </div>
    
    `

    userContent.appendChild(newDiv)

    const btnMeusComentarios = document.getElementById('btnMeusComentarios');
    btnMeusComentarios.addEventListener('click', handleMeusComentarios);

    const btnEditUsuario = document.getElementById('btnEditUsuario');
    btnEditUsuario.addEventListener('click', handleEditUsuarios);

    const userIcon = document.getElementById('userIcon');
    userIcon.addEventListener('click', changeProfileIcon);

}

const handleEditUsuarios = () => {
    if (_inEdition) {
        const user = {
            id: LoginService.getUserSession().getId(),
            firstname: document.getElementById('user_firstname').value,
            lastname: document.getElementById('user_lastname').value,
            username: document.getElementById('user_login').value,
            password: document.getElementById('user_password').value,
            imgLink: document.getElementById('inputImgLink').value
        }
        UserService.apitUpdateUser(user).then(resposta => {
            alert(resposta)
            loadUserData();
        }).catch(err => {
            console.log(err)
        });
    } else {
        _inEdition = true;
        loadUserData();
    }
}
const handleMeusComentarios = () => {
    const user = LoginService.getUserSession();
    UserService.apiGetUserComments(user.id).then(data => {
        MainView.commentsUpdate(data, 'Meus Comentários')
    }).catch(error => {
        alert(error.message)
    })
}
const handleShowHideUser = () => {
    const userDataTag = document.getElementById('user-data');
    const newCommentTag = document.getElementById('form-comentario');
    if (userDataTag.classList.contains('disabled') && LoginService.isLoggedIn()) {
        userDataTag.classList.remove('disabled');
        newCommentTag.classList.add('disabled');
        loadUserData();
    } else {
        userDataTag.classList.add('disabled');
        _inEdition = false;
        if (LoginService.isLoggedIn()) {
            newCommentTag.classList.remove('disabled');
        }
        loadComment()
    }
}
const handleImgLink = () => {
    const user = {
        id: LoginService.getUserSession().getId(),
        imgLink: document.getElementById('inputImgLink').value,

    }
    UserService.apiUpdataImgLink(user).then(resposta => {
         alert(resposta);
        _modal.hide();

    }).catch(err => {
        console.log(err)
    });
}

// const listenerToBtnMeusDados = () => {
//     const btnMeusDados = document.getElementById('btnMeusDados');
//         btnMeusDados.addEventListener('click', handleShowHideUser);
// }

const UserComponent = {
    run: () => {

        const btnSairMDados = document.getElementById('btnSairMDados');
        btnSairMDados.addEventListener('click', handleShowHideUser);

        const btnSaveImg = document.getElementById('btnSaveImg');
        btnSaveImg.addEventListener('click', handleImgLink);

        _modalExample = document.querySelector('#exampleModal')
        _modal = new bootstrap.Modal(_modalExample) 
    }
}

export { UserComponent, handleShowHideUser }