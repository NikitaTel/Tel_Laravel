import { isActionOf} from "typesafe-actions";
import {chatActions} from "./chatActions";
import {ajax} from "rxjs/ajax";
import {api_v1} from "../../routes";
import {combineEpics} from "redux-observable";
import { filter, map, mergeMap} from "rxjs/operators";
import {stringify} from "qs";



export const createChatEpic=(action$)=>action$.pipe(
    filter(isActionOf(chatActions.createChat.request)),
    mergeMap(action=>ajax.post(api_v1.createChat,action.payload)),
    map(res=>res.status===200?
        chatActions.createChat.success(res.status):
        chatActions.createChat.failure()
    )

);

export const fetchAllChats=(action$)=>action$.pipe(
  filter(isActionOf(chatActions.allChatList.request)),
  mergeMap(()=>ajax.get(api_v1.allChatList)),
  map(res=>res.status===200?
    chatActions.allChatList.success(res.response):
      chatActions.allChatList.failure()
  )
);

export const removeChat=(action$)=>action$.pipe(
    filter(isActionOf(chatActions.removeChat.request)),
    mergeMap(action=>ajax.delete(`${api_v1.deleteChat}/${action.payload}`)),
    map(res=>chatActions.removeChat.success(res.status))

);

export const fetchChatByUser_id=(action$)=>action$.pipe(
    filter(isActionOf(chatActions.chatsByUser_Id.request)),
    mergeMap(action=>ajax.get(`${api_v1.chatsFromUserId}/${action.payload}`)),
    map(res=>res.status===200?
        chatActions.chatsByUser_Id.success(res.response):
        chatActions.chatsByUser_Id.failure()
    )
);


export const fetchChat=(action$)=>action$.pipe(
    filter(isActionOf(chatActions.fetchChat.request)),
    mergeMap(action=>ajax.get(`${api_v1.chat}/${action.payload}`)),
    map(res=>res.status===200?
        chatActions.fetchChat.success(res.response):
        chatActions.fetchChat.failure()
    )
);

export const addMessage=(action$)=>action$.pipe(
    filter(isActionOf(chatActions.sentMessage.request)),
    mergeMap(action=>ajax.post(`${api_v1.addMessage}`,action.payload)),
    map(res=>res.status=201?
    chatActions.sentMessage.success(res.response):
        chatActions.sentMessage.failure()
    )
);

// export const entryIntoChat=(action$)=>action$.pipe(
//     filter(isActionOf(chatActions.entryIntoChat.request)),
//     mergeMap(action=>ajax.post(`${api_v1.entryIntoChat}/${action.payload.id}`,action.payload)),
//     map(res=>res.status===201&&200?
//         console.log(res.response,'res'):
//         console.log('error')
//     )
// );

export const chatEpic=combineEpics(
    createChatEpic,
    fetchChatByUser_id,
    fetchChat,
    addMessage,
    fetchAllChats,
    removeChat,
);
