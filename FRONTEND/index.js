import { LoginComponent, setSignedUser } from "./src/components/login.component.js";
import { CommentComponent, loadComment } from "./src/components/comment.component.js";
import { UserComponent } from "./src/components/user.component.js";
import MainView from "./src/view/main.view.js";
import LoginService from "./src/services/login.service.js";

const main = {
    run: () => {
        MainView.build();
        LoginComponent.run();
        CommentComponent.run();
        UserComponent.run();
    }
}
main.run();
window.onload = () => {
    if (LoginService.isLoggedIn()) {
        setSignedUser()
    }

}
document.addEventListener("DOMContentLoaded", () => {
    if (LoginService.isLoggedIn()) {
        setSignedUser();
    }
    loadComment();
})

window.addEventListener("load", () => {
    if (LoginService.isLoggedIn()) {
        setSignedUser();
    }
    loadComment();
})