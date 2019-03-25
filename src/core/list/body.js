import React from "react";
import Horizontal from "../../core/base/horizontal";

/**
 * Data body party
 */
export default class Body extends React.Component
{
    static defaultProps =
    {
        rows : [],
    };

    render()
    {
        return this.props.rows.map((row, k) => <Horizontal className="list-row" key={k}>
            {row.map((v, k) => <div className="list-cell" style={v[1]} key={k} title={v[2] ? v[0] : ""}> {v[0]} </div>)}
        </Horizontal>);
    }
}