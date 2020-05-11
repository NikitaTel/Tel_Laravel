import  './chatPromoStyles.scss'
import * as React from 'react'
import {Button, Card} from "@shopify/polaris";
import {Link} from "react-router-dom";
import {chatActions} from "../../redux/chat/chatActions";
import {useDispatch} from "react-redux";
export const ChatItem=(props)=>{
    const dispatch=useDispatch();
    const user=JSON.parse(sessionStorage.getItem('userData'));
    return(
        <Card title={props.chat.name} sectioned >

            <div className={'user_avatars_list'}>
                {props.chat.users.map(user=>
                    <div key={user.id}>
                        <p>
                            {user.name}
                        </p>
                        <Link to={`/page/profile/${user.id}`}>
                            <img src={`http://127.0.0.1:8000/storage/${user.avatar}`} style={{width:'30px',height:'30px',borderRadius:'50%'}}/>
                        </Link>

                    </div>
                )}
            </div>
            <div className={'button_grp'}>
                <Link to={`/page/chat/${props.chat.id}`}>
                    <Button primary>Перейти в чат</Button>
                </Link>
                {user.user.role===1||user.user.id===props.chat.creator_id?
                <Button destructive onClick={()=>dispatch(chatActions.removeChat.request(props.chat.id))}>Удалить</Button>:null
                }
            </div>

        </Card>





    )
}
