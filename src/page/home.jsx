import React from 'react';
import AppUtil from 'util/app-util.jsx';

const appUtil = new AppUtil();

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                </div>
            </div>
        );
    }

}


export default Home;