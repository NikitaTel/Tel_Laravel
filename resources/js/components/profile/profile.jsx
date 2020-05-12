import * as React from 'react'
import Toast from "react-bootstrap/Toast";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../../redux/profile/posts/postActions";
import {useCallback} from "react";
import {useEffect} from "react";
import {userActions} from "../../redux/user/userActions";
import {userData} from "../index";
import {useParams} from "react-router";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import './profileStyles.scss'
import Overlay from "react-bootstrap/Overlay";
import axios from 'axios'
import {mergeObject} from "../../utilsF";
import {useRef} from "react";
import Popover from "react-bootstrap/Popover";
import Card from "react-bootstrap/Card";
import {api_v1} from "../../routes";
import { Button, DropZone, ResourceList, TextStyle} from "@shopify/polaris";
import {chatActions} from "../../redux/chat/chatActions";
import {Link} from "react-router-dom";


export const post = {
    thread: '',
    content: '',
    user_id: ''
};

export const Profile = () => {


    const slugId = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(userActions.fetchUser.request(slugId))
    }, [dispatch]);


    const [sentPost, setSentPost] = useState(post);
    const mergePost = (changes) => setSentPost(mergeObject(changes));


    const createPost = useCallback(() => {
        dispatch(postActions.createPost.request({...sentPost, ...{user_id: slugId.id}}))
    }, [dispatch, sentPost]);

    const user = useSelector(state => state.users.fetchUser);

    const [statusPopover, setStatusPopover] = useState(false);
    const [target, setTarget] = useState(null);
    const targetRef = useRef(null);

    const userId=JSON.parse(sessionStorage.getItem('userData'));


    useEffect(()=>{
       dispatch(chatActions.chatsByUser_Id.request(slugId.id))
    },[slugId]);
    const handleOpenPopover = (event) => {
        setStatusPopover(true);
        setTarget(event.target)
    };

    const [redactMode, setRedactMode] = useState(false);

    const [userData, setUserData] = useState({});
    const mergeUserData = (changes) => setUserData(mergeObject(changes));

    const sendProfileChanges = useCallback(() => {
        dispatch(userActions.updateUserProfile.request(userData));
        setStatusPopover(false)
    }, [dispatch, userData]);


    const [fullDescription, setFullDescription] = useState(false);

    const formData=new FormData();

    const chatList=useSelector(state=>state.chats.fetchChatsByUser_id);


    const changeAvatar=useCallback(()=>{
        axios.post(`${api_v1.changeAvatar}/${slugId.id}`,formData,{headers:{
        "Content-Type":"multipart/form-data"
            }}).then(res=>mergeUserData({avatar:res.data})

        )
    },[formData]);

    useEffect(() => {
        setUserData(user)
    }, [user]);


    return (
        <div className={'user_container'}>

            <div className={'user_profile_info'}>
                <div className={'user_profile_info_left'}>
                    <Col xs={6} md={4}>

                        <Image src={`http://127.0.0.1:8000/storage/${userData.avatar}`} rounded width={'300px'} height={'300px'}/>
                    </Col>
                    {
                        user.id===userId.user.id&&   <div className={'updateAvatar'}>
                            <div style={{width: 50, height: 50}}>
                                <DropZone onDrop={files =>formData.append('avatar',files[0])}  >
                                    <DropZone.FileUpload  />
                                </DropZone>
                            </div>
                            <Button onClick={()=>changeAvatar()}>Обновить аватар</Button>
                        </div>
                    }
                    <div className={'chat_list'}>

                        <Card>
                            <ResourceList
                                items={chatList}
                                renderItem={(item) => {
                                    const {id, name,  users} = item;


                                    return (
                                        <ResourceList.Item id={id} >
                                           <div style={{display:'flex',justifyContent:'space-between'}}>
                                               <div>
                                                   <h3 style={{fontSize:'1.1rem'}}>
                                                       <TextStyle variation="strong">{name}</TextStyle>
                                                   </h3>
                                                   {users.map(user=>

                                                       <img src={`http://127.0.0.1:8000/storage/${user.avatar}`} style={{width:'25px',height:'25px',borderRadius:'50%'}}/>
                                                   )}
                                               </div>
                                               <Link to={`/page/chat/${id}`}>
                                                   <Button primary>Перейти</Button>
                                               </Link>
                                           </div>
                                        </ResourceList.Item>
                                    );
                                }}
                            />
                        </Card>
                    </div>
                </div>
                <div className={'user_profile_info_right'}>
                    <div className={'user_description'}>
                        <div className={'user_description_header'}>
                            <div style={{fontSize: '16px', fontWeight: 'bolder'}}>
                       <span>
                           {user.firstName}
                       </span>
                                {user.secondName!=="null"&&
                                <span>
                           {user?.secondName}
                       </span>
                                }
                            </div>
                            <div className={'status'}>
                                {user.status === "null" ?
                                    <div ref={targetRef}>
                                        <span onClick={handleOpenPopover}>Добавить статус</span>
                                        <Overlay
                                            show={statusPopover}
                                            placement="bottom"
                                            containerPadding={20}
                                            target={target}
                                            container={targetRef.current}
                                        >
                                            <Popover id="popover-contained">
                                                <InputGroup>
                                                    <FormControl
                                                        onChange={event => mergeUserData({status: event.target.value})}
                                                        placeholder="Добавьте статус"
                                                    />
                                                </InputGroup>
                                                <Button primary onClick={() => sendProfileChanges()}>Добавить
                                                    статус</Button>
                                            </Popover>
                                        </Overlay>
                                    </div>
                                    :
                                    <span>{user.status}</span>
                                }
                            </div>
                            {user.birthday !== "null" &&
                            <div>
                       <span className={'user_description_key'}>
                        Дата рождения
                       </span>
                                <span className={'user_description_value'}>
                            {user.birthday}
                       </span>
                            </div>
                            }
                            {user.favourite_animals !== "null" &&
                            <div>
                       <span className={'user_description_key'}>
                            Любимые животные
                       </span>
                                <span className={'user_description_value'}>
                            {user.favourite_animals}
                       </span>
                            </div>
                            }
                            {user.user_description !== "null" &&
                            <React.Fragment>
                                <div>
                       <span className={'user_description_key'}>
                           Пару слов о себе
                       </span>
                                    <span className={'user_description_value'}>
                            {user?.user_description?.length > 80 ?
                                <a className={'show_full_description'}
                                   onClick={() => setFullDescription(!fullDescription)}>
                                    {fullDescription ?
                                        'Скрыть полное описание' :
                                        'Показать полное описание'
                                    }
                                </a> :
                                user.user_description}
                       </span>

                                </div>
                                {fullDescription &&
                                <div>
                                        <span className={'user_description_value'}>
                                            {user.user_description}
                                        </span>
                                </div>
                                }
                            </React.Fragment>
                            }
                        </div>
                        {user.id===userId.user.id&&   <Button primary onClick={() => setRedactMode(true)}>Редактировать
                            профиль</Button>
                        }

                    </div>


                    <Modal show={redactMode} onHide={() => setRedactMode(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактирование профиля</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card>
                                <Card.Body>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">День рождения</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={userData.birthday !== "null" ? userData.birthday : '...'}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            onChange={event => mergeUserData({birthday:event.target.value})}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">Имя</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={userData.firstName !== "null" ? userData.firstName : '...'}
                                            aria-label="Username"
                                            onChange={event =>mergeUserData({firstName:event.target.value})}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">Фамилия</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={userData.secondName !== "null" ? userData.secondName : '...'}
                                            aria-label="Username"
                                            onChange={event => mergeUserData({secondName:event.target.value})}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <label htmlFor="basic-url">Любимые животные</label>
                                    <InputGroup className="mb-3">
                                        <Form.Control as="textarea"
                                                      rows="3"
                                                      value={userData.favourite_animals !== "null" ? userData.favourite_animals : "..."}
                                                      onChange={event =>mergeUserData({favourite_animals:event.target.value})}/>
                                    </InputGroup>
                                    <label htmlFor="basic-url">Основная информация о вас</label>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            value={userData.user_description !== "null" ? userData.user_description : '...'}
                                            onChange={event => mergeUserData({user_description:event.target.value})}
                                            as="textarea" rows="3"
                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Card>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setRedactMode(false)}>
                                Закрыть
                            </Button>
                            <Button primary onClick={() => {
                                dispatch(userActions.updateUserProfile.request(userData));
                              setRedactMode(false);
                            }}>
                                Сохранить изменения
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <div className={'posts'}>
                        {user.id===userId.user.id&&
                        <div className={'creator_post'}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Категория</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={event => mergePost({thread: event.target.value})}
                                             aria-label="Default"
                                             aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Содержимое поста</Form.Label>
                                    <Form.Control as="textarea" rows="3"
                                                  onChange={event => mergePost({content: event.target.value})}/>
                                </Form.Group>
                            </Form>
                            <Button primary onClick={() => createPost()}>Создать пост</Button>
                        </div>
                        }
                        <div className={'post_list'}>
                            {user.id!==userId.user.id&&!user.posts?.length?
                                <div className={'no_posts'}>У этого пользователя всё еще нет постов</div>:
                                <div>
                                    {user.posts?.map(post =>
                                        <Toast key={post.id} onClose={()=>user.id===userId.user.id&&dispatch(postActions.deletePost.request(post.id))}>
                                            <Toast.Header>
                                                <img src={`http://127.0.0.1:8000/storage/${userData.avatar}`}
                                                     style={{width:'20px',height:'20px',borderRadius:'50%'}} />
                                                <strong className="mr-auto strong_padding_left" >#{post.thread}</strong>
                                                <small>{post.created_at}</small>
                                            </Toast.Header>
                                            <Toast.Body>{post.content}</Toast.Body>
                                        </Toast>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
