import UserService from "../services/user.service.js";
import LoginService from "../services/login.service.js";
import { formatDate, randomColors } from "../utils.js";
import { loadComment } from "./comment.component.js";

const loadUserData = () => {
    const user = LoginService.getUserSession();
    displayUserData(user);
}

const iconeUsuario = (avatarColor) => {
    return `
<div>
<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24"
fill="none">
<path
    d="M11.9999 10.41C13.2868 10.41 14.33 9.36684 14.33 8.08002C14.33 6.79319 13.2868 5.75 11.9999 5.75C10.7131 5.75 9.66992 6.79319 9.66992 8.08002C9.66992 9.36684 10.7131 10.41 11.9999 10.41Z"
    fill="#${avatarColor}" />
<path
    d="M14.6792 15.0601C15.4892 15.0601 15.9592 14.1601 15.5092 13.4901C14.8292 12.4801 13.5092 11.8 11.9992 11.8C10.4892 11.8 9.16918 12.4801 8.48918 13.4901C8.03918 14.1601 8.5092 15.0601 9.3192 15.0601H14.6792Z"
    fill="#${avatarColor}" />
</svg>
<div>
`
}



const displayUserData = (user) => {
    const userContent = document.getElementById('user-content');
    userContent.innerHTML = ``
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <div>
    <button id='btnMeusComentarios' class='btn-submit btn btn-dark my-2'>Meus Comentários</button>
    </div>
    ${iconeUsuario(randomColors().dark)}
    <div class="row d-inline-flex text-body-secondary rounded">
        <div class="col-4">
            <label class="form-label" for="user_name">Nome</label>
            <input class="form-control" type="text" name="user_name" id="user_firstname" value="${user.getFirstname()}"
                readonly>
        </div>
        <div class="col-4">
            <label class="form-label" for="user_lastname">Sobrenome</label>
            <input class="form-control" type="text" name="user_lastname" id="user_lastname"
                value="${user.getLastname()}" readonly>
        </div>
    </div>
    <div class="row d-inline-flex text-body-secondary  rounded">
        <div class="col-4">
            <label class="form-label" for="user_login">Login</label>
            <input class="form-control" type="text" name="user_login" id="user_login" value="${user.getUsername()}"
                readonly>
            </div>
        <div class="col-4">
            <label class="form-label" for="user_password">Senha</label>
            <input class="form-control" type="password" name="user_password" id="user_password"
                value="........" readonly>
        </div>
    </div>`

    userContent.appendChild(newDiv)

    const btnMeusComentarios = document.getElementById('btnMeusComentarios');
    btnMeusComentarios.addEventListener('click', handleMeusComentarios);

}

const handleMeusComentarios = () => {
    const user = LoginService.getUserSession();
    UserService.apiGetUserComments(user.id).then(data => {
        displayUserComments(data)
    }).catch(error => {
        alert(error.message)
    })
}

const displayUserComments = (comments) => {
    const divFeed = document.getElementById('comment-feed');
    divFeed.innerHTML = `<h5 class="border-bottom pb-2 mb-0"><b>Meus Comentários</b></h5>`
    comments.forEach(item => {
        const divDisplay = document.createElement('div');
        divDisplay.className = 'd-flex text-body-secondary pt-3 border-bottom'
        divDisplay.innerHTML = `
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32"
                xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>comentário</title>
                <rect width="100%" height="100%" fill="#${randomColors().dark}"></rect>
                <text x="35%" y="50%" fill="#${randomColors().light}"dy=".3em">${item.getAuthor().charAt(0)}</text>
            </svg>
            <p class="pb-3 mb-0 small lh-sm text-gray-dark">
                <strong class="d-block text-gray-dark">@${item.getAuthor()}
                <span class="date-style badge text-bg-secondary">${formatDate(item.getCreatedAt())}</span>
                </strong>
                <span class="comment">
                ${item.getComment()}
                </span>
            </p>        
        `
        divFeed.appendChild(divDisplay);
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
        if (LoginService.isLoggedIn()) {
            newCommentTag.classList.remove('disabled');
        }
        loadComment()
    }
}

const UserComponent = {
    run: () => {
        const btnMeusDados = document.getElementById('btnMeusDados');
        btnMeusDados.addEventListener('click', handleShowHideUser);
        const btnSairMDados = document.getElementById('btnSairMDados');
        btnSairMDados.addEventListener('click', handleShowHideUser);
    }
}

export { UserComponent }