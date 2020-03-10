import React from 'react'
class InputText extends React.Component {
    constructor (props) {
        super(props)
        this.changeValue = this.changeValue.bind(this);
    }

    render () {
        return (
            <div className="w-full flex">
                <span className="p-2">
                    {this.props.label}
                </span>
                <input className="gray p-1 h-8 m-auto border-radius-3" value={this.props.value} onChange={this.changeValue.bind(this)} ref="LoginInput" style={{border: "1px solid gray"}}/>
            </div>
        )
    }
    changeValue(e) {
        this.props.onChange(e.target.value)
    }
}
// const InputText = () => (
//     <input />
// )
export default InputText