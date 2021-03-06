import React from 'react'

class PageTitle extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.title = this.props.title + ' - 尺码生成系统';
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">
                        {this.props.title}
                    </h2>
                    <div className="page-header-right">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}

export default PageTitle;