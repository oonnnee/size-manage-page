
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class SizeService {

    page(param){
        return appUtil.request({
            type    : 'get',
            url     : '/customer-info/page',
            data    : param
        });
    }

    pageRaw(param){
        return appUtil.request({
            type    : 'get',
            url     : '/customer-info/page-raw',
            data    : param
        });
    }

    pageProcess(param){
        return appUtil.request({
            type    : 'get',
            url     : '/customer-info/page-process',
            data    : param
        });
    }
}


export default SizeService;