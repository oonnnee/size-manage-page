import React from 'react';

import PageTitle from 'page/part/page-title.jsx';

import AppUtil from 'util/app-util.jsx';
import MySwitch from 'page/setting/my-switch.jsx';

import RangeService from 'service/range-service.jsx';

const appUtil = new AppUtil();
const rangeService = new RangeService();

class SettingRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            able: [],
            unable: []
        };
    }

    componentDidMount() {
        this.loadAble();
        this.loadUnable();

    }

    componentDidUpdate(){

    }

    loadAble() {
        rangeService.able(this.props.size).then(data => {
            this.setState({
                able: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    loadUnable() {
        rangeService.unable(this.props.size).then(data => {
            this.setState({
                unable: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    onChange(e){
        const target = e.target;

        const name = target.getAttribute('name');
        const index = target.parentElement.parentElement.parentElement.getAttribute('index');
        const judge = target.parentElement.parentElement.parentElement.getAttribute('able');

        if (!appUtil.isInputValid(target.value)){
            appUtil.inputNotValidHint();
            return;
        }

        if (judge == "true") {
            let able = this.state.able;
            able[index][name] = target.value;
            this.setState({
                able: able
            });
        }else {
            let unable = this.state.unable;
            unable[index][name] = target.value;
            this.setState({
                unable: unable
            });
        }
    }

    onSwitchChange(event, state){
        const target = event.target;
        const judge = target.parentElement.parentElement.parentElement.parentElement.getAttribute('able');
        const index = target.parentElement.parentElement.parentElement.parentElement.getAttribute('index');

        if (judge == "true") {
            let able = this.state.able;
            if (state == true) {
                able[index].judge = true;
            } else {
                able[index].judge= false;
            }
            this.setState({
                able: able
            });
        }else {
            let unable = this.state.unable;
            if (state == true) {
                unable[index].judge = true;
            } else {
                unable[index].judge = false;
            }
            this.setState({
                unable: unable
            });
        }
    }

    onSave(){
        if (confirm('确认保存 '+this.props.size+'码的范围值 设置吗？')){
            let pass = true;
            this.state.able.forEach((ele, index) => {
                if (ele.down=='' || ele.up==''){
                    appUtil.errorTip('输入值不能为空');
                    pass = false;
                    return;
                }
            });

            if (!pass) return;

            const index = appUtil.loading();

            rangeService.save(JSON.stringify(this.state.able)).then(() => {
                rangeService.save(JSON.stringify(this.state.unable)).then(() => {
                    layer.close(index);
                    appUtil.successTip('保存成功')
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                });
            }, errMsg => {
                appUtil.errorTip(errMsg);
            });
        }
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.size}</div>
                    <div className="panel-body">
                        <div>
                            {this.state.able.map((range, index) => {
                                return (
                                    <div className="row" index={index} able="true">
                                        <div className="col-md-3 ">
                                            <MySwitch state={range.judge} onSwitchChange={(event, state) => {this.onSwitchChange(event, state)}}/>
                                        </div>
                                        <div className="col-md-9">
                                            <label htmlFor="exampleInputEmail1">{range.name}</label>
                                            <div className="input-group">
                                                <input type="number" className="form-control" name="down" step="0.1"
                                                       placeholder="lower" value={range.down} onChange={(e) => this.onChange(e)}/>
                                                <div className="input-group-addon">-</div>
                                                <input type="number" className="form-control" name="up"
                                                       placeholder="upper" value={range.up} onChange={(e) => this.onChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {this.state.unable.map((range, index) => {
                                return (
                                    <div className="row" index={index} able="false">
                                        <div className="col-md-3 ">
                                            <MySwitch state={range.judge} onSwitchChange={(event, state) => {this.onSwitchChange(event, state)}}/>
                                        </div>
                                        <div className="col-md-9">
                                            <label htmlFor="exampleInputEmail1">{range.name}</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="down"
                                                       placeholder="lower" value={range.down} onChange={(e) => this.onChange(e)}/>
                                                <div className="input-group-addon">-</div>
                                                <input type="text" className="form-control" name="up"
                                                       placeholder="upper" value={range.up} onChange={(e) => this.onChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <button type="submit" className="btn btn-default pull-right" onClick={() => {this.onSave()}}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SettingRange;