let data = []

const submitComment = (event) => {
    event.preventDefault();

    const author = inputAuthor.value;
    const comment = inputComment.value;

    data.push({ author: author, comment: comment })
    console.log(data)

    loadComment()
}

const formComentario = document.getElementById('formComment')
formComentario.addEventListener("submit", submitComment)

const loadComment = () => {
    // Dados carregados da API
    if (data) {
        //displayComment();
    }
}

const displayComment = () => {
    const body = document.getElementsByTagName('body')[0];

    data.forEach(elemento => {
        const divDisplay = document.createElement('div');
        divDisplay.className = 'comentarios'
        divDisplay.innerHTML = `
        <strong>
        <span class="badge text-bg-secondary">${elemento.author}</span>
        </strong>
        <p>${elemento.comment}</p>
        `
        body.appendChild(divDisplay);
    })


}
