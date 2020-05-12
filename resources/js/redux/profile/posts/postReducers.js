import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {postActions} from "./postActions";

export const postReducers=combineReducers({
    fetchAllPosts:createReducer([])
        .handleAction(postActions.fetchAllPosts.success,(state,action)=>action.payload)

})
