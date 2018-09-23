
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class TrialService {

    list(){
        return appUtil.request({
            type    : 'get',
            url     : '/trial/list',
        });
    }

    able(){
        return appUtil.request({
            type    : 'get',
            url     : '/trial/ableByAsc',
        });
    }

    save(ableTrialStr){
        return appUtil.request({
            type    : 'post',
            url     : '/trial/updateAbleTrial',
            data    : {ableTrialStr: ableTrialStr}
        });
    }
}


export default TrialService;