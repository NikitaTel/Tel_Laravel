import {createAsyncAction} from "typesafe-actions";

export const postActions={
  createPost:createAsyncAction(
      '@POSTS/CREATE_REQUEST',
      '@POSTS/CREATE_SUCCESS',
      '@POSTS/CREATE_FAILURE',
  )(),
  fetchAllPosts:createAsyncAction(
      '@POSTS/ALL_POSTS_REQUEST',
      '@POSTS/ALL_POSTS_SUCCESS',
      '@POSTS/ALL_POSTS_FAILURE'
  )()
};
