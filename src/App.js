import React, { Component } from 'react';
import Login from './page/Login/Login'
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Footer from "./components/Footer"
import AddTodo from "./containers/AddTodo"
import VisibleTodoList  from "./containers/VisibleTodoList"

import Users  from "./page/Users/Users"

class App extends Component {
    render() {
        return ( 
            <Router>
                <nav>
                    <ul className="w-full flex">
                        <li className="w-full">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="w-full">
                            <Link to="/statemanagement">State Management</Link>
                        </li>
                        <li className="w-full">
                            <Link to="/usermanagement">Users Management</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    
                    <Route path="/statemanagement">
                        <AddTodo />
                        <Footer />
                        <VisibleTodoList />
                    </Route>
                    
                    <Route path="/usermanagement">
                        <Users/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default App;