import React from 'react';

import PageTitle from 'page/part/page-title.jsx';
import DataGrid from 'page/part/data-grid.jsx';
import Pagination from 'page/part/pagination.jsx';
import Search from 'page/size/size-page-search.jsx';

import SizeService from 'service/size-service.jsx';
import AppUtil from 'util/app-util.jsx';


const sizeService = new SizeService();
const appUtil = new AppUtil();

class SizePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 20,
            searchType: 'all',
            searchKeyword: ''
        };
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        const tableHeads = [
            {name: '编号'},
            {name: '码数'},
            {name: '淘宝名'},
            {name: '手机号'},
            {name: '平时码数'},
            {name: '身高'},
            {name: '颈侧点-膝盖'},
            {name: '1/2肩宽+袖长'},
            {name: '胸围'},
            {name: '腰围'},
            {name: '臀围'},
            {name: '袖肥'},

            {name: '颈围'},
            {name: '肩宽'},
            {name: '胸距'},
            {name: '上胸围'},
            {name: '前胸宽'},
            {name: '后背宽'},
            {name: '背长'},
            {name: '臂长'},
            {name: '上臂长'},
            {name: '袖长'},
            {name: '臂围'},
            {name: '袖笼围'},
            {name: '肘围'},
            {name: '手腕围'},
            {name: '通档'},
            {name: '大腿根围'},
            {name: '膝围'},
            {name: '小腿围'},
            {name: '脚踝围'},
            {name: '胸高'},
            {name: '腰高'},
            {name: '后中长'},
            {name: '中腰-膝盖距离'},
            {name: '第七颈椎点-大腿跟围'},
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="尺码生成页">
                        <a href="http://measure.justalit.com:8080/manage/export/size" className="btn btn-primary" target="_blank">
                            <i className="fa fa-arrow-down"></i>
                            <span>导出尺码信息</span>
                        </a>
                    </PageTitle>
                    <Search onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.content.map((customer, index) => {
                                let bigSize = null;

                                if (Number.isInteger(Number(customer.bigSize))){
                                    bigSize = <td>{customer.bigSize}</td>;
                                } else {
                                    bigSize = <td className='text-danger'>{customer.bigSize}</td>
                                }
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        {bigSize}
                                        <td>{customer.tbName}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.smallSize}</td>
                                        <td>{customer.height}</td>
                                        <td>{customer.neckKnee}</td>
                                        <td>{customer.shoulderSleeve}</td>
                                        <td>{customer.chest}</td>
                                        <td>{customer.waist}</td>
                                        <td>{customer.ass}</td>
                                        <td>{customer.sleeveFat}</td>

                                        <td>{customer.neck}</td>
                                        <td>{customer.shoulder}</td>
                                        <td>{customer.chestDistance}</td>
                                        <td>{customer.chestUp}</td>
                                        <td>{customer.chestFront}</td>
                                        <td>{customer.backWidth}</td>
                                        <td>{customer.backLength}</td>
                                        <td>{customer.armLength}</td>
                                        <td>{customer.armUpLength}</td>
                                        <td>{customer.sleeveLength}</td>
                                        <td>{customer.armWidth}</td>
                                        <td>{customer.sleeveWidth}</td>
                                        <td>{customer.elbowWidth}</td>
                                        <td>{customer.wristWidth}</td>
                                        <td>{customer.pants}</td>
                                        <td>{customer.bigLagWidth}</td>
                                        <td>{customer.kneeWidth}</td>
                                        <td>{customer.smallLagWidth}</td>
                                        <td>{customer.ankleWidth}</td>
                                        <td>{customer.chestHeight}</td>
                                        <td>{customer.wristHeight}</td>
                                        <td>{customer.backMidLength}</td>
                                        <td>{customer.wristKnee}</td>
                                        <td>{customer.seventhLag}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <Pagination current={this.state.number + 1}
                                total={this.state.totalElements}
                                onChange={(current, pageSize) => this.onChange(current, pageSize)}
                                onShowSizeChange={(current, pageSize) => this.onChange(current, pageSize)}/>
                </div>
            </div>
        );
    }

    // 加载客户列表
    loadList() {
        let param = {};
        param.page = this.state.number;
        param.size = this.state.size;
        param.filter = this.state.searchType;
        param.value = this.state.searchKeyword;

        sizeService.pageProcess(param).then(data => {
            this.setState(data);
        }, errMsg => {
            this.setState({
                content: []
            });
            appUtil.errorTip(errMsg);
        });
    }

    // // 搜索
    onSearch(searchType, searchKeyword){
        this.setState({
            number: 0,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadList();
        });
    }

    // 页数或pageSize发生变化的时候
    onChange(current, pageSize) {
        this.setState({
            number: current - 1,
            size: pageSize
        }, () => {
            this.loadList();
        });
    }
}


export default SizePage;