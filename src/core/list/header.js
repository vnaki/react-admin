import React from "react";
import Horizontal from "../../core/base/horizontal";

/**
 * Data List Header
 */
export default class Header extends React.Component
{
    static defaultProps =
    {
        /**
         * [{title:"", style:{}}, ...]
         */
        cells : [],
    };

    render()
    {
        return <Horizontal className="list-row">
            {this.props.cells.map( (v, k) => {
                return <div className="list-cell" key={k} style={v.style}>
                    {v.title}
                </div>
            })}
        </Horizontal>
    }
}