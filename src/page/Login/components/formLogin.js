import React from 'react'
import InputText from '../../../components/inputText'
import { useHistory } from "react-router-dom";
class FormLogin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: "master"
        }

        this.getValueUsername = this.getValueUsername.bind(this)
        this.submitOption = this.submitOption.bind(this)

    }
    getValueUsername (value) {
        // console.log("value from parent", value)
        this.setState({username: value})
    }
    componentDidMount() {
        this.setState({username: "value"})
    } 
    submitOption () {
        const history = useHistory();
        history.push("/home");
    }
    render () {
        // this.setState({username: "value"})
        return (
            <div>
                {this.state.username}
                <InputText label="Username" onChange={this.getValueUsername}/>
                <button onClick={this.submitOption}>Submit</button>
            </div>
        )
    }
}

export default FormLogin