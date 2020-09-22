import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import "./SortPageContent.scss"
import * as dataVisualBusinessAction from "../../store/actions/business/dataVisualBusinessAction"
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    return {
        dataVisualState: state.dataVisualState,
        indexSort: state.settingsState.indexSort,
        runSorting: state.settingsState.runSorting,
        swapping: state.settingsState.swapping,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataVisualBusinessAction: bindActionCreators(dataVisualBusinessAction, dispatch)
    }
}

const SortPageContent = (props) => {
    useEffect(() => {
        const { dataVisualBusinessAction } = props
        dataVisualBusinessAction.generateDataVisual()
    }, [])

    const sortingWhenRunning = (index) => {
        return (props.runSorting && (props.indexSort === index || (props.indexSort + 1) === index) ? "active" : '')
    }

    const swappingWhenRunning = (index) => {
        if (props.swapping)
            return (props.runSorting && (props.indexSort + (props.swapping - 1) === index) ? "swapping" : '')
        else 
            return ''
    }

    return (
        <div className="sort-content">
            <div className="item-content">
                {props.dataVisualState.map((item, index) => {
                    return (
                        <div 
                            key={`${index}-item-${item}`} 
                            className={`item ${sortingWhenRunning(index)} ${swappingWhenRunning(index)}`} 
                            style={{height: `${(item * 2)}px`}}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPageContent)