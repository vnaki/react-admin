import React from "react";

export default class Base extends React.Component
{
    componentWillUnmount()
    {
        window.Toast(null);
    }
}