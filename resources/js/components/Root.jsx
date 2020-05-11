import * as React from 'react';
import {Navigationlayout} from "./layouts/navigationLayout/navigationLayout";
import {Content} from "./layouts/Content";
import './RootStyles.scss'
import {Redirect} from "react-router-dom";

function Root() {


    return (
        <div >
                    <div className={'root_wrapper'}>
                        <Navigationlayout/>
                        <Content/>
                        <Redirect to={'/page/chats'} />
                    </div>
        </div>
    );
}

export default Root;


