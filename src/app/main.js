import React from "react";
import "../styles/app.css";
import {HashRouter} from "react-router-dom";
import Horizontal from "../core/base/horizontal";
import Vertical from "../core/base/vertical";
import AppRoutes from "./routes";
import Nav from "../core/nav/index";
import Logo from "../core/logo/index";
import Toast from "../core/base/toast/index";
import Header from "../core/header/index";
import {NavData} from "./__";

export default class Main extends React.Component
{
    render()
    {
        return <HashRouter>
            <Horizontal className="container">
                <Vertical className="left-panel">
                    <Logo title="ADMIN"/>
                    <Nav data={NavData}/>
                </Vertical>

                {/*Toast要提前加载*/}
                <Toast/>

                <Vertical className="right-panel">
                    {/*头部*/}
                   <Header/>
                   {/*内容*/}
                    <div className="content">
                        <AppRoutes/>
                    </div>
                </Vertical>
            </Horizontal>
        </HashRouter>;
    }

    /*组件加载完成*/
    componentDidMount()
    {
        window.left = this.left;
    }

    /*处理左侧显示和折叠*/
    left = () =>
    {

    };
}