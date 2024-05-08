import View from '../view/main.view.js';
import CommentController from './comment.controller.js';

const Controller = {
    run: () => {
        View.render();
        CommentController.run();
    }
}
export default Controller;