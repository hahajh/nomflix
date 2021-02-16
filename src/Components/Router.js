import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import Detail from "Routes/Detail";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Season from "Routes/Season";
import Header from "Components/Header";

// eslint-disable-next-line import/no-anonymous-default-export
export default() => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/tv" component={TV}/>
                <Route path="/search" component={Search}/>
                <Route path="/movie/:id" component={Detail}/>
                <Route path="/show/:id" component={Detail}/>
                <Route path="/season/:id" component={Season}/>
                <Redirect from="*" to="/"/>
            </Switch>
        </>
    </Router>
);