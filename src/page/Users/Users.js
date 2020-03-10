import React from 'react'
import AddUsers from './components/AddUsers'
import ListUsers from './components/ListUsers'
const Users = () => (
    <div className="w-full flex" style={{height: "100vh"}}>
        <div className="mb-auto border-shadow-inner p-3" style={{width: "300px"}}>
            <AddUsers/>
            <ListUsers/>
        </div>
    </div>
)
export default Users