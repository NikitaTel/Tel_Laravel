import {isActionOf} from "typesafe-actions";
import {postActions} from "./postActions";
import {ajax} from "rxjs/ajax";
import {api_v1} from "../../../routes";
import {combineEpics} from "redux-observable";
import { filter, map, mergeMap} from "rxjs/operators";
import {userActions} from "../../user/userActions";
import {stringify} from "qs";


export const deletePostEpic=(action$)=>action$.pipe(
    filter(isActionOf(postActions.deletePost.request)),
    mergeMap(action=>ajax.delete(`${api_v1.deletePost}/${action.payload}`)),
    map(res=>res.status===200?
    postActions.deletePost.success(res.response):
        postActions.deletePost.failure()
    )
)

 export const createPostEpic=(action$,state$)=>action$.pipe(
    filter(isActionOf(postActions.createPost.request)),
    mergeMap(action=>ajax.post(api_v1.createPost,action.payload)),
    map(res=>res.status===201?
       userActions.pushPost(res.response):
        postActions.createPost.failure()
    )
);

export const fetchAllPosts=(action$)=>action$.pipe(
    filter(isActionOf(postActions.fetchAllPosts.request)),
    mergeMap((action)=>ajax.get(`${api_v1.allPosts}?${stringify(action.payload)}`)),
    map(res=>res.status===200?
        postActions.fetchAllPosts.success(res.response):
        postActions.fetchAllPosts.failure()
    )
);

export const postEpics=combineEpics(
    createPostEpic,
    fetchAllPosts,
    deletePostEpic
);
