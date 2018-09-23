
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class UserService {

    // 用户登录
    login(loginInfo){
        return appUtil.request({
            type: 'post',
            url: '/user/login',
            data: loginInfo
        });
    }

    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // 判断用户名为空
        if(typeof username !== 'string' || username.length ===0){
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        // 判断密码为空
        if(typeof password !== 'string' || password.length ===0){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }

    checkPwd(pwd, reRwd){
        if (pwd.trim() === ''){
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        if (pwd !== reRwd){
            return {
                status: false,
                msg: '两次密码输入不一致'
            }
        }
        return {
            status: true
        }
    }

    updatePwd(param){
        return appUtil.request({
            type    : 'post',
            url     : '/user/updatePwd',
            data    : param
        });
    }

    // 退出登录
    logout(){
        return appUtil.request({
            type    : 'post',
            url     : '/user/logout'
        });
    }
}


export default UserService;