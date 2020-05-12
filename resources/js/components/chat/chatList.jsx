import * as React from 'react'
import {useState} from "react";
import {useEffect} from "react";
import {api_v1} from "../../routes";
import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {chatActions} from "../../redux/chat/chatActions";
import { Button, DropZone, FormLayout,  TextField} from "@shopify/polaris";
import {mergeObject} from "../../utilsF";
import {useMemo} from "react";
import {userActions} from "../../redux/user/userActions";
import axios from "axios";

import './chatListStyles.scss'
import {ChatItem} from "./chatItem";





export const ChatList= ()=>{
    const userId=JSON.parse(sessionStorage.getItem('userData'));

     // const selector=useSelector(state=>state.users.loginUser);

    const createChatData={
        name:'',
        creator_id:userId.user.id,
        users:[userId.user.id],
        avatar:''
    };


    const dispatch=useDispatch();

    const users=useSelector(state=>state.users.fetchAllUsers);
    const chats=useSelector(state => state.chats.fetchChatsByUser_id);

    useEffect(()=>{
        dispatch(chatActions.chatsByUser_Id.request(userId.user.id));
        dispatch(userActions.fetchAllUsers.request());
    },[dispatch]);


    const chatFormData=new FormData();

    const [userFilter,setFilter]=useState('');
    const [chatData,setChatData]=useState(createChatData);
    const [chatDataNameInputFocus,setChatDataNameInputFocus]=useState(false);

    chatFormData.append('name',chatData.name)
    chatFormData.append('users',chatData.users.join());
    chatFormData.append('creator_id',chatData.creator_id);
    const mergeChatData=(changes)=>setChatData(mergeObject(changes));

    const memoFilterUsers=useMemo(()=>
        users.filter(item=>item.firstName.includes(userFilter)&&item.id!==userId.user.id)
    ,[users,userFilter]);

    const createChat=useCallback(()=>{
        axios.post(`${api_v1.createChat}`,chatFormData,{headers:{
                "Content-Type":"multipart/form-data"
            }}).then(res=>res.status===201?
                dispatch(chatActions.createChat.success(res.data)):
                    dispatch(chatActions.createChat.failure())
        )
    },[chatData,chatFormData]);

        console.log(chats,'chats')
    return(
        <div className={'chat_list_container'}>
            <div className={'create_chat_form'}>
                <div className={'inputs'}>
                <FormLayout>


                      <TextField
                          value={chatData.name}
                          onChange={(e)=>mergeChatData({name:e})}
                          label="Название чата"
                          type="text"
                      />
                      <TextField
                          value={userFilter}
                          onChange={(e)=>setFilter(e)}
                          label="Добавьте пользователей чата"
                          type="text"
                          onBlur={()=>setChatDataNameInputFocus(false)}
                          onFocus={()=>setChatDataNameInputFocus(true)}
                      />
                      <div>

                          <div className={'dropdown_user_list'}>
                              {memoFilterUsers?.map(user=>

                                  <div key={user.id} onClick={()=>setChatData(prevState=>({...prevState,users:[...prevState.users,user.id]}))} className={'dropdown_user_list_item'}>
                                      <img src={`http://127.0.0.1:8000/storage/${user.avatar}`} style={{width:'30px',height:'30px',borderRadius:'50%'}}/>
                                      <div>
                                          <div className={'username'}>
                                              {user.firstName}
                                          </div>
                                          <div className={'user_status'}>{user.status}</div>
                                      </div>
                                  </div>
                              )}
                          </div>


                  </div>
                    <Button onClick={()=>createChat()} primary>Создать чат</Button>
                </FormLayout>

                </div>
                    <div style={{width: '200px',paddingRight:'30px'}}>
                        <DropZone onDrop={files => chatFormData.append('avatar',files[0])}>
                            <DropZone.FileUpload  />
                        </DropZone>
                    </div>

            </div>


            <div className={'chats_list'}>
                {
                    chats.map(chat=>
                        <ChatItem chat={chat} key={chat.id} />
                    )
                }

            </div>

        </div>
    )
};
