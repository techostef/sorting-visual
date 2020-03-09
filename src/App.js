import React, { Component } from 'react';
import Login from './page/Login/Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Footer from "./components/Footer"
import AddTodo from "./containers/AddTodo"
import VisibleTodoList  from "./containers/VisibleTodoList"

class App extends Component {
    render() {
        return ( 
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    
                    <Route path="/statemanagement">
                        <AddTodo />
                        <Footer />
                        <VisibleTodoList />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default App;