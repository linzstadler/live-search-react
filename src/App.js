import React from "react";
import './App.css';
import {Route, Switch} from 'react-router-dom';
import LiveSearch from "./components/LiveSearch/LiveSearch";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import 'rsuite/dist/styles/rsuite-default.css';
import {Redirect} from "react-router";


function App() {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path='/live-search' component={LiveSearch}/>
                <Route exact path='/detail/:id' component={Detail}/>
                <Route exact path='/home' component={Home}/>
                <Redirect from='*' to='/home' />
            </Switch>
        </div>
    );
}

export default App;
