import React from "react";

/*水平布局*/
export default (props) =>
{
    return <div direction="horizontal" {...props}>
        {props.children}
    </div>
};