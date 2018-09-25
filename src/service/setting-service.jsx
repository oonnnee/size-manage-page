
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class SettingService {

    isAvgOpen(){
        return appUtil.request({
            type    : 'get',
            url     : '/setting/avg-size'
        });
    }

    updateAvg(param){
        return appUtil.request({
            type    : 'post',
            url     : '/setting/avg-size',
            data    : {open: param}
        });
    }
}


export default SettingService;