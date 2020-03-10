import React from 'react'
import { connect } from 'react-redux'
import { RemoveUser } from "../../../actions"
import EditUsers from './EditUsers'

const mapStateToProps = state => {
    return {
        ListUsers: state.users
    }
}


const mapDispatchToProps = dispatch => {
    return {
        RemoveUser: (Id) => dispatch(RemoveUser(Id))
    }
}

class ListUsers extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            user: null
        }
    }

    render () {
        return (
            <div>
                {this.props.ListUsers.map((item, index) => 
                    <li key={index}>
                    <span onClick={() => {
                        this.setState({user: item})
                    }} className="cursor-pointer pr-2">Edit</span>
                    {item.Name}, Age {item.Age} <span onClick={() => {
                        this.props.RemoveUser(item.Id)
                    }} className="text-danger cursor-pointer">X</span></li>
                )}
                <EditUsers user={this.state.user} clearUser={() => {
                    this.setState({user:null})
                }}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers)