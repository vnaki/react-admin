import React from "react";
import {Link} from "react-router-dom";
import ScrollBar from "../base/scrollbar";
import "./style.css";

/*导航菜单*/
export default class Index extends React.Component
{
    static defaultProps =
    {
        data : []
    };

    /*生成菜单*/
    nav = (data) =>
    {
        let div = [];

        for (let i in data)
        {
            div.push(<div className="nav-title" key={"nt "+i} onClick={this.click} open={true === data[i].open}>
                <i className={data[i].icon + " icon-before"}/> {data[i].title} <span className="nav-dot"/>
            </div>);

            let items = [];

            for (let ii in data[i].items)
            {
                items.push(<Link className="nav-item" replace={true} to={data[i].items[ii].link} key={"nts "+ii}>{data[i].items[ii].title}</Link>);
            }

            div.push(<div className="nav-items" key={"nav "+i}> {items} </div>);
        }

        return div;
    };

    render ()
    {
        return <div className="nav">
            <ScrollBar showTrack={false}>
                {this.nav(this.props.data)}
            </ScrollBar>
        </div>
    }

    /*点击菜单*/
    click = (e) =>
    {
        false === e.currentTarget.hasAttribute("open") ? e.currentTarget.setAttribute("open", "") : e.currentTarget.removeAttribute("open");
    };
}