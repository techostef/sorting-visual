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
        let sorted = false
        if (data[index + 1] && data[index] > data[index + 1]) {
            let temp = data[index]
            data[index] = data[index + 1]
            data[index + 1] = temp
            sorted = true
        }

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
        let sorted
        let swapping = false
        dispatch(settingsStateAction.setRunSorting(true))
        dispatch(settingsStateAction.setStartSorting(new Date()))
        switch(selectedSortItem && selectedSortItem.name) {
            case SORT_TYPE.BUBLE_SORT:
                interval1 = setInterval(() => {
                    if (swapping >= 1) {
                        if (swapping === 1) {
                            dispatch(dataVisualStateAction.restoreData([...newData]))
                            swapping = 2
                            dispatch(settingsStateAction.setSwapping(swapping))
                        } else if (swapping === 2) {
                            swapping = false
                            dispatch(settingsStateAction.setSwapping(swapping))
                            sorted = false
                        }
                    } else {
                        if (sorted) {
                            dispatch(dataVisualStateAction.restoreData([...newData]))
                            swapping = 2
                            dispatch(settingsStateAction.setSwapping(swapping))
                            sorted = false
                        } else {
                            sorted = false
                            if (newData[index1 + 1] && newData[index1] > newData[index1 + 1]) {
                                let temp = newData[index1]
                                newData[index1] = newData[index1 + 1]
                                newData[index1 + 1] = temp
                                sorted = true
                                swapping = 1
                                dispatch(settingsStateAction.setSwapping(swapping))
                            }
                            if (!sorted) {
                                index1 += 1
                                dispatch(settingsStateAction.setIndexSort(index1))
                                if (index1 === length - index2 - 1) {
                                    index2 += 1;
                                    index1 = 0;
                                    dispatch(settingsStateAction.setIndexSort(index1))
                                }
                                if (index2 >= length - 1) {
                                    clearInterval(interval1)
                                    dispatch(settingsStateAction.setRunSorting(false))
                                    dispatch(settingsStateAction.setEndSorting(new Date()))
                                }
                            }
                        }
                        
                    }
                }, speed)
            default:
                break;
        }
    }
}