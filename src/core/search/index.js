import React from "react";
import "./style.css";
import Select from "../base/select/index";

/**
 * 条件搜索
 */
export default class Search extends React.Component
{
    static defaultProps =
    {
        /**
         * 条件表单
         * [{title:"", name:"", type:"", width:0, options:[], extra:{}}, ...]
         */
        inputs : [],

        /**
         * 过滤空查询
         */
        filterEmpty : true,

        /**
         * 搜索处理器
         */
        handler : null,

        /**
         * 按钮名称
         */
        btn : "搜索",

        /**
         * 样式
         */
        style : {},
    };

    constructor (props)
    {
        super (props);

        if (!(props.inputs instanceof Array) || props.inputs.length < 1)
        {
            throw new Error ("inputs参数错误");
        }
    }

    items = (inputs) =>
    {
        let items = [];

        inputs.forEach((v, k) =>
        {
            let style = {};

            if (v.width !== undefined)
            {
                style["width"] = v.width;
            }

            switch (v.type)
            {
                case "text" :
                    items.push(<label key={k}> {v.title} <input type={v.type} name={v.name} className="input" style={style} defaultValue={v.defaultValue || ""} {...v.extra} autoComplete="off" {...v.extra}/></label>);
                    break;
                case "select" :
                    items.push(<label key={k}> {v.title} <Select name={v.name} options={v.options || []} style={style} defaultValue={v.defaultValue || ""} {...v.extra}/> </label>);
                    break;
                default: break;
            }
        });

        return items;
    };

    render ()
    {
        return <div className="input-search" style={this.props.style}><form onSubmit={this.submit}>
            {this.items(this.props.inputs)}
            <label><button type="submit" className="btn btn-middle btn-normal"> <i className="fal fa-search"/> {this.props.btn} </button></label>
        </form></div>
    }

    /**
     * 提交查询
     */
    submit = (e) =>
    {
        e.preventDefault();

        if (e.type === undefined || e.type !== "submit")
        {
            return;
        }

        let query = {};

        if (typeof this.props.handler === "function")
        {
            for (let element of e.currentTarget.elements)
            {
                let name = element.name, type = element.type;

                if (("" === name || null === name) ||
                    -1 === ["text", "hidden", "password", "textarea", "radio"].indexOf(type) ||
                    ("radio" === type && !element.checked)
                )
                {
                    continue;
                }

                if (this.props.filterEmpty === true && element.value === "")
                {
                    continue;
                }

                query[name] = element.value;
            }

            this.props.handler(query);
        }
    };
}