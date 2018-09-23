import React from 'react'
import {Link, NavLink} from 'react-router-dom'

class NavSide extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }


    render(){
        return (
            <nav className="navbar-default navbar-side" role="navigation">
                <div id="sideNav" to=""><i className="fa fa-caret-right"></i></div>
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        {/*<li>*/}
                            {/*<NavLink exact activeClassName="active-menu" to="/"><i className="fa fa-home"></i>主页</NavLink>*/}
                        {/*</li>*/}
                        <li>
                            <NavLink activeClassName="active-menu" to="/size"><i className="fa fa-bars"></i>尺码</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/setting"><i className="fa fa-cog"></i>设置</NavLink>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }

}

export default NavSide;