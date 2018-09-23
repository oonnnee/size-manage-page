
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class RangeService {

    able(size){
        return appUtil.request({
            type    : 'get',
            url     : '/ranges/able',
            data    : {size: size}
        });
    }

    unable(size){
        return appUtil.request({
            type    : 'get',
            url     : '/ranges/unable',
            data    : {size: size}
        });
    }

    save(ranges){
        return appUtil.request({
            type    : 'post',
            url     : '/ranges/update',
            data    : {rangeStr: ranges},
        });
    }
}


export default RangeService;