import * as React from 'react'
import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {chatActions} from "../../redux/chat/chatActions";
import {Button, FormLayout, TextField} from "@shopify/polaris";
import {useState} from "react";
import {mergeObject} from "../../utilsF";
import {useCallback} from "react";
import './chatStyles.scss'
import {useMemo} from "react";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import Echo from 'laravel-echo'


export const Chat = () => {
    const chatId = useParams();
    const userId=JSON.parse(sessionStorage.getItem('userData'));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(chatActions.fetchChat.request(chatId.id))
    }, []);



    const messageExample = {
        content: '',
        user_id: userId.user.id,
        chat_id: chatId.id
    };
    const [newMessage, setNewMessage] = useState(messageExample);
    const mergeMessage = (message) => setNewMessage(mergeObject(message));


    const chatData = useSelector(state => state.chats.fetchChat) ?? {};


    const checkUser=useMemo(()=>
            chatData.users?.filter(item=>item.id === userId.user.id)
   ,[chatData] )


    useEffect(() => {
        window.Echo.channel(`chat.${chatId.id}`)
            .listen('SentMessageEvent', (e) => {
                dispatch(chatActions.addChatMessage(e.message))

            });
    }, []);

    const submitMessage = useCallback(() => {
        dispatch(chatActions.sentMessage.request(newMessage))
    }, [newMessage, dispatch]);


    return (
        <div className={'chat_container'}>
            <div className={'chatInfo'}>
                <div className={'chatInfo_block'}>
                 <span className={'chatInfo_block_key'}>
                    Всего пользователей:
                </span>
                    <span className={'chatInfo_block_value'}>
                    {chatData.users?.length}
                </span>
                </div>
                <div className={'chatInfo_block'}>
                    <span className={'chatInfo_block_key'}>
                        Всего сообщений:
                    </span>
                    <span className={'chatInfo_block_value'}>
                        {chatData.messages?.length}
                    </span>
                </div>
            </div>
            {checkUser&&
            <Modal show={!checkUser.length}>
                <Modal.Header>Предупреждение</Modal.Header>
                <Modal.Body>К сожалению , вы не были приглашены в данный чат</Modal.Body>

                   <div style={{width:'40%',padding:'15px'}} >
                       <Button primary onClick={()=>history.back()} size={'small'}>Покинуть</Button>
                   </div>

            </Modal>
            }

            <div className={'message_list'}>
                {chatData.messages?.map((message) =>
                    <div key={message?.id} className={message.user_id !==userId.user.id?'enemy_message': 'your_message'}>

                        <img src={`http://127.0.0.1:8000/storage/${message.user_avatar}`} style={{width: '30px', height: '30px', borderRadius: '50%'}}/>
                        <div className={'message_content'}>
                            <div className={'username'}>
                                {message.username}
                            </div>
                            <div className={'message'}>
                                {message.content}
                            </div>
                        </div>


                    </div>
                )}
            </div>
            <div className={'message_creator'}>
                <FormLayout>
                    <TextField
                        value={newMessage.content}
                        onChange={(e) => mergeMessage({content: e})}
                        label="Введите новое сообщение"
                        type="text"
                    />

                    <Button onClick={()=>submitMessage()} primary>Отправить</Button>
                </FormLayout>
            </div>
        </div>
    )
}
