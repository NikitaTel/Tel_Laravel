
import {isActionOf} from "typesafe-actions";
import {userActions} from "./userActions";
import {ajax} from "rxjs/ajax";
import {catchError, filter, map, mergeMap} from "rxjs/operators";
import {combineEpics} from "redux-observable";
import {api_v1} from "../../routes";
import {from, of} from "rxjs";
import {push} from "connected-react-router";
import {stringify} from 'qs'



export const fetchAllUser = (action$) => action$.pipe(
    filter(isActionOf(userActions.fetchAllUsers.request)),
    mergeMap((action) => ajax.get(`${api_v1.users}?${stringify(action.payload)}`)),
    map(res => res.status === 200 ?
        userActions.fetchAllUsers.success(res.response) :
        userActions.fetchAllUsers.failure()
    ),
    catchError(() => of(userActions.fetchAllUsers.failure()))
);

export const removeUser=(action$)=>action$.pipe(
    filter(isActionOf(userActions.removeUser.request)),
    mergeMap(action=>ajax.delete(`${api_v1.deleteUser}/${action.payload}`)),
    map(res=>userActions.removeUser.success(res.response))

);

export const fetchUser=(action$)=>action$.pipe(
    filter(isActionOf(userActions.fetchUser.request)),
    mergeMap(action=>ajax.get(`${api_v1.user}/${action.payload.id}`)),
    map(res=>res.status===200?
        userActions.fetchUser.success(res.response)
        :
        userActions.fetchUser.failure()
    )
);
// {"Content-Type":"multipart/form-data"}
export const updateUserProfile=(action$)=>action$.pipe(
    filter(isActionOf(userActions.updateUserProfile.request)),
    mergeMap(action=>ajax.post(`${api_v1.updateProfile}/${action.payload.id}`,action.payload,)),
    map(res=>res.status===200?
        userActions.updateUserProfile.success(res.response):
        userActions.updateUserProfile.failure()
    )
);

export const login=(action$)=>action$.pipe(
    filter(isActionOf(userActions.loginUser.request)),
    mergeMap(action=>ajax.post(api_v1.login,action.payload)),
    mergeMap(res=> {
            if(res.status===200){
                sessionStorage.setItem('userData', JSON.stringify(res.response));
                return from([
                    userActions.loginUser.success(res.response),
                    push('/page')
                ])
            }
            else{
                return of(userActions.loginUser.failure())
            }

    }),
    catchError(() => of(userActions.loginUser.failure()))
);

export const combineUserEpic=combineEpics(
    fetchAllUser,
    fetchUser,
    updateUserProfile,
    login,
    removeUser
);
