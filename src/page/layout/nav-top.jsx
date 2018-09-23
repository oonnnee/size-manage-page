import React from 'react';
import {Link} from 'react-router-dom';

import UserService from 'service/user-service.jsx';
import AppUtil from 'util/app-util.jsx';

const userService = new UserService();
const appUtil = new AppUtil();

class NavTop extends React.Component{

    render(){
        return (
            <nav className="navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/"> <strong>尺码生成系统</strong></a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i>欢迎, admin <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><Link to="/user/updatePwd"><i className="fa fa-user fa-fw"></i> 更改密码</Link>
                            </li>
                            <li className="divider"></li>
                            <li><a href="javascript:;" onClick={() => this.handleLogout()}><i className="fa fa-sign-out fa-fw"></i> 退出登录</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }

    handleLogout(){
        userService.logout().then(() => {
            appUtil.doLogin();
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }
}


export default NavTop;