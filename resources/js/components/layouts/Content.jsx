import * as React from 'react'
import {Route, Switch} from "react-router";
import {Profile} from "../profile/profile";
import {News} from "../news/News";
import {UserList} from "../userList/userList";
import {ChatList} from "../chat/chatList";
import {Chat} from "../chat/chat";
import {AllChats} from "../chat/allChats";

export const Content=()=>{
    return(
        <div style={{width:'100%',background:'#ebecee',minHeight:'100vh'}}>
                   <Switch>
                       <Route   path={'/page/profile/:id'} component={Profile}/>
                       <Route path={'/page/news'} component={News}/>
                        <Route  path={'/page/allUsers'} component={UserList}/>
                        <Route path={'/page/chats'} component={ChatList}/>
                        <Route path={'/page/chat/:id'} component={Chat}/>
                        <Route path={'/page/all_chats'} component={AllChats}/>
                   </Switch>
        </div>
    )
};
