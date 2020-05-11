import * as React from 'react'
import  './navigation.scss'
import {Link} from "react-router-dom";
import AccountIcon from "mdi-react/AccountIcon";
import ForumOutlineIcon from "mdi-react/ForumOutlineIcon";
import MessageOutlineIcon from "mdi-react/MessageOutlineIcon";
import NewspaperVariantIcon from "mdi-react/NewspaperVariantIcon";
import AccountGroupIcon from "mdi-react/AccountGroupIcon";


export const Navigationlayout=()=>{
    const userId=JSON.parse(sessionStorage.getItem('userData'));
    return(
        <div className={'container_navigation'}>
            <Link to={`/page/profile/${userId.user.id}`} >
                <AccountIcon size={16}/>
              <span>
                    Профиль
              </span>

            </Link>
            {userId.user.role===1&&
            <Link to={'/page/all_chats'}>
                <ForumOutlineIcon size={16}/>
               <span>
                    Все чаты(только для админов)
               </span>
            </Link>
            }
            <Link to={'/page/chats'}>
                <MessageOutlineIcon size={16}/>
                <span>
                     Мои чаты
                </span>
               </Link>


            <Link to={'/page/news'}>
                <NewspaperVariantIcon size={16}/>
                <span>
                    Новости
                </span>
            </Link>
            <Link to={'/page/allUsers'}>
                <AccountGroupIcon size={16}/>
               <span>
                    Пользователи
               </span>
            </Link>
        </div>
    )
};
