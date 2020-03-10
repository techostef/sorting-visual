import React from 'react'
import InputText from '../../../components/inputText'
import { AddUser } from '../../../actions'
import { connect } from 'react-redux'

const mapStatetoProps = state => {
    return {
        ListUser: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddUser: (name, age, active) => dispatch(AddUser(name, age, active))
    }
}
class AddUsers extends React.Component {
    constructor (props) {
        super(props)
        
        this.state = {
            name: "",
            age: "",
            active: true
        }
        this.getValueName = this.getValueName.bind(this)
    }
    getValueName (value) {
        // console.log("value from parent", value)
        this.setState({name: value})
    }
    getValueAge = (age) => {
        this.setState({age: age})
    }
    clearAfterAdd () {
        this.setState({
            name: "",
            age: "",
            active: true
        })
    }
    
    render () {
        return (
            <div>
                <InputText label="Name" value={this.state.name} onChange={this.getValueName}/>
                <InputText label="Age" value={this.state.age} onChange={this.getValueAge}/>
                <button onClick={() => {
                    this.props.AddUser(this.state.name, this.state.age, true)
                    this.clearAfterAdd()
                }}>Submit</button>
            </div>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AddUsers)