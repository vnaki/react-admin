import React from "react";

/*通知*/
export default function (props)
{
    return <div className="notice">
        {props.children}
    </div>;
}