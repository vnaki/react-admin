import React from "react";
import "./style.css"
import Env from "./__";
import Horizontal from "../../../core/base/horizontal";
import Base from "../base";

/**
 * 首页
 */
export default class Index extends Base
{
    loop = (name) =>
    {
        let data = [];

        for (let i in Env[name])
        {
            data.push(<div className="info-row" key={i}>
                <div className="info-item">{Env[name][i]["title"]}</div>
                <div className="info-item">{Env[name][i]["value"]}</div>
            </div>);
        }

        return data;
    };

    render ()
    {
        return <div>
            <Horizontal>
                <div className="panel">
                    <div className="padding">
                        <div className="info-title">环境信息</div>
                        <div className="info-area">
                            {this.loop("info")}
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <div className="padding">
                        <div className="info-title">开发团队</div>
                        <div className="info-area">
                            {this.loop("info")}
                        </div>
                    </div>
                </div>
            </Horizontal>
        </div>;
    }
}