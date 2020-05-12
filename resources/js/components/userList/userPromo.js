import * as React from 'react'
import './userPromoStyles.scss'
import {Button, } from "@shopify/polaris";
import {useDispatch} from "react-redux";
import {userActions} from "../../redux/user/userActions";
import {Link} from "react-router-dom";

export const UserPromo=(props)=>{

    const dispatch=useDispatch();
    const userRole=JSON.parse(sessionStorage.getItem('userData'));
    return(
            <div className={'userPromo_container'}>
                <div className={'user_data'}>
                    <img
                        alt=""
                        width="32px"
                        height="32px"

                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius:'50%'
                        }}
                        src={`http://127.0.0.1:8000/storage/${props.avatar}`}
                    />
                    <div className={'user_description'}>
                        <span className={'first_name'}>{props.firstName}</span>
                        <span className={'description'}>{props.user_description}</span>
                    </div>
                </div>

          <div style={{width:'40%',display:'flex',justifyContent:userRole.user.role!==1? 'flex-end':'space-between'}}>
              {userRole.user.role===1&&
              <Button destructive onClick={()=>dispatch(userActions.removeUser.request(props.id))}>Удалить</Button>
              }
                <Link to={`/page/profile/${props.id}`}>
                    <Button primary>Перейти</Button>
                </Link>
          </div>
            </div>



    )
};
