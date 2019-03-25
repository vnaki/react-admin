import React from "react";
import "./style.css";

export default class Tabs extends React.Component
{
    static defaultProps =
    {
        data:[], /*Tab数据, [{title:"", action:null}, ...]*/
        context:null, /*Tab上下文环境*/
        mode : "nav", /*nav or mini*/
    };

    render ()
    {
        return <div className="tabs" mode={this.props.mode}>
            {this.props.data.map((v,k) => <div className="tab" active={(v.name && 0 === k) ? "1" : "0"} key={k} tab={v.name}>{v.title}</div>)}
        </div>
    }
}