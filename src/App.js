import React, { Component } from 'react';
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

class App extends Component {
    render() {
        return ( 
            <div>
                <h1 className="w-1/2" style={{border:"1px solid black"}}> Hello World </h1> 
                <Footer></Footer>
                <AddTodo></AddTodo>
                <VisibleTodoList></VisibleTodoList>
            </div>
        );
    }
}
export default App;