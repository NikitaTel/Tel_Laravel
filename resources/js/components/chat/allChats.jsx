import * as React from 'react'
import {chatActions} from "../../redux/chat/chatActions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ChatItem} from "./chatItem";

export const AllChats = () => {
    const dispatch = useDispatch();

    const chatList = useSelector(state => state.chats.allChats);

    useEffect(() => {
        dispatch(chatActions.allChatList.request());
    }, [dispatch])
    return (
        <div>
            {chatList.length > 0 &&
            <div style={{
                width: '100%',
                background: 'white',
                borderRadius: '6px',
                padding: '7px',
                border: ' border:1px solid #d1d2d5;'
            }}>
                <div>
                        <span style={{fontWeight: 'bolder'}}>
                            Всего чатов
                        </span>
                    <span style={{color: 'gray', paddingLeft: '7px'}}>
                            {chatList.length}
                        </span>
                </div>
            </div>
            }
            <div style={{
                marginTop: '15px',
                display: 'grid',
                width: '100%',
                justifyContent: 'center',
                gridRowGap: '15px'
            }}>

                {chatList.map(chat =>
                    <ChatItem chat={chat} key={chat.id}/>
                )}
            </div>
        </div>
    )
}
