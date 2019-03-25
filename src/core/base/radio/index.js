import React from "react";
import "./style.css";

// 表单组件 - Radio
export default class Index extends React.Component
{
    /*默认属性*/
    static defaultProps =
    {
        name:"radio",
        disabled:false,
        data:[],/*[{title:"", value: ""}, ...]*/
        value:null,/*默认值*/
    };

    constructor (props)
    {
        super (props);

        this.state =
        {
            value:props.value.toString()
        };
    }

    render()
    {
        return this.props.data.map( (v, k) => <label key={k} data-key={k} className={"form-radio-label"+( this.state.value === v.value.toString() ? " focus" : "")}>
            <span className="form-radio">
                <i className="form-radio-dot"/>
            </span><span className="form-radio-title">{v.title}</span><input type="radio" name={this.props.name} value={v.value.toString()} defaultChecked={this.state.value === v.value.toString()} onChange={this.radioChange}/>
        </label>);
    }

    radioChange = (e) =>
    {
        false === this.props.disabled && this.setState({value:e.currentTarget.value});
    };
}