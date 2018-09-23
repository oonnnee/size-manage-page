
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class SizeService {

    // 用户登录
    page(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'page'){
            url = '/customer-info/page';
        }else if(param.type === 'search'){
            url = '/customer-info/pageByNameLike';
            if (typeof param.name !== 'undefined'){
                data.name = param.name;
            }
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }
}


export default SizeService;