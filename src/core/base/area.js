import React from "react";

export default (props) =>
{
    return <div className="margin" style={props.style}>
        <div className="padding">
        {props.children}
        </div>
    </div>;
};