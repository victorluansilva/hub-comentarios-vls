import { CommentService } from '../services/comment.service.js'
import { Comment } from "../models/comment.model.js";
import MainView from '../view/main.view.js';


const getCommentInput = () => {
    return document.getElementById('inputComment')
}
const getInputCommentValue = () => {
    return document.getElementById('inputComment').value
}
const setInputComment = (commentValue) => {
    const { comment } = getCommentInput();
    comment.value = commentValue
}
const clearCommentField = () => {
    getCommentInput().value = ''
}

// HANDLER DE EDIÇÃO DE COMENTÁRIOS

const handleClick = (event) => {
    event.preventDefault()
    
    console.log(event)
}

const setCommentField = ({firstname, lastname}) => {
    const inputAuthor = document.getElementById('inputAuthor');
    inputAuthor.value = firstname + ' ' + lastname;
    inputAuthor.style.backgroundColor = '#444'
    inputAuthor.style.color = '#FFF'
}

const submitComment = (event) => {
    event.preventDefault();

    const comment = {
        userId: null,
        comment_text: getInputCommentValue()
    };

    CommentService.apiPostComment(comment).then(result => {
        alert(result)
        clearCommentField();
        loadComment();
    }).catch((error) => {
        console.log(error)
    });
}

const loadComment = () => {
    // Dados carregados da API
    CommentService.apiGetComment().then(result => {
        const comments = result.map(
            (comment) => new Comment(comment.id, comment.userId, comment.author, comment.comment_text, comment.created_at, comment.updated_at)
        );
        MainView.commentsUpdate(comments,'Feed', handleClick)
    }).catch(error => {
        console.error(error);
        alert(error);
    })
}

const CommentComponent = {
    run: () => {
        const formComentario = document.getElementById('formComment')
        formComentario.addEventListener("submit", submitComment)
        window.onload = () => {
            loadComment();
        }
    },
}

export { CommentComponent, setInputComment, setCommentField, loadComment }