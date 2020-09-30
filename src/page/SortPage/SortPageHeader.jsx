import React from "react"
import { connect } from "react-redux"
import "./SortPageHeader.scss"
import { Button } from "react-bootstrap"
import * as settingsStateAction from "../../store/actions/settingsStateAction"
import * as dataVisualStateAction from "../../store/actions/dataVisualStateAction"
import * as dataVisualBusinessAction from "../../store/actions/business/dataVisualBusinessAction"
import * as sortBusinessAction from "../../store/actions/business/sortBusinessAction"
import { bindActionCreators } from "redux"
import InputDropDown from "../../components/inputs/InputDropDown"
import { durationBetween } from "../../helper/dateHelper"
import InputRange from "../../components/inputs/InputRange"

const mapStateToProps = (state) => {
    return {
        dataVisualState: state.dataVisualState,
        settingsState: state.settingsState,
        sortState: state.sortState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataVisualBusinessAction: bindActionCreators(dataVisualBusinessAction, dispatch),
        dataVisualStateAction: bindActionCreators(dataVisualStateAction, dispatch),
        settingsStateAction: bindActionCreators(settingsStateAction, dispatch),
        sortBusinessAction: bindActionCreators(sortBusinessAction, dispatch),
    }
}

const SortPageHeader = (props) => {
    const handleGenerateArray = () => {
        const { dataVisualBusinessAction } = props
        dataVisualBusinessAction.generateDataVisual()
    }

    const handleSettingsMaxArray = (e) => {
        const { dataVisualBusinessAction, settingsStateAction } = props
        settingsStateAction.setMaxArray(parseInt(e.target.value))
        dataVisualBusinessAction.generateDataVisual()
    }

    const handleSortChange = (item) => {
        const { sortBusinessAction } = props
        sortBusinessAction.setIsSelected(item.Id, true)
    }

    const handleSortingArray = () => {
        const { dataVisualBusinessAction, dataVisualStateAction } = props
        dataVisualBusinessAction.sortingDataVisual()
        // dataVisualStateAction.restoreData([1, 2, 3, 4])
    }

    const handleSpeedSorting = (e) => {
        const { settingsStateAction } = props
        settingsStateAction.setSpeed(parseInt(e.target.value))
    }

    return (
        <div className="sort-header">
            <Button 
                disabled={props.settingsState.runSorting}
                onClick={handleGenerateArray}>
               Generate Array
            </Button>
            <InputRange 
                min={5}
                max={500}
                value={props.settingsState.maxArray}
                onChange={handleSettingsMaxArray}
                label={'Range Array'}
            />
            <InputRange 
                min={1}
                max={200}
                value={props.settingsState.speed}
                onChange={handleSpeedSorting}
                label={'Speed Sorting'}
            />
            <div className="sorting">
                <InputDropDown 
                    options={props.sortState}
                    onChange={handleSortChange}    
                />
                <label htmlFor="sorting">sorting</label>
            </div>
            <div className="sorting">
                <div>
                    <div>Time</div>
                    <div>{(
                        props.settingsState.startSorting && props.settingsState.endSorting ? durationBetween(props.settingsState.startSorting, props.settingsState.endSorting) : 0
                    )}</div>
                </div>
            </div>
            <div className="sorting">
                <div>
                    <div>Size</div>
                    <div>{props.dataVisualState.length}</div>
                </div>
                
            </div>
            <Button 
                disabled={props.settingsState.runSorting}
                className="btn-run" 
                onClick={handleSortingArray}
            >
               Run
            </Button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SortPageHeader))