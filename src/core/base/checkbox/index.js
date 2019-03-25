import React from "react";
import "./style.css";
import PropTypes from "prop-types";

// 表单组件 - CheckBox
// 数据结构 : {name:"", title:"多选按钮",value:"", checked:false, change:function(){}, extra:{} }
export default class Checkbox extends React.Component
{
    /*默认属性*/
    static defaultProps =
    {
        name : "checkbox",
        title : "",
        value : "",
        checked : false,
        change : function (e){},
        extra : {},
        style : {},
        className : "",
    };

    /*属性验证*/
    static propTypes =
    {
        checked : PropTypes.bool,
        change : PropTypes.func,
        extra : PropTypes.object
    };

    /*构造函数*/
    constructor (props)
    {
        super (props);

        this.state  =
        {
            checked : !!props.checked,
            value : props.value
        };
    }

    /*处理点击*/
    handleChange = (e) =>
    {
        this.setState({checked : e.target.checked});

        if (typeof this.props.change === "function")
        {
            this.props.change(e);
        }
    };

    /*渲染*/
    render()
    {
        return <label className={this.state.checked ? "form-checkbox checked" : "form-checkbox"} style={this.props.style}>
             <span><i className="fas"/></span>
             {this.props.title !== "" ? <i className="checkbox-title">{this.props.title}</i> : ""}
             <input type="checkbox" name={this.props.name} defaultValue={this.props.value} checked={this.state.checked} onChange={this.handleChange} {...this.props.extra}/>
        </label>
    }
}