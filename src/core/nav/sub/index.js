import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

//子菜单
export default class Sub extends React.Component
{
    static defaultProps =
    {
        data : []
    };

    render ()
    {
        return <div className="sub">
            {this.props.data.map((v, k) => <Link to={v.url} className="sub-item" key={k} replace={true}>{v.title}</Link>)}
        </div>
    }
}