import { randomColors, formatDate } from "../utils.js";

const genericUserIcon = () => {
    const fillColor = randomColors().dark
    return `
    <div id='userIcon' type='button' data-bs-toggle="modal" data-bs-target="#editModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24"
            fill="none">

            <path
                d="M11.9999 10.41C13.2868 10.41 14.33 9.36684 14.33 8.08002C14.33 6.79319 13.2868 5.75 11.9999 5.75C10.7131 5.75 9.66992 6.79319 9.66992 8.08002C9.66992 9.36684 10.7131 10.41 11.9999 10.41Z"
                fill="#${fillColor}" />
            <path
                d="M14.6792 15.0601C15.4892 15.0601 15.9592 14.1601 15.5092 13.4901C14.8292 12.4801 13.5092 11.8 11.9992 11.8C10.4892 11.8 9.16918 12.4801 8.48918 13.4901C8.03918 14.1601 8.5092 15.0601 9.3192 15.0601H14.6792Z"
                fill="#${fillColor}" />
            </svg>
            </div>
        `
}

const buildUserIcon = (imgLink, width, height) => {
    if (imgLink)
        return `
    <img src="${imgLink}" alt="mdo" width="${width}" height="${height}" class="rounded-circle">
    `
    else
        return genericUserIcon();
}

// const builUserIconInUserData = (avatarColor) => {
//         return `
//               <div id='userIcon' type='button' data-bs-toggle="modal" data-bs-target="#editModal">
//               ${buildUserIcon(imgLink, 200, 200)} 
//               </div>        
//               `
// }

const buildModal = () => {
    let value = '...';

    // if (LoginService.isLoggedIn()) {
    //     value = LoginService.getUserSession().getImgLink();
    // }

    return `
    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalLabel">Editar imagem de perfil</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <label class="form-label" for="inputImgLink">Image link</label>
          <input class="form-control" type="text" name="inputImgLink" id="inputImgLink"
              value='${value}'>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button id='btnSaveImg' type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `}

const View = {

    render() {
        const root = document.getElementById('root');
        root.innerHTML = ``
        const header = () => {
            return `
        <!-- HEADER -->
        <header class="navbar fixed-top ">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Hub comment</a>
            </div>
             <!-- USER PROFILE -->
             <div id="user-profile" class="disabled">
                <div id="user-profile-title">
                </div>
             </div>
        </header>
        `}

        const main = () => `       
                <main class="container">
                    <div class="row">
                        <div id='LeftSide' class="comments col my-3 p-3 bg-body rounded shadow">
                        </div>
                        <div id='RightSide' class="comments col my-3 p-3 bg-body rounded shadow">
                        </div>
                    </div>
                </main>
        `

        const footer = () => {
            return `
        <!-- FOOTER -->
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <p class="text-center text-body-secondary">&copy;SENAI ITI - 2024</p>
                    </div>
                </div>
            </div>
        </footer>
        `}

        root.innerHTML = header() + main() + buildModal() + footer();
    },
    renderCommentFeed(comments, title) {
        const rightSide = document.getElementById('RightSide');
        rightSide.innerHTML = ``

        const feedTitle = document.createElement('div');
        feedTitle.innerHTML = `<h5 class="border-bottom pb-2 mb-0">${title ? title : 'Feed'}</h5>`

        rightSide.appendChild(feedTitle);

        const commentFeed = document.createElement('div');
        commentFeed.setAttribute("id", "comment-feed");
        commentFeed.className = ""


        if (comments && comments.length > 0) {
            comments.forEach(item => {
                const commentDiv = document.createElement('div');
                commentDiv.setAttribute("id", `${item.getAuthor()}-${item.getId()}`);
                commentDiv.className = 'd-flex text-body-secondary pt-3 border-bottom'
                commentDiv.innerHTML = `
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
                commentFeed.appendChild(commentDiv);
            })
            rightSide.appendChild(commentFeed);
        } else {
            commentFeed.innerHTML = `
            <p class='no-data-found'>
                Nenhum commentário foi encontrado
            </p>`
        }

        rightSide.appendChild(commentFeed);
    },
    renderLogin() {
        const leftSide = document.getElementById('LeftSide');
        leftSide.innerHTML = ``
        const loginView = `
        <!-- LOGIN FORM -->
        <div id="login-form" class="comments card" >
            <h2>Login</h2>
            <form id="formLogin">
                <input type="text" name="username" id="username" placeholder="seu login aqui..." required>
                <input type="password" name="password" id="password" placeholder="senha..." required>
                <button class="btn-submit btn btn-dark my-2" type="submit"> Enviar </button>
            </form>
        </div>`
        leftSide.innerHTML = loginView;

    },
    renderCommentForm(user) {
        const leftSide = document.getElementById('LeftSide');
        leftSide.innerHTML = ``
        const commentFormView = `
        <!--NEW COMMENTS -->
        <div class="" id="comment-form">
            <h3>Novo Comentário</h3>
            <form id="formComment">
                <div id="authorProfile">${buildUserIcon()
            }</div>
                <label for="comentario">Digite seu comentário</label>
                <textarea name="comentario" id="inputComment" required></textarea>
                <button type="submit" class="btn-submit btn btn-dark my-2">Enviar</button>
            </form>
        </div>`
        leftSide.innerHTML = commentFormView;
    },
    renderUserData() {
        const leftSide = document.getElementById('LeftSide');
        leftSide.innerHTML = ``;
        const userDataView = `
        <!-- USER DATA -->
        <div class="comments card shadow disabled" id="user-data">
            <h4>Dados do Usuário</h4>
            <div id="user-content">

            </div>
            <button id="btnSairMDados" class="btn-submit btn btn-dark my-2">Voltar</button>
        </div>
    </div>
    `
        leftSide.innerHTML = userDataView;
    }
}

export default View;