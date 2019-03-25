import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

/*面包屑*/
export default class Crumbs extends React.Component
{
    static defaultProps =
    {
        data : []
    };

    items ()
    {
        let items = [<Link to="/" key="key-index" className="crumbs-item"><i className="fal fa-home"/> 首页</Link>];

        this.props.data.forEach((v, k) =>
        {
            items.push(<span className="crumbs-sep" key={"sep-"+k}> <i className="fal fa-angle-right"/> </span>);
            items.push(typeof (v.url) === "string" && v.url !== "" ? <Link to={v.url} key={k} className="crumbs-item" replace={true}>{v.title}</Link> : <span key={k} className="crumbs-item">{v.title}</span>)
        });

        return items;
    }

    render()
    {
        return <div className="crumbs"> {this.items()} </div>
    }
}