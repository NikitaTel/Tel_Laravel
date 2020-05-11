import {userActions} from "../user/userActions";
import {combineReducers} from "redux";
import {userReducers} from "../user/userReducers";
import {combineEpics} from "redux-observable";
import {connectRouter} from 'connected-react-router'
import {combineUserEpic} from "../user/userEpics";
import {chatEpic} from "../chat/chatEpics";
import {chatActions} from "../chat/chatActions";
import {postEpics} from "../profile/posts/postEpics";
import {postActions} from "../profile/posts/postActions";
import {postReducers} from "../profile/posts/postReducers";
import {chatReducers} from "../chat/chatReducers";

export const RootAction={
    user:userActions,
    chat:chatActions,
    post:postActions
};




export const RootState=(history)=>combineReducers({
    users:userReducers,
    posts:postReducers,
    chats:chatReducers,
    router:connectRouter(history)
});



export const RootEpic=combineEpics(
    combineUserEpic,
    chatEpic,
    postEpics

);


