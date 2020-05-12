import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {chatActions} from "./chatActions";



 const fetchChatData={};
export const chatReducers=combineReducers({
    allChats:createReducer([])
        .handleAction(chatActions.allChatList.success,(state,action)=>action.payload)
        .handleAction(chatActions.removeChat.request,(state,action)=>state.filter(chat=>chat.id!==action.payload)),
   fetchChatsByUser_id:createReducer([])
       .handleAction(chatActions.chatsByUser_Id.success,(state,action)=>action.payload),

       // .handleAction(chatActions.filterChatByUser_idFromName,(state,action)=> state.filter(chat=>chat.name.includes(action.payload))),
    fetchChat:createReducer(fetchChatData)
        .handleAction(chatActions.fetchChat.success,(state,action)=>action.payload)
        .handleAction(chatActions.addChatMessage,(state,action)=>state.id===action.payload.chat_id?{...state,messages:[...state.messages,action.payload]}:state)
        // .handleAction(chatActions.filterChatFromUser_id,(state,action)=>state.users.map(user=>user.id===action.payload.user_id&&state.users.push(action.payload.user)))

});
