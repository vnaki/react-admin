import React from "react";
import "./style.css";
import {Link} from "react-router-dom";

export default class Header extends React.Component
{
    render ()
    {
        return  <div className="header">
            <span className="header-item" onClick={this.left}>
                <i className="fal fa-indent"/>
            </span>

            <Link to="/" replace={true} className="header-item">
                <i className="fal fa-home"/>
            </Link>

            <span className="header-item" title="刷新页面">
                <i className="fal fa-redo"/>
            </span>
        </div>
    }

    left = () =>
    {
        console.log(this.refs.leftPanel)
    };
}