import { SORT_TYPE } from "../../../enums/DataEnums"
import * as dataVisualStateAction from "../dataVisualStateAction"
import * as settingsStateAction from "../settingsStateAction"

export const generateDataVisual = () => {
    return (dispatch, getState) => {
        const state = getState()
        const { settingsState } = state
        const data = []

        for(let i = 0; i < settingsState.maxArray; i ++) {
            data[i] = Math.floor(Math.random() * settingsState.maxValue) + 5
        }

        dispatch(dataVisualStateAction.restoreData(data))
    }
}

const sortingDataBubleByStep = (data, index) => {
    return (dispatch, getState) => {
        if (data[index + 1] && data[index] > data[index + 1]) {
            let temp = data[index]
            data[index] = data[index + 1]
            data[index + 1] = temp
        }

        return data
    }
}

export const sortingDataVisual = () => {
    return (dispatch, getState) => {
        const state = getState()
        const { settingsState, sortState, dataVisualState } = state
        const selectedSortItem = sortState.find((item) => item.isSelected)
        let length = dataVisualState.length
        let index1 = 0;
        let index2 = 0;
        let interval1;
        let newData = [...dataVisualState]
        let speed = settingsState.speed * 10
        dispatch(settingsStateAction.setRunSorting(true))
        dispatch(settingsStateAction.setStartSorting(new Date()))
        switch(selectedSortItem && selectedSortItem.name) {
            case SORT_TYPE.BUBLE_SORT:
                interval1 = setInterval(() => {
                    newData = dispatch(sortingDataBubleByStep(newData, index1))
                    dispatch(dataVisualStateAction.restoreData([...newData]))
                    index1 += 1
                    dispatch(settingsStateAction.setIndexSort(index1))
                    if (index1 >= length - index2 + 1) {
                        index2 += 1;
                        index1 = 0;
                        dispatch(settingsStateAction.setIndexSort(index1))
                    }
                    if (index2 >= length) {
                        clearInterval(interval1)
                        dispatch(settingsStateAction.setRunSorting(false))
                        dispatch(settingsStateAction.setEndSorting(new Date()))
                    }
                }, speed)
            default:
                break;
        }
    }
}