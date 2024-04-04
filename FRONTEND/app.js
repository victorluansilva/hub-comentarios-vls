const header = `
<!-- HEADER -->
<header>
     <!-- USER PROFILE -->
    <div id="user-profile" class="flex-shrink-0 dropdown m-2 disabled">
        <a id="user-profile-title" href="#" class="d-flex flex-row link-body-emphasis text-decoration-none " data-bs-toggle="dropdown"
            aria-expanded="false">
            
        </a>
        <ul class="dropdown-menu text-small shadow">
            <li><a class="dropdown-item" href="#" id="btnMeusDados">Meus dados</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" id="btnSair" href="#">Sair</a></li>
        </ul>
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
                <label for="autor">Autor</label>
                <input type="text" name="autor" id="inputAuthor" readonly>
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
    <div class="feed comments col my-3 p-3 bg-body rounded shadow">
        <div id="comment-feed">
        
        </div>
        <small class="d-block text-end mt-3">
            <a href="#">All updates</a>
        </small>
    </div>
</div>
</main>
`



const App = {
    build: () => {
        const appStructure = header + main;
        document.body.innerHTML = ``;
        document.body.innerHTML = appStructure;
    }
}

export default App;