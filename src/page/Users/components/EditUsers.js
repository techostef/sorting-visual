import React from 'react'
import InputText from '../../../components/inputText'
import { EditUser } from '../../../actions'
import { connect } from 'react-redux'

const mapStatetoProps = state => {
    return {
        ListUser: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        EditUser: (id, name, age) => dispatch(EditUser(id, name, age))
    }
}
class EditUsers extends React.Component {
    constructor (props) {
        super(props)
        
        this.state = {
            id: this.props.user && this.props.user.Id ? this.props.user.Id : null,
            name: this.props.user &&  this.props.user.Name ? this.props.user.Name : null,
            age: this.props.user && this.props.user.Age ? this.props.user.Age : null
        }
        this.getValueName = this.getValueName.bind(this)
    }
    componentWillReceiveProps(next) {
        if (this.props != next) {
            this.props = next
        }
        this.setState({
            id: this.props.user && this.props.user.Id ? this.props.user.Id : null,
            name: this.props.user &&  this.props.user.Name ? this.props.user.Name : null,
            age: this.props.user && this.props.user.Age ? this.props.user.Age : null
        })
    }
    getValueName (value) {
        // this.setState({name: value})
        this.props.user.Name = value
        this.setState({
            name: this.props.user &&  this.props.user.Name ? this.props.user.Name : null,
        })
    }
    getValueAge = (age) => {
        this.props.user.Age = age
        this.setState({
            age: this.props.user && this.props.user.Age ? this.props.user.Age : null
        })
    }
    getAlert = () => {
        alert('getAlert from Child');
    }
    render () {
        return (
            <div>
                {  (this.props.user ) ? 
                    <div>
                        <InputText label="Name" value={this.state.name} onChange={this.getValueName}/>
                        <InputText label="Age" value={this.state.age}  onChange={this.getValueAge}/>
                        <button onClick={() => {
                            this.props.EditUser(this.props.user.id, this.props.user.Name, this.props.user.Age)
                            this.props.clearUser()
                        }}>Update</button>
                    </div> : ""}
            </div>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(EditUsers)