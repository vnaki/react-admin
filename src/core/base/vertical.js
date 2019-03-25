import React from "react";

/*垂直布局*/
export default (props) =>
{
    return <div direction="vertical" {...props}>
        {props.children}
    </div>
};