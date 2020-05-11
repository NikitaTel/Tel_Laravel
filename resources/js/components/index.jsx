
import {createEpicMiddleware} from "redux-observable";
import {applyMiddleware, createStore} from "redux";
import * as React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Root from "./Root";
import {RootEpic, RootState} from "../redux/root/root";
import {createBrowserHistory} from "history";
import { routerMiddleware } from 'connected-react-router'
import { ConnectedRouter } from 'connected-react-router'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Registration} from "./auth/registration/registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from "./auth/login/login";

import {Header} from "./layouts/headerLayout/header";

import {userActions} from "../redux/user/userActions";

import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';


export default function configureStore() {
    const store = createStore(
        RootState(history),
        applyMiddleware(epicMiddleware,routerMiddleware(history))
    );

    epicMiddleware.run(RootEpic);
    return store;
}

export const userData=sessionStorage.getItem('userData');
console.log(JSON.parse(userData),'user data')
if(userData){
    try{
        configureStore().dispatch(userActions.loginUser.request(JSON.parse(userData)))
}
    catch (e) {
        alert(e,'error')
    }
}


export const epicMiddleware=createEpicMiddleware();
export  const history = createBrowserHistory();



if (document.getElementById('root')) {
    ReactDOM.render(<React.StrictMode>
        <AppProvider i18n={enTranslations}>
        <Provider store={configureStore()}>
            <ConnectedRouter history={history}>
                <Header/>
                <Switch>
                    <Route  exact path={'/'} render={()=>  <Redirect to={'/page'}/>}/>
                    <Route path={'/registration'} component={Registration}/>
                    <Route  path={'/login'} component={Login}/>
                    <Route path={'/page'} component={Root} />

                </Switch>
            </ConnectedRouter>
        </Provider>
        </AppProvider>
    </React.StrictMode>, document.getElementById('root'));
}
