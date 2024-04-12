import { LoginComponent } from "./src/components/login.component.js";
import { CommentComponent } from "./src/components/comment.component.js";
import { UserComponent } from "./src/components/user.component.js";
import MainView from "./src/view/main.view.js";

MainView.build();
LoginComponent.run();
CommentComponent.run();
UserComponent.run();