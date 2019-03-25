import React from "react";
import Header from "./header";
import Body from "./body";
import Checkbox from "../base/checkbox";
import "./style.css";

/**
 * Data List
 */
export default class List extends React.Component
{
    /**
     * checkbox default configuration
     */
    checkbox =
    {
        enabled : true,
        style   : {},
        name    : "cbox",
        field   : "Id",
        handler : null,
    };

    /**
     * row action
     */
    action =
    {
        enabled : true,
        items   : [], /*[{title:"", action:() => {}}, ...]*/
        style   : {},
        field   : "Id",
        title   : "操作"
    };

    /**
     * header cell
     * [{title:"", style:{}}, ...]
     */
    header   = [];

    /**
     * body style
     */
    style    = {};

    /**
     * checkbox item ref
     */
    cboxRefs = [];

    /**
     * checkbox checked items
     */
    checkedItems = [];

    /**
     * default props
     */
    static defaultProps =
    {
        /**
         * [{name:"", title:"", style : {...}, hover:false}, ... ]
         */
        cells : [],

        /**
         * default style
         */
        style : {width : "auto"},

        /**
         * list data
         * [{name1:value1, name2:value2, ... }, ... ]
         */
        data : [],

        /**
         * list fresh
         */
        fresh : () => {},

        /**
         * checkbox configuration
         */
        checkbox : {},

        /**
         * action configuration
         */
        action : {},
    };

    constructor (props)
    {
        super(props);

        this.checkbox = this.merge(this.checkbox, props.checkbox);
        this.action   = this.merge(this.action, props.action);

        this.init();
    }

    init ()
    {
        if (true === this.checkbox.enabled)
        {
            this.pushHeaderCell(<Checkbox change={this.checkAll}/>, this.checkbox.style);
        }

        let cells = this.props.cells;

        for (let index in cells)
        {
            if (cells.hasOwnProperty(index))
            {
                this.pushHeaderCell(cells[index].title, cells[index].style);
                this.style[cells[index].name] = [cells[index].style, !!cells[index].hover];
            }
        }

        if (true === this.action.enabled)
        {
            this.pushHeaderCell(
                this.action.title,
                this.action.style
            );
        }
    }

    /*数据行*/
    rows ()
    {
        let data = this.props.data, rows = [];

        for (let index in data) if (data.hasOwnProperty(index))
        {
            let row = [], ref = "cbox-"+index;

            if (true === this.checkbox.enabled)
            {
                row.push([
                    <Checkbox ref={ref} extra={{ref:ref}}
                          name={this.checkbox.name}
                          value={data[index][this.checkbox.field]}
                          change={this.checkOne}/>,
                    this.checkbox.style,
                    false
                ]);

                this.cboxRefs.push(ref);
            }

            for (let key in data[index])
            {
                if (data[index].hasOwnProperty(key) && this.style[key] !== undefined)
                {
                    row.push([data[index][key], this.style[key][0], this.style[key][1]]);
                }
            }

            if (true === this.action.enabled)
            {
                let _ = [], items = this.action.items, size = items.length;

                for (let i in items)
                {
                    if (items.hasOwnProperty(i))
                    {
                        _.push(<span onClick={() => {
                            if (typeof items[i].action === "function")
                            {
                                items[i].action(data[index][this.action.field]);
                            }
                        }} className="a" key={i}>
                            {items[i].title}
                        </span>);

                        if ( size > i+1)
                        {
                            _.push(<span className="a" key={"sep"+i}> / </span>);
                        }
                    }
                }

                row.push([<span className="list-link"> {_} </span>, this.action.style, false]);
            }

            rows.push(row);
        }

        return rows;
    }

    render ()
    {
        return <div className="list">

            <div className="list-header">
                <Header cells={this.header}/>
            </div>

            <div className="list-body">
                <Body rows={this.rows()}/>
            </div>
        </div>
    }

    pushHeaderCell (title, style)
    {
        this.header.push({title:title, style:style});
    }

    /**
     * 多选按钮
     */
    checkAll = (e) =>
    {
        for (let i in this.cboxRefs)
        {
            if (this.cboxRefs.hasOwnProperty(i))
            {
                if (e.currentTarget.checked !== this.refs[this.cboxRefs[i]].refs[this.cboxRefs[i]].checked)
                {
                    this.refs[this.cboxRefs[i]].refs[this.cboxRefs[i]].click();
                }
            }
        }
    };

    /**
     * 单选
     */
    checkOne = (e) =>
    {
        let pos = this.cboxRefs.indexOf(e.currentTarget.value);

        if (e.currentTarget.checked)
        {
            if (-1 === pos)
            {
                this.checkedItems.push(e.currentTarget.value);
            }
        }
        else
        {
            if (-1 < pos)
            {
                this.checkedItems.splice(pos, 1);
            }
        }

        if (typeof this.checkbox.handler === "function")
        {
            this.checkbox.handler(this.checkedItems);
        }
    };

    merge ()
    {
        let origin = {};

        for (let i in arguments)
        {
            if (arguments.hasOwnProperty(i) && typeof arguments[i] === "object")
            {
                Object.assign(origin, arguments[i]);
            }
        }

        return origin;
    }
}