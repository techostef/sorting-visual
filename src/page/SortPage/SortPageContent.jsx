import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import "./SortPageContent.scss"
import * as dataVisualBusinessAction from "../../store/actions/business/dataVisualBusinessAction"
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    return {
        dataVisualState: state.dataVisualState,
        runSorting: state.settingsState.runSorting,
        indexSort: state.settingsState.indexSort,
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

    return (
        <div className="sort-content">
            <div className="item-content">
                {props.dataVisualState.map((item, index) => {
                    return (
                        <div 
                            key={`${index}-item-${item}`} 
                            className={`item ${(props.runSorting && props.indexSort === index ? "active" : '')}`} 
                            style={{height: `${(item * 2)}px`}}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPageContent)