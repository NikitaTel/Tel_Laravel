import {createAction, createAsyncAction} from "typesafe-actions";


export const userActions={
    fetchAllUsers:createAsyncAction(
        '@USER/FETCH_ALL_USER_REQUEST',
        '@USER/FETCH_ALL_USER_SUCCESS',
        '@USER/FETCH_ALL_USER_FAILURE'
    )(),
    fetchUser:createAsyncAction(
        '@USER/FETCH_USER_REQUEST',
        '@USER/FETCH_USER_SUCCESS',
        '@USER/FETCH_USER_FAILURE',
    )(),
    pushPost:createAction(
        '@USER/PUSH_POST'
    )(),
    removeUser:createAsyncAction(
        '@USER/REMOVE_USER_REQUEST',
        '@USER/REMOVE_USER_SUCCESS',
        '@USER/REMOVE_USER_FAILURE',

    )(),
    loginUser:createAsyncAction(
        '@USER/USER_DATA_REQUEST',
        '@USER/USER_DATA_SUCCESS',
        '@USER/USER_DATA_FAILURE'

    )(),
    updateUserProfile:createAsyncAction(
        '@USER/UPDATE_PROFILE_REQUEST',
        '@USER/UPDATE_PROFILE_SUCCESS',
        '@USER/UPDATE_PROFILE_FAILURE',
    )()
};


