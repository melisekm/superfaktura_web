import React from "react"
import {Route, Switch,} from "react-router-dom";
import './App.css';

import Home from "../Home/Home";
import NavMenu from "../../component/NavMenu/NavMenu";
import Content from "../../component/Content/Content";


const App = () => {
    return (
        <div className="App">
            <NavMenu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route component={Content}/>
            </Switch>
        </div>
    )
};

export default App;

