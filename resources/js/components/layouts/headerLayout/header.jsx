import * as React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import {history} from "../../index";


export const Header=()=>{
    const user=JSON.parse(sessionStorage.getItem('userData'));

    return(
        <>

            <Navbar bg="dark" variant="dark" >
                {user!==null&&
                    <div>
                        {user.user.role===1?
                            <Navbar.Brand >Добро пожаловать, администратор {user.user.firstName}</Navbar.Brand>
                            :
                            <Navbar.Brand >Добро пожаловать</Navbar.Brand>
                        }
                    </div>
                }

                <Nav className="mr-auto">

                </Nav>
                <Form inline>
                    {user!==null&&
                    <Col xs={4} md={4}>
                        <Image src={`http://127.0.0.1:8000/storage/${user.user.avatar}`} roundedCircle width={28} height={28} onClick={()=>
                        {
                            sessionStorage.removeItem('userData');
                            history.push('/login')
                        }
                        }/>
                    </Col>
                    }
                </Form>
            </Navbar>

            </>
    )
};
