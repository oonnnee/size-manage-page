import React from 'react';

import PageTitle from 'page/part/page-title.jsx';

import AppUtil from 'util/app-util.jsx';
import MySwitch from 'page/setting/my-switch.jsx';

import RangeService from 'service/range-service.jsx';

const appUtil = new AppUtil();
const rangeService = new RangeService();

class SettingDownUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="col-md-2 blank">
                <div className="input-group">
                    <input type="text" className="form-control" name="down"
                           placeholder="lower"/>
                    <div className="input-group-addon">-</div>
                    <input type="text" className="form-control" name="up"
                           placeholder="upper"/>
                </div>
            </div>
        );
    }

}

export default SettingDownUp;