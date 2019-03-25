import React from "react";
import "./style.css";

/**
 * 下拉组件
 */
export default class Select extends React.Component
{
    static defaultProps =
    {
        /**
         * 表单name
         */
        name : "",

        /**
         * CSS补充样式
         */
        style : {},

        /**
         * 选择应用场景, A or B, 默认为A
         */
        scene : "A",

        /**
         * 下拉选项
         * 当场景为A时格式为[{title:"", value:""}, ...]
         * 当场景为B时格式为[value1, value2 ...]
         */
        options : [],

        /**
         * 更新器
         */
        updater : null,

        /**
         * 默认值
         */
        defaultValue : "",

        /**
         * 额外类名
         */
        className : "",

        /**
         * 没有可选提示语
         */
        emptyMessage : "没有可用数据",
    };

    /**
     * 模式A时，键值对字典
     */
    kv = {};

    constructor (props)
    {
        super (props);

        if (-1 === ["A", "B"].indexOf(props.scene))
        {
            throw new Error ("Select组件场景设置错误");
        }

        this.state =
        {
            focus : false,
            value : props.defaultValue || "",
            options : props.options || []
        };
    }

    componentWillMount()
    {
        this.props.scene === "A" && this.props.options.forEach (v =>
        {
            this.kv[v.value.toString()] = v.title;
        });
    }

    componentDidMount()
    {

    }

    render()
    {
        let props = {};

        props["onChange"] = (e) =>  this.props.scene === "B" ? this.setState({value:e.currentTarget.value}) : {};

        return <div className={"form-select "+this.props.className} style={this.props.style}>
            <div className="form-select-wrapper" onMouseDown={this.open} onMouseLeave={this.close}>

                <input type="text"
                       autoComplete="off"
                       className={"form-select-input" + (this.props.scene === "B" ? "" : " cursor")}
                       value={this.props.scene === "B" ? this.state.value.toString() : this.kv[this.state.value.toString()]}
                       readOnly={this.props.scene === "A"} {...props}/>

                <input type="hidden" name={this.props.name} defaultValue={this.state.value.toString()}/>

                <div className={"form-select-options" + (true === this.state.focus ? " focus" : "")} onClick={this.choose}>
                    {this.options()}
                </div>

            </div>
        </div>;
    }

    /**
     * 遍历元素
     */
    options = () =>
    {
        let options = [];

        this.props.options.forEach ((v, k) =>
        {
            if (this.props.scene === "A") {
                options.push(<div className={"form-select-option"+(this.state.value.toString() === v.value.toString() ? " selected" : "" )} data-v={v.value} key={k}>{v.title}</div>);
            } else if (this.props.scene === "B") {
                options.push(<div className={"form-select-option"+(this.state.value.toString() === v.toString() ? " selected" : "" )} data-v={v} key={k}>{v}</div>);
            }
        });

        if (options.length < 1)
        {
            options.push(<div className="form-select-empty" key="select-empty" ref={"options-empty"}> {this.props.emptyMessage} </div>);
        }

        return options;
    };

    /**
     * 打开下拉选项
     */
    open = (e) =>
    {
        this.setState({focus:true});
    };

    /**
     * 关闭下拉选项
     */
    close = (e) =>
    {
        this.setState({focus:false});
    };

    /**
     * 下拉选项选择
     */
    choose = (e) =>
    {
        e.preventDefault();

        let state = {focus:false};

        if (e.target !== e.currentTarget && e.target !== this.refs["options-empty"])
        {
            state["value"] = e.target.getAttribute("data-v");
        }

        this.setState(state);
    };
}