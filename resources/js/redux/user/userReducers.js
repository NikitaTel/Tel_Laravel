import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {userActions} from "./userActions";




const allUser=[];
export const userReducers=combineReducers({
    fetchAllUsers:createReducer(allUser)
        .handleAction(userActions.fetchAllUsers.success,(state,action)=>action.payload)
        .handleAction(userActions.removeUser.request,(state,action)=>state.filter(user=>user.id!==action.payload)),
    fetchUser:createReducer({})
        .handleAction(userActions.fetchUser.success,(state,action)=>action.payload)
        .handleAction(userActions.pushPost,(state,action)=>{return {...state,posts:[...state.posts,action.payload]}}),
        // .handleAction(userActions.updateUserProfile.success)
    loginUser:createReducer({})
        .handleAction(userActions.loginUser.success,(state,action)=> action.payload)
    }

);

