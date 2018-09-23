import React from 'react';

import AppUtil from 'util/app-util.jsx';

const appUtil = new AppUtil();

class MySwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        $(".checkbox").bootstrapSwitch({
            onText : "on",      // 设置ON文本  
            offText : "off",    // 设置OFF文本  
            onColor : "success",// 设置ON文本颜色     (info/success/warning/danger/primary)  
            offColor : "danger",  // 设置OFF文本颜色        (info/success/warning/danger/primary)  
            size : "small",    // 设置控件大小,从小到大  (mini/small/normal/large)  
            handleWidth:"50",//设置控件宽度
            state: this.props.state,
            // 当开关状态改变时触发  
            onSwitchChange : this.props.onSwitchChange
        });
    }

    render() {
        return (
            <input type="checkbox" checked className="checkbox" />
        );
    }

}

export default MySwitch;