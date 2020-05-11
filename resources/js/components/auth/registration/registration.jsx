import * as React from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios'
import {api_v1} from "../../../routes";
import {useState} from "react";
import {mergeObject} from "../../../utilsF";
import {useCallback} from "react";
import {history} from "../../index";
import InputGroup from "react-bootstrap/InputGroup";
import './registrationStyles.scss'
import Alert from "react-bootstrap/Alert";
import {Link} from "react-router-dom";

const data = {
    firstName: '',
    email: '',
    password: ''
};

export const Registration = () => {

    const [submitData, setSubmitData] = useState(data);
    const merge = (changes) => setSubmitData(mergeObject(changes));
    const submit = useCallback(() => {
        axios.post(api_v1.registration, submitData).then(res => {
            history.push('/login')
        })
            .catch(e => {
                alert(e)
            })
    }, [submitData]);


    return (
        <div className={'container'}>
            <div className={'wrapper_form'}>

                <Alert  variant={'light'}>Введите ваши данные,после чего завершите регистрацию</Alert>
                <InputGroup className="mb-3">

                    <Form.Control type={'text'} placeholder={'Имя пользователя'}
                                  onChange={event => merge({firstName: event.target.value})}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control type={'email'} placeholder={'email'}
                                  onChange={event => merge({email: event.target.value})}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control type={'password'} placeholder={'Пароль'}
                                  onChange={event => merge({password: event.target.value})}/>

                </InputGroup>
                <div style={{width:'100%',display:'flex',justifyContent:'space-between',paddingBottom:'20px'}}>
                    <Link to={'/login'}>Авторизация</Link>
                    <Link to={'/restore'}>Восстановление пароля</Link>
                </div>
                <Button variant={'outline-info'} onClick={() => submit()}>Зарегистрироваться</Button>
            </div>
        </div>
    )
};
