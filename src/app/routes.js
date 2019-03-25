import React from "react";
import {Switch, Route} from "react-router-dom";
import NotFound from "../core/error/notfound";
import Index from "./views/index/index";
import ConfigInfo from "./views/config/info";
import ConfigAdd from "./views/config/save/add";
import ConfigEdit from "./views/config/save/edit";
import ConfigIndex from "./views/config/index";

export default () =>
{
    return <Switch>
        <Route path="/" exact={true} component={Index}/>
        <Route path="/config" exact={true} component={ConfigIndex}/>
        <Route path="/config-add" exact={true} component={ConfigAdd}/>
        <Route path="/config-edit" exact={true} component={ConfigEdit}/>
        <Route path="/config-info" exact={true} component={ConfigInfo}/>
        <Route component={NotFound}/>
    </Switch>
};