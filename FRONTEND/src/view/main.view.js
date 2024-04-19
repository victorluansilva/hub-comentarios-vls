import { formatDate, randomColors } from "../utils.js";
const header = `
<!-- HEADER -->
<header>
     <!-- USER PROFILE -->
     <div id="user-profile" class="disabled">
        <div id="user-profile-title">
        </div>
     </div>
</header>
`

const main = `
<main class="container">
<div class="row">
    <div class="col">
        <!-- LOGIN FORM -->
        <div class="comments card shadow" id="login-form">
            <h2>Login</h2>
            <form id="formLogin">
                <input type="text" name="username" id="username" placeholder="seu login aqui..." required>
                <input type="password" name="password" id="password" placeholder="senha..." required>
                <button class="btn-submit btn btn-dark my-2" type="submit"> Enviar </button>
            </form>
        </div>
        <!--NEW COMMENTS -->
        <div class="comments shadow disabled" id="form-comentario">
            <h3>Novo Comentário</h3>
            <form id="formComment">
                <div id="authorProfile"></div>
                <label for="comentario">Digite seu comentário</label>
                <textarea name="comentario" id="inputComment" cols="30" rows="10" required></textarea>
                <button type="submit" class="btn-submit btn btn-dark my-2">Enviar</button>
            </form>
        </div>
        <!-- USER DATA -->
        <div class="comments card shadow disabled" id="user-data">
            <h4>Dados do Usuário</h4>
            <div id="user-content">

            </div>
            <button id="btnSairMDados" class="btn-submit btn btn-dark my-2">Voltar</button>
        </div>
    </div>
    <!--FEED: DISPLAY COMMENTS -->
    <div id="feed" class="comments col my-3 p-3 bg-body rounded shadow">
    </div>
</div>
</main>
`



const MainView = {
    build: () => {
        const appStructure = header + main;
        document.body.innerHTML = ``;
        document.body.innerHTML = appStructure;
    },
    commentsUpdate: (comments, title, handler) => {
        const divFeed = document.getElementById('feed');
        divFeed.innerHTML = ``

        const feedTitle = document.createElement('div');
        feedTitle.innerHTML = `<h5 class="border-bottom pb-2 mb-0">${title ? title : 'Feed'}</h5>`
        divFeed.appendChild(feedTitle);

        const commentsGroup = document.createElement('div');
        commentsGroup.setAttribute("id", "comment-feed");

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
            commentsGroup.appendChild(commentDiv);
        })

        if (handler) {
            commentsGroup.addEventListener('click', handler);
            commentsGroup.addEventListener('contextmenu', handler);
        }


        divFeed.appendChild(commentsGroup);

        const smallTag = document.createElement('small');
        smallTag.className = 'd-block text-end mt-3';
        smallTag.innerHTML = `
            <a href="#">All updates</a>
        `;

        divFeed.appendChild(smallTag);


    }
}

export default MainView;
