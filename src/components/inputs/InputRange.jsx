import React from "react"
import "./InputRange.scss"
import PropTypes from "prop-types"

const  InputRange = (props) => {
    return (
        <div className="range-array">
            <div className="input-container">
                <input 
                    type="range"
                    min={props.min} 
                    max={props.max}
                    value={props.value}
                    onChange={props.onChange}
                />
                <input 
                    className="input-text"
                    type="text"  
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
            <label>{props.label}</label>
        </div>
    )
}

InputRange.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
}

export default React.memo(InputRange)