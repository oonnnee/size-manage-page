
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class SizeService {

    // 用户登录
    page(param){
        return appUtil.request({
            type    : 'get',
            url     : '/customer-info/page',
            data    : param
        });
    }
}


export default SizeService;