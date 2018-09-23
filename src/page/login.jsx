import React from 'react'

import UserService from 'service/user-service.jsx'
import AppUtil from 'util/app-util.jsx'


const userService = new UserService();
const appUtil = new AppUtil();

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        document.body.background = require('img/bg.png');
    }

    onLoginKeyUp(e){
        if (e.keyCode == 13){
            this.handleLogin();
        }
    }

    render(){
        return (
            <div className="col-md-offset-4 col-md-4 login-panel">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={require('img/brand.png')} className="img-responsive center-block" />
                            </div>
                            <div className="login-title text-center">
                                欢迎登录 - 尺码管理系统
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <input type="text" name="username" className="form-control" placeholder="请输入用户名"
                                   value={this.state.username}
                                   onChange={e => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" placeholder="请输入密码"
                                   value={this.state.password}
                                   onChange={e => this.handleInputChange(e)} onKeyUp={e => this.onLoginKeyUp(e)} />
                        </div>
                        <button className="btn btn-lg btn-primary btn-block"
                                onClick={() => this.handleLogin()}>登录</button>
                    </div>
                </div>
            </div>
            
        );
    }

    /*-------------------------------
            用户名及密码输入框内容改变
    -------------------------------*/
    handleInputChange(e){
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    /*-------------------------------
            登录
    -------------------------------*/
    handleLogin(){
        const loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        /*----- 1.校验 -----*/
        const checkResult = userService.checkLoginInfo(loginInfo);
        if (checkResult.status === false) {
            appUtil.errorTip(checkResult.msg);
            return;
        }
        /*----- 2.登录 -----*/
        userService.login(loginInfo).then((data) => {
            /*----- 成功 -----*/
            /*----- 1.添加用户信息到本地存储 -----*/
            appUtil.setStorage('user', data);
            /*----- 2.跳转到主页 -----*/
            appUtil.redirectToIndex();
        }, (msg) => {
            /*----- 失败 -----*/
            appUtil.errorTip(msg);
        })
    }
}

export default Login;