import {createAction, createAsyncAction} from "typesafe-actions";

export const chatActions={
  createChat:createAsyncAction(
      '@CHAT/CREATE_CHAT_REQUEST',
      '@CHAT/CREATE_CHAT_SUCCESS',
      '@CHAT/CREATE_CHAT_FAILURE',
  )(),
    chatsByUser_Id:createAsyncAction(
        '@CHAT/CHAT_BY_USER_ID_REQUEST',
        '@CHAT/CHAT_BY_USER_ID_SUCCESS',
        '@CHAT/CHAT_BY_USER_ID_FAILURE',
    )(),
    // filterChatByUser_idFromName:createAction('@CHAT/FILTER_CHAT_BY_USER_ID_FROM_NAME')(),
    fetchChat:createAsyncAction(
        '@CHAT/FETCH_CHAT_REQUEST',
        '@CHAT/FETCH_CHAT_SUCCESS',
        '@CHAT/FETCH_CHAT_FAILURE',
    )(),

    sentMessage:createAsyncAction(
        '@CHAT/SENT_MESSAGE_REQUEST',
        '@CHAT/SENT_MESSAGE_SUCCESS',
        '@CHAT/SENT_MESSAGE_FAILURE',
    )(),
    removeChat:createAsyncAction(
        '@CHAT/REMOVE_CHAT_REQUEST',
        '@CHAT/REMOVE_CHAT_SUCCESS',
        '@CHAT/REMOVE_CHAT_FAILURE',
    )(),
    allChatList:createAsyncAction(
        '@CHAT/CHAT_LIST_REQUEST',
        '@CHAT/CHAT_LIST_SUCCESS',
        '@CHAT/CHAT_LIST_FAILURE'
    )(),
    addChatMessage:createAction(
        '@CHAT/PUSH_MESSAGE_CHAT'
    )(),
    updateChat:createAsyncAction(
        '@CHAT/UPDATE_CHAT_REQUEST',
        '@CHAT/UPDATE_CHAT_SUCCESS',
        '@CHAT/UPDATE_CHAT_FAILURE',
    )(),
    // entryIntoChat:createAsyncAction(
    //     '@CHAT/ENTRY_INTO_CHAT_REQUEST',
    //     '@CHAT/ENTRY_INTO_CHAT_SUCCESS',
    //     '@CHAT/ENTRY_INTO_CHAT_FAILURE',
    // )(),
    // filterChatFromUser_id:createAction(
    //     '@CHAT/FILTER_CHAT_FROM_USER_ID'
    // )()
};
