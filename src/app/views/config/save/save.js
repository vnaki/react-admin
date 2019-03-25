import React from "react";
import {InputsData} from "./__";
import {SubData} from "../__";
import Area from "../../../../core/base/area";
import Sub from "../../../../core/nav/sub";
import Crumbs from "../../../../core/crumbs";
import Radio from "../../../../core/base/radio";
import Horizontal from "../../../../core/base/horizontal";
import Select from "../../../../core/base/select";
import Base from "../../base";

//配置添加组件
export default class Save extends Base
{
    submitLock = false;

    render ()
    {
        return <Horizontal className="full-height">

            <Sub data={SubData}/>

            <div className="flex-grow" style={{width:"0px", overflow:"auto"}}>

                <Crumbs data={this.breadcrumb}/>

                <Area style={{marginTop:0}}>
                    <div className="form-inputs">
                        <form onSubmit={this.submit}>
                            {this.items()}

                            <br/>
                            <br/>
                            <br/>

                            <button type="submit" className="btn btn-middle btn-normal">
                                保存数据 <i className="fab fa-telegram-plane"/>
                            </button>
                        </form>
                    </div>
                </Area>
            </div>
        </Horizontal>
    }

    items ()
    {
        let items = [];

        InputsData.forEach((v, k) =>
        {
            items.push(<div className="input-title" key={"-"+k}>{v.title}</div>);

            switch (v.type)
            {
                case "text": items.push(<input type="text" className="input" name={v.name} defaultValue={v.value || ""} placeholder={v.placeholder} key={"text-"+k} autoComplete="off"/>); break;
                case "textarea": items.push(<textarea className="textarea" name={v.name} defaultValue={v.value || ""} placeholder={v.placeholder} key={"textarea-"+k} autoComplete="off"/>); break;
                case "radio" : items.push(<Radio data={v.data} name={v.name} value={v.value} key={"radio-"+k}/>); break;
                case "select" :items.push(<Select options={v.options} name={v.name} defaultValue={v.value} style={{width:"150px"}} key={"select-"+k}/>);break;
                default : break;
            }
        });

        return items;
    }
}