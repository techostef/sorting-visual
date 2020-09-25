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

const checkIsSorted = (data, start, end) => {
    let isSorted = true
    for(let i = start; i <= end; i ++) {
        if (!isSorted) break
        if (data[i + 1] && data[i] > data[i + 1]) {
            isSorted = false
        }
    }
    return isSorted
}

const recursiveQuickSortA = (newData, pivot, start = 0) => {
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
            dispatch(recursiveQuickSortA(newData, i === (start - 1) ? parseInt(pivot / 2) : i, 0))
        if ((pivot - i) >= 1) {
            const nextI = i === (start) ? start + 1 : i
            dispatch(recursiveQuickSortA(newData, pivot, nextI))
        }
    }
}

const setActiveClassName = (index, oldIndex, classNameTarget) => {
    let selector = document.getElementsByClassName('item')
    let className = ''
    for(let i = 0; i < selector.length; i++) {
        className = selector[i].className
        if (i === index) {
            if (className.indexOf(classNameTarget) === -1) {
                selector[i].className = className + ' ' + classNameTarget
            }
        } 
        if (i === oldIndex) {
            deactiveClassName(className, selector[i], classNameTarget)
        }
    }
}

const deactiveClassName = (className, selector, classNameTarget) => {
    className = className.replace(/ +(?= )/g,'')
    className = className.split(" ")
    let newClassName = ''
    for(let name of className) {
        if (name !== classNameTarget)
        newClassName += ' ' + name
    }
    selector.className = newClassName
}

const controlClassNameSort = (classNameTarget, newIndex) => {
    let index, oldIndex
    
    const setDeactive = (indexDeactive) => {
        let selector = document.getElementsByClassName('item')
        let className = ''
        if (indexDeactive === -1) indexDeactive = index
        for(let i = 0; i < selector.length; i++) {
            if (selector[i])
            className = selector[i].className
            if (i === indexDeactive) {
                deactiveClassName(className, selector[i], classNameTarget)
            }
        }
    }

    const setActive = (newIndex) => {
        oldIndex = index
        index = newIndex
        if (index >= 0)
            setActiveClassName(index, oldIndex, classNameTarget)
        else
            setDeactive(oldIndex)
    }

    setActive(newIndex)
    
    return {
        setIndex: (newIndex) => {
            setActive(newIndex)
        },
        setDeactive
    }
}

const controlSwappNumber = (index, indexSwap) => {
    let selector = document.getElementsByClassName('item')
    let temp, val1, val2
    if (selector[index] && selector[indexSwap]) {
        temp = selector[index].style.height
        selector[index].style.height = parseInt(selector[indexSwap].style.height) + "px"
        selector[indexSwap].style.height = parseInt(temp) + "px"
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
        // dispatch(settingsStateAction.setIndexCompare(pivot))
        if (checkIsSorted(newData, start, pivot)) return false
        let controlIndex = controlClassNameSort('active')
        let controlIndexCompare = controlClassNameSort('active', pivot)
        let controlSwapping = controlClassNameSort('swapping')
        let once = true
        let changeIndex = 0
        let changeIndexCompare = 0
        let nextI
        let interval = setInterval(() => {
            if (swapping >= 1) {
                if (swapping === 1) {
                    controlIndexCompare.setIndex(changeIndex)
                    swapping = 2
                } else if (swapping === 2) {
                    controlSwapping.setIndex(changeIndex)
                    swapping = 3
                } else if (swapping === 3) {
                    dispatch(dataVisualStateAction.restoreData([...newData]))
                    controlSwapping.setIndex(changeIndexCompare)
                    controlIndexCompare.setIndex(changeIndexCompare)
                    controlIndex.setIndex(changeIndex)
                    swapping = 4
                } else if (swapping === 4) {
                    controlSwapping.setIndex(-1)
                    swapping = 5
                } else {
                    controlIndexCompare.setIndex(pivot)
                    swapping = false
                    j++;
                }
                
            } else {
                swapping = false
                controlIndex.setIndex(j)
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
            }
            
            if (j > pivot && once) {
                clearInterval(interval)
                once = false
                controlIndex.setDeactive(-1)
                controlIndexCompare.setDeactive(-1)
                controlSwapping.setDeactive(-1)
                if ((i - start) >= 1) 
                    nextI = i === (start - 1) ? parseInt(pivot / 2) : i
                    dispatch(recursiveQuickSort(newData, speed, nextI, 0))
                if ((pivot - i) >= 1) {
                    nextI = i === (start) ? start + 1 : i
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
        // dispatch(recursiveQuickSortA(newData))
        // dispatch(dataVisualStateAction.restoreData(newData))
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