import { CommentService } from '../services/comment.service.js'
import { Comment } from "../models/comment.model.js";
import MainView from '../view/main.view.js';
import LoginService from '../services/login.service.js';


let _subimitState = 0;
let _selection = null;

const getCommentInput = () => {
    return document.getElementById('inputComment')
}
const getInputCommentValue = () => {
    return document.getElementById('inputComment').value
}
const setInputComment = (commentValue) => {
    const comment = getCommentInput();
    comment.value = commentValue
}
const clearCommentField = () => {
    getCommentInput().value = ''
}

// HANDLER DE EDIÇÃO DE COMENTÁRIOS
const handleClick = (event) => {
    event.preventDefault();
    _selection = event.target.closest('div').id.split('-')[1];
    CommentService.apiGetCommentById(_selection).then((comment) => {
        const user = LoginService.getUserSession();
        if (user.getId() === comment.userId) {
            if (event.type === 'click') {
                const isToEdit = window.confirm('Você deseja editar o comentário?')
                if (isToEdit) {
                    setInputComment(comment.comment_text)
                    _subimitState = 1;
                }
            } else if (event.type === 'contextmenu') {
                const isToEdit = window.confirm('Você deseja excluir o comentário?')
                if (isToEdit) {
                    const isSure = window.confirm('Você tem certeza que quer excluir o comentário?')
                    if (isSure) {
                        console.log('Botão direito')
                    }
                }
            }
        }
    }).catch(error => {
        alert(error.message);
    });
}

const submitComment = (event) => {
    event.preventDefault();

    let comment = new Comment()
    comment.setUserId(LoginService.getUserSession().getId());
    comment.setComment(getInputCommentValue());

    if (_subimitState === 1){
        comment.setId(_selection);
        CommentService.apiUpdateComment(comment).then((result) =>{
            alert(result)
            clearCommentField();
            loadComment();
        })
        _subimitState = 0;
    } else {
        CommentService.apiPostComment(comment).then(result => {
            alert(result)
            clearCommentField();
            loadComment();
        }).catch((error) => {
            console.log(error)
        });
    }
}

const loadComment = () => {
    // Dados carregados da API
    CommentService.apiGetComment().then(result => {
        const comments = result.map(
            (comment) => new Comment(comment.id, comment.userId, comment.author, comment.comment_text, comment.created_at, comment.updated_at)
        );
        MainView.commentsUpdate(comments, 'Feed', handleClick)
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

export { CommentComponent, setInputComment, loadComment }