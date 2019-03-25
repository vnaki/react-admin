import React from "react";
import Horizontal from "../../../../core/base/horizontal";
import IndexConfig from "./__";
import {SubData} from "../__";
import Tabs from "../../../../core/tabs";
import Area from "../../../../core/base/area";
import Sub from "../../../../core/nav/sub";
import Crumbs from "../../../../core/crumbs";
import Radio from "../../../../core/base/radio";
import File from "../../../../core/base/file";
import Base from "../../base";

//配置信息组件
export default class Info extends Base
{
    render ()
    {
        return <Horizontal className="full-height">

            {/*子导航*/}
            <Sub data={SubData}/>

            <div className="flex-grow" style={{width:"0px", overflow:"auto"}}>
                {/*面包屑*/}
                <Crumbs data={IndexConfig.crumbs}/>

                <Area style={{marginTop:0}}>

                    <Tabs data={IndexConfig.tabs} context={this}/>
                    <br/>
                    <Tabs data={IndexConfig.tabs} context={this} mode="mini"/>

                    <div className="form-inputs">
                        <div className="input-title">
                            网站地址
                        </div>
                        <input type="text" name="" className="input"/>

                        <div className="input-title">
                            网站地址
                        </div>
                        <input type="text" name="" className="input"/>

                        <div className="input-title">
                            网站地址
                        </div>
                        <input type="text" name="" className="input"/>

                        <div className="input-title">
                            网站地址
                        </div>
                        <input type="text" name="" className="input"/>

                        <div className="input-title">
                            网站地址
                        </div>
                        <input type="text" name="" className="input"/>

                        <div className="input-title">
                            网站LOGO
                        </div>
                        <input type="text" name="" className="input" style={{width:"200px"}}/>

                        <div className="input-title">
                            是否关闭网站
                        </div>

                        <Radio data={[{title:"是", value:1}, {title:"否", value:"0"}]} value={"1"} name="close"/>

                        <div className="input-title">
                            上传图片
                        </div>

                        <File name="file" defaultValue="" title="选择LOGO" mime={["image/png"]} ext={["png"]}/>

                        <br/>
                        <br/>

                        <button type="button" className="btn btn-middle btn-normal">
                            保存数据 <i className="fab fa-telegram-plane"/>
                        </button>
                    </div>
                </Area>
            </div>
        </Horizontal>
    }
}