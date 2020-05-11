import * as React from 'react'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/user/userActions";
import {UserPromo} from "./userPromo";
import {useCallback} from "react";
import {useState} from "react";
import {Button, Checkbox, Form, FormLayout, TextField} from "@shopify/polaris";
import {mergeObject, prepareWithoutEmptyKeys} from "../../utilsF";


export const UserList=()=>{
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(userActions.fetchAllUsers.request())
    },[]);



    const filters={
        username:'',
        birthday:'',
        animals:''
    };

    const [userFilters,setUserFilters]=useState(filters);

    const mergeFilters=(changes)=>setUserFilters(mergeObject(changes));

    const sentUserFilters=useCallback(()=>{
        dispatch(userActions.fetchAllUsers.request( prepareWithoutEmptyKeys(userFilters)))
    },[userFilters]);


    const allUsers=useSelector(state=>state.users.fetchAllUsers);
    return(
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'30px'}} >

                {allUsers.length>0&&
                <div style={{width:'100%',background:'white',borderRadius:'6px',padding:'7px',border:' border:1px solid #d1d2d5;'}}>
                <div>
                        <span style={{fontWeight:'bolder'}}>
                            Всего пользователей
                        </span>
                    <span style={{color:'gray',paddingLeft:'7px'}}>
                            {allUsers.length}
                        </span>
                </div>
                </div>
                }
                <div style={{width:'100%',background:'white',marginTop:'20px',padding:'15px'}}>
                    <Form onSubmit={sentUserFilters}>
                        <FormLayout>


                            <TextField
                                value={userFilters.username}
                                onChange={e=>mergeFilters({username:e})}
                                label="По имени пользователя"
                                type="text"

                            />
                            <TextField
                                value={userFilters.birthday}
                                onChange={e=>mergeFilters({birthday:e})}
                                label="По дате рождения"
                                type="text"

                            />
                            <TextField
                                value={userFilters.animals}
                                onChange={e=>mergeFilters({animals:e})}
                                label="По любимым животным"
                                type="text"

                            />

                         <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                             <Button  primary submit>Показать пользователей</Button>
                             <Button  destructive onClick={()=>setUserFilters(filters)}>Сбросить фильтры</Button>
                         </div>
                        </FormLayout>
                    </Form>
                </div>

            {allUsers.map(user=>
            <UserPromo firstName={user.firstName} user_description={user.user_description} id={user.id} key={user.id} avatar={user.avatar} />
            )}
        </div>
    )
};
