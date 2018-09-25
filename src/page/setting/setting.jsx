import React from 'react';

import PageTitle from 'page/part/page-title.jsx';
import SettingRange from 'page/setting/setting-range.jsx';
import MySwitch from 'page/setting/my-switch.jsx';

import AppUtil from 'util/app-util.jsx';
import TrialService from 'service/trial-service.jsx';
import SettingService from 'service/setting-service.jsx';

const appUtil = new AppUtil();
const trialService = new TrialService();
const settingService = new SettingService();

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trialList: [],
            ableTrialList: [],

            setting:[],
        };
    }

    componentDidMount() {
        this.loadTrialList();
        this.loadAbleTrialList();
        this.loadAvg();
    }

    loadTrialList() {
        trialService.list().then(data => {
            this.setState({
                trialList: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    loadAbleTrialList() {
        trialService.able().then(data => {
            this.setState({
                ableTrialList: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    loadAvg(){
        settingService.isAvgOpen().then(data => {
            let setting = [];
            setting.push(data);
            this.setState({
                setting: setting
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    onRangeChange(e){
        const target = e.target;

        const name = target.getAttribute('name');
        const firIndex = target.parentElement.parentElement.parentElement.parentElement.getAttribute('index');
        const secIndex = target.parentElement.parentElement.getAttribute('index');

        if (!appUtil.isInputValid(target.value)){
            appUtil.inputNotValidHint();
            return;
        }

        let ableTrialList = this.state.ableTrialList;
        ableTrialList[firIndex].trialAccesses[secIndex][name] = target.value;
        this.setState({
            ableTrialList: ableTrialList
        });
    }

    onOptionChange(e){
        const target = e.target;

        const index = target.parentElement.parentElement.parentElement.getAttribute('index');

        let ableTrialList = this.state.ableTrialList;

        ableTrialList[index] = this.state.trialList[e.target.value-1];

        ableTrialList[index].orders = Number.parseInt(index)+2;
        ableTrialList[index].judge = true;

        this.setState({
            ableTrialList: ableTrialList
        });
    }

    onRemoveOrAdd(e, opera){
        const target = e.target;

        const index = target.parentElement.parentElement.parentElement.parentElement.getAttribute('index');

        let ableTrialList = this.state.ableTrialList;
        if (opera == 1){
            // 删除前端
            ableTrialList[index].trialAccesses.shift();
            ableTrialList[index].trialAccesses.forEach((ele, index) => {
                ele.orders--;
            })
        } else if (opera == 2){
            // 增加
            let trialAccess = {
                "id": null,
                "down": 0,
                "up": 0,
                "orders": ableTrialList[index].trialAccesses.length+1
            }
            ableTrialList[index].trialAccesses.push(trialAccess);
        } else if (opera == 3){
            // 删除后端
            ableTrialList[index].trialAccesses.pop();
        }

        this.setState({
            ableTrialList: ableTrialList
        });
    }

    onSave(){
        if (confirm('确认保存 排列组合值 设置吗？')){
            let pass = true;
            this.state.ableTrialList.forEach((ele, index) => {
                ele.trialAccesses.forEach((ele, index) => {
                    if (ele.down=='' || ele.up==''){
                        appUtil.errorTip('输入值不能为空');
                        pass = false;
                        return;
                    }
                })
                if (!pass) return;
            });

            if (!pass) return;

            trialService.save(JSON.stringify(this.state.ableTrialList)).then(() => {
                appUtil.successTip('保存成功')
            }, errMsg => {
                appUtil.errorTip(errMsg);
            });
        }
    }

    onSwitchChange(event, state){
        settingService.updateAvg(state).then(() => {

        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="设置"/>

                    <div className="panel panel-default">
                        <div className="panel-heading">范围值设置</div>
                        <div className="panel-body">
                            <SettingRange size="S"/>
                            <SettingRange size="M"/>
                            <SettingRange size="L"/>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">排列组合值设置</div>
                        <div className="panel-body">
                            {
                                this.state.ableTrialList.map((trial, index) => {
                                    return (
                                        <div className="container" index={index}>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <select className="form-control" value={trial.id}
                                                            onChange={(e) => {this.onOptionChange(e)} }>
                                                        {
                                                            this.state.trialList.map((trial, index) => {
                                                                return (
                                                                    <option key={index} value={trial.id}>{trial.name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {
                                                    trial.trialAccesses.map((trialAccess, index) => {
                                                        return (
                                                            <div className="col-md-2 blank" index={index}>
                                                                <div className="input-group">
                                                                    <input type="text" className="form-control" name="down"
                                                                           placeholder="lower" value={trialAccess.down}
                                                                            onChange={(e) => {this.onRangeChange(e)}} />
                                                                    <div className="input-group-addon">-</div>
                                                                    <input type="text" className="form-control" name="up"
                                                                           placeholder="upper" value={trialAccess.up}
                                                                           onChange={(e) => {this.onRangeChange(e)}} />
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                <div className="col-md-3 blank">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-primary " onClick={(e) => {this.onRemoveOrAdd(e, 1)}}>删除前端</button>
                                                        <button type="button" className="btn btn-primary " onClick={(e) => {this.onRemoveOrAdd(e, 2)}}>增加</button>
                                                        <button type="button" className="btn btn-primary " onClick={(e) => {this.onRemoveOrAdd(e, 3)}}>删除后端</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-default btn-lg btn-block" onClick={() => {this.onSave()}}>保存</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">其它设置</div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-1">均码</div>
                                <div className="col-md-1">
                                    {
                                        this.state.setting.map((s, index) => {
                                            return (<MySwitch state={s} onSwitchChange={(event, state) => {this.onSwitchChange(event, state)}}/>);
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Setting;