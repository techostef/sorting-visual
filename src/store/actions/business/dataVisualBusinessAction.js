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

const sortingDataBubleSort = (speed) => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualState } = state
        let length = dataVisualState.length
        let newData = dataVisualState.filter((item) => Object.assign({}, item))
        let index1 = 0
        let index2 = 0
        let interval1
        let sorted
        let swapping = false
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
    }
}

const sortQuickSortByStep = (newData, pivot, j, i, length, log = false) => {
    return (dispatch, getState) => {
        let temp
        if (!length) length = pivot
        console.log("length", length, j, pivot)
        if (pivot - j === length && newData[pivot] < newData[j]) {
            temp = newData[j]
            newData[j] = newData[pivot]
            newData[pivot] = temp
        }
        else if (j === pivot && newData[pivot] > newData[i]) {
            i++
            temp = newData[i]
            newData[i] = newData[pivot]
            newData[pivot] = temp
           
            i--
        }
        else if (newData[j] < newData[pivot]) {
            i++
            if (newData[i]) {
                temp = newData[j]
                newData[j] = newData[i]
                newData[i] = temp
            }
        }
        j ++;

        return {
            newData: newData,
            i: i,
            j: j,
        }
    }
}

const recursiveQuickSort = (newData, pivot, start = 0) => {
    return (dispatch, getState) => {
        if (start > pivot) return false
        let i = start - 1;
        let j = start;
        let length = newData.length - 1
        let temp
        if (!pivot) pivot = length
        while(j <= pivot) {
            if (j === start && newData[pivot] <= newData[j]) {
                i++
                temp = newData[j]
                newData[j] = newData[pivot]
                newData[pivot] = temp
            }
            else if (j === pivot && newData[pivot] >= newData[i]) {
                i++
                temp = newData[i]
                newData[i] = newData[pivot]
                newData[pivot] = temp
            
                i--
            }
            else if (newData[j] <= newData[pivot]) {
                i++
                if (newData[i]) {
                    temp = newData[j]
                    newData[j] = newData[i]
                    newData[i] = temp
                }
            }
            j ++;
        }
       
        if ((i - start) >= 1) 
            dispatch(recursiveQuickSort(newData, i === (start - 1) ? parseInt(pivot / 2) : i, 0))
        if ((pivot - i) >= 1) {
            const nextI = i === (start) ? start + 1 : i
            dispatch(recursiveQuickSort(newData, pivot, nextI))
        }
            
    }
}

const sortingDataQuickSort = (speed) => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualState } = state
        let length = dataVisualState.length
        let newData = dataVisualState.filter((item) => Object.assign({}, item))
        let i = -1, i1, i2
        let j = 0, j1, j2
        let pivot = length - 1, pivot1, pivot2
        let temp
        let interval1
        let sorted
        let swapping = false
        let index = 0;
        let maxIndex = 3;
        dispatch(recursiveQuickSort(newData))
        dispatch(dataVisualStateAction.restoreData(newData))
        
    }
}

export const sortingDataVisual = () => {
    return (dispatch, getState) => {
        const state = getState()
        const { settingsState, sortState } = state
        const selectedSortItem = sortState.find((item) => item.isSelected)
        let speed = settingsState.speed * 10
        dispatch(settingsStateAction.setRunSorting(true))
        dispatch(settingsStateAction.setStartSorting(new Date()))
        const type = selectedSortItem && selectedSortItem.name
        if (type === SORT_TYPE.BUBLE_SORT) {
            dispatch(sortingDataBubleSort(speed))
        } else if (type === SORT_TYPE.QUICK_SORT) {
            dispatch(sortingDataQuickSort(speed))
            dispatch(settingsStateAction.setRunSorting(false))
        }

    }
}