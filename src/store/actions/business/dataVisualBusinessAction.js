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

const recursiveQuickSort = (newData, speed, pivot, start = 0) => {
    return (dispatch, getState) => {
        if (start > pivot) return false
        let i = start - 1;
        let j = start;
        let length = newData.length - 1
        let temp
        let swapping = false
        if (!pivot) pivot = length
        dispatch(settingsStateAction.setIndexCompare(pivot))
        let once = true
        let changeIndex = 0
        let changeIndexCompare = 0
        let interval = setInterval(() => {
            if (swapping >= 1) {
                // dispatch(settingsStateAction.setIndexCompare(i))
                if (swapping === 1) {
                    dispatch(settingsStateAction.setIndexCompare(changeIndex))
                    console.log("swapping1")
                    swapping = 2
                } else if (swapping === 2) {
                    dispatch(settingsStateAction.setSwapping(changeIndex))
                    dispatch(settingsStateAction.setIndexSort(changeIndexCompare))
                    console.log("swapping2")
                    swapping = 3
                } else if (swapping === 3) {
                    dispatch(dataVisualStateAction.restoreData([...newData]))
                    dispatch(settingsStateAction.setSwapping(changeIndexCompare))
                    dispatch(settingsStateAction.setIndexSort(changeIndex))
                    console.log("swapping3")
                    swapping = 4
                } else if (swapping === 4) {
                    dispatch(settingsStateAction.setSwapping(-1))
                    console.log("swapping4")
                    swapping = 5
                } else {
                    dispatch(settingsStateAction.setIndexCompare(pivot))
                    console.log("swappingElse")
                    swapping = false
                    j++;
                }
                
            } else {
                swapping = false
                dispatch(settingsStateAction.setIndexSort(j))
                if (j === start && newData[pivot] <= newData[j]) {
                    i++
                    temp = newData[j]
                    newData[j] = newData[pivot]
                    newData[pivot] = temp
                    swapping = 1
                    changeIndex = pivot
                    changeIndexCompare = j
                }
                else if (j === pivot && newData[pivot] >= newData[i]) {
                    i++
                    temp = newData[i]
                    newData[i] = newData[pivot]
                    newData[pivot] = temp
                    i--
                    swapping = 1
                    changeIndex = i + 1
                    changeIndexCompare = pivot
                }
                else if (newData[j] <= newData[pivot]) {
                    i++
                    temp = newData[j]
                    newData[j] = newData[i]
                    newData[i] = temp
                    changeIndex = i
                    changeIndexCompare = j

                    if (j != i)
                    swapping = 1
                }
                
                if (!swapping && j < pivot) {
                    j++
                }
                console.log("interval")
            }
            
            if (j > pivot && once) {
                clearInterval(interval)
                once = false
                if ((i - start) >= 1) 
                    dispatch(recursiveQuickSort(newData, speed, i === (start - 1) ? parseInt(pivot / 2) : i, 0))
                if ((pivot - i) >= 1) {
                    const nextI = i === (start) ? start + 1 : i
                    dispatch(recursiveQuickSort(newData, speed, pivot, nextI))
                }
            }
        }, speed)
    }
}

const sortingDataQuickSort = (speed) => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualState } = state
        let newData = dataVisualState.filter((item) => Object.assign({}, item))
        dispatch(recursiveQuickSort(newData, speed))
        // dispatch(settingsStateAction.setRunSorting(false))
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
        }

    }
}