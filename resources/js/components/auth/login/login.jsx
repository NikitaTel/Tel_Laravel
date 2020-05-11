import * as React from 'react'
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {mergeObject} from "../../../utilsF";
import {useCallback} from "react";
import {api_v1} from "../../../routes";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userActions} from "../../../redux/user/userActions";


export const loginDataMock={
    email:'',
    password:''
};




export const Login=()=>{

    const [loginData,setLoginData]=useState(loginDataMock)
    const mergeLoginData=(changes)=>setLoginData(mergeObject(changes))

    const dispatch=useDispatch();
    const submit=useCallback(()=>{
            dispatch(userActions.loginUser.request(loginData))
    },[loginData]);

    return(
        <div className={'container'}>
            <div className={'wrapper_form'}>

                <Alert  variant={'light'}>Введите ваши данные,после чего войдите в приложение</Alert>

                <InputGroup className="mb-3">
                    <Form.Control type={'email'} placeholder={'email'}
                                  onChange={event => mergeLoginData({email: event.target.value})}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control type={'password'} placeholder={'Пароль'}
                                  onChange={event => mergeLoginData({password: event.target.value})}/>

                </InputGroup>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Сохранить пароль" />
                </Form.Group>

                <div style={{width:'100%',display:'flex',justifyContent:'space-between',paddingBottom:'20px'}}>
                    <Link to={'/registration'}>Регистрация</Link>
                    <Link to={'/restore'}>Восстановление пароля</Link>
                </div>
                <Button variant={'outline-info'} size={'lg'} onClick={() => submit()}>Войти</Button>
            </div>
        </div>
    )
};
