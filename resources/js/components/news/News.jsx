import * as React from 'react'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../../redux/profile/posts/postActions";
import Toast from "react-bootstrap/Toast";

export const News=()=>{
    const dispatch=useDispatch();
    const posts=useSelector(state=>state.posts.fetchAllPosts);
    useEffect(()=>{
        dispatch(postActions.fetchAllPosts.request())
    },[dispatch,location]);

    return(
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'30px'}} >

                {posts.length>0&&
                <div style={{width:'100%',background:'white',borderRadius:'6px',padding:'7px',border:' border:1px solid #d1d2d5;'}}>
                <div>
                        <span style={{fontWeight:'bolder'}}>
                            Всего тредов
                        </span>
                    <span style={{color:'gray',paddingLeft:'7px'}}>
                            {posts.length}
                        </span>
                </div>
                </div>
                }

          <div style={{marginTop:'20px',width:'40%'}}>
              {
                  posts.map(post=>
                      <Toast key={post.id}>
                          <Toast.Header>
                              <strong className="mr-auto strong_padding_left" >#{post.thread}</strong>
                              <small>{post.created_at}</small>
                          </Toast.Header>
                          <Toast.Body>{post.content}</Toast.Body>
                      </Toast>
                  )
              }
          </div>

        </div>
    )
}
