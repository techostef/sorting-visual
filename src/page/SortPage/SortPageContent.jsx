import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import "./SortPageContent.scss"
import * as dataVisualBusinessAction from "../../store/actions/business/dataVisualBusinessAction"
import { bindActionCreators } from 'redux'
import { SORT_TYPE } from '../../enums/DataEnums'

const mapStateToProps = (state) => {
    return {
        dataVisualState: state.dataVisualState,
        indexCompare: state.settingsState.indexCompare,
        indexSort: state.settingsState.indexSort,
        runSorting: state.settingsState.runSorting,
        sortState: state.sortState,
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
        // const { dataVisualBusinessAction } = props
        // dataVisualBusinessAction.generateDataVisual()
    }, [])

    const selectedSortItem = props.sortState.find((item) => item.isSelected)

    const sortingWhenRunning = (index) => {
        if (selectedSortItem.name === SORT_TYPE.BUBLE_SORT)
            return (props.runSorting && (props.indexSort === index || (props.indexSort + 1) === index) ? "active" : '')
        else if (selectedSortItem.name === SORT_TYPE.QUICK_SORT)
            return (props.runSorting && (props.indexSort === index || (props.indexCompare) === index) ? "active" : '')
        else
            return ''
    }

    const swappingWhenRunning = (index) => {
        if (selectedSortItem.name === SORT_TYPE.BUBLE_SORT)
            if (props.swapping)
                return (props.runSorting && (props.indexSort + (props.swapping - 1) === index) ? "swapping" : '')
            else 
                return ''
        else if (selectedSortItem.name === SORT_TYPE.QUICK_SORT)
            if (props.swapping >= 0) 
                return (props.runSorting && (props.swapping === index) ? "swapping" : '')
            else 
                return ''
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
                                {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPageContent)