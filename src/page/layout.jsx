import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import NavTop from 'layout/nav-top.jsx';
import NavSide from 'layout/nav-side.jsx';
import Home from 'page/home.jsx';

import SizePage from 'page/size/size-page.jsx';

import Setting from 'page/setting/setting.jsx';

import UserPwdUpdate from 'page/user/user-pwd-update.jsx';

class Layout extends React.Component{

    componentDidMount(){
        document.body.style.background = '#f3f3f3';
    }

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Switch>
                        <Route exact path="/" component={SizePage}/>

                        <Route exact path="/size" component={SizePage}/>

                        <Route exact path="/setting" component={Setting}/>
                        <Route exact path="/user/updatePwd" component={UserPwdUpdate}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Layout;