import React from "react";
import {CrumbsData, SearchData, HeaderData, ListActionItems} from "./__";
import {SubData} from "../__";
import Horizontal from "../../../../core/base/horizontal";
import Area from "../../../../core/base/area";
import Sub from "../../../../core/nav/sub";
import Crumbs from "../../../../core/crumbs";
import {Link} from "react-router-dom";

import DataList from "../../../../core/list/list";

import Search from "../../../../core/search";
import ConfigModel from "../../../models/Config";
import Base from "../../base";

//配置列表组件
export default class Index extends Base
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            data : [],
        };
    }

    render ()
    {
        return <Horizontal className="full-height">

            {/*子导航*/}
            <Sub data={SubData}/>

            <div className="flex-grow" style={{width:"0px", overflow:"auto"}}>
                {/*面包屑*/}
                <Crumbs data={CrumbsData}/>

                <Area style={{marginTop:0}}>

                    <div className="btn-group">
                        <Search inputs={SearchData} handler={this.fetch} filterEmpty={true}/>

                        <Link className="btn btn-middle btn-normal" to="/config-add">
                            <i className="fal fa-plus"/> 添加配置
                        </Link>
                    </div>

                    <DataList cells={HeaderData}
                          data={this.state.data}
                          action={{items:ListActionItems, enabled:true, style:{width:"100px"}} }
                          checkbox={{enabled:true, handler:this.checkbox}}
                          refresh={ () => {} }
                    />
                </Area>
            </div>
        </Horizontal>
    }

    /**
     * 组件已加载
     */
    componentDidMount()
    {
        this.fetch();
    }

    /**
     * 请求网络
     */
    fetch = (query) =>
    {
        ConfigModel.rows(query, (response) =>
        {
            this.setState({data:response.data});
        });
    };

    /**
     * 分页加载数据
     */
    update = () =>
    {

    };

    /**
     * 多选
     */
    checkbox = (checked) =>
    {
        console.log(checked);
    };
}