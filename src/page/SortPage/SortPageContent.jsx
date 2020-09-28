import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import "./SortPageContent.scss"
import * as dataVisualBusinessAction from "../../store/actions/business/dataVisualBusinessAction"
import * as settingsStateAction from "../../store/actions/settingsStateAction"
import { bindActionCreators } from 'redux'
import SortPageItemSort from "./SortPageItemSort"

const mapStateToProps = (state) => {
    return {
        dataVisualState: state.dataVisualState,
        indexSort: state.settingsState.indexSort,
        lengthIndexSort: state.settingsState.lengthIndexSort,
        runSorting: state.settingsState.runSorting,
        swapping: state.settingsState.swapping,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataVisualBusinessAction: bindActionCreators(dataVisualBusinessAction, dispatch),
        settingsStateAction: bindActionCreators(settingsStateAction, dispatch),
    }
}

const SortPageContent = (props) => {
    useEffect(() => {
        // const { dataVisualBusinessAction } = props
        // dataVisualBusinessAction.generateDataVisual()
    }, [])

    // useEffect(() => {
    //     const { settingsStateAction } = props
    //     if (props.lengthIndexSort === 0) {
    //         settingsStateAction.setRunSorting(false)
    //         settingsStateAction.setEndSorting(new Date())
    //     } else {
    //         settingsStateAction.setRunSorting(true)
    //     }
    // }, [props.indexSort])

    return (
        <div className="sort-content">
            <div className="item-content">
                {props.dataVisualState.map((item, index) => {
                    return (
                        <SortPageItemSort 
                            key={`${index}-item-${props.item}`}
                            index={index}
                            item={item}
                            sortingWhenRunning={''}
                            swappingWhenRunning={''}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SortPageContent))