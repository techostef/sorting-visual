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

const controlIndexNew = (newIndex, activeFuncNew = () => {}, removeFuncNew = () => {}) => {
    let index, oldIndex
    let activeFunc = activeFuncNew, removeFunc = removeFuncNew
    
    const setDeactive = () => {
        removeFunc(oldIndex)
    }

    const setActive = (newIndex) => {
        oldIndex = index
        index = newIndex
        if (index >= 0)
            activeFunc(index)
        removeFunc(oldIndex)
    }

    setActive(newIndex)
    
    return {
        setIndex: (newIndex) => {
            if (newIndex === index) return false
            setActive(newIndex)
        },
        setDeactive,
        setActiveFunc: (activeFuncNew) => {
            activeFunc = activeFuncNew
        },
        setRemoveFunc: (removeFuncNew) => {
            removeFunc = removeFuncNew
        }
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
        let swappingIndex = 0
        let controlIndex = controlClassNameSort('active', 0)
        let controlIndexCompare = controlClassNameSort('active', -1)
        let controlIndexSwap = controlClassNameSort('swapping', -1)
        interval1 = setInterval(() => {
            if (swapping >= 1) {
                if (swapping === 1) {
                    swapping = 2
                    controlIndexCompare.setIndex(swappingIndex)
                    controlIndexSwap.setIndex(index1)
                } else if (swapping === 2) {
                    swapping = 3
                    controlIndexSwap.setIndex(swappingIndex)
                    dispatch(dataVisualStateAction.restoreData([...newData]))
                } else if (swapping === 3) {
                    swapping = 4
                    controlIndexSwap.setIndex(-1)
                } else {
                    swapping = false
                    controlIndexCompare.setIndex(-1)
                    sorted = false
                }
            } else {
                sorted = false
                if (newData[index1 + 1] && newData[index1] > newData[index1 + 1]) {
                    let temp = newData[index1]
                    newData[index1] = newData[index1 + 1]
                    newData[index1 + 1] = temp
                    sorted = true
                    swapping = 1
                    swappingIndex = index1 + 1
                    controlIndexCompare.setIndex(index1 + 1)
                }
                if (!sorted) {
                    index1 += 1
                    controlIndex.setIndex(index1)
                    if (index1 >= length - index2 - 1) {
                        index2 += 1;
                        index1 = 0;
                        controlIndex.setIndex(index1)
                    }
                    if (index2 >= length - 1) {
                        clearInterval(interval1)
                        controlIndex.setIndex(-1)
                        dispatch(settingsStateAction.setRunSorting(false))
                        dispatch(settingsStateAction.setEndSorting(new Date()))
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

const controlClassNameSort = (classNameTarget, newIndex, activeFuncNew = () => {}, removeFuncNew = () => {}) => {
    let index, oldIndex

    let activeFunc = activeFuncNew
    let removeFunc = removeFuncNew
    
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
        removeFunc(indexDeactive)
    }

    const setActive = (newIndex) => {
        if (newIndex === index) return false
        oldIndex = index
        index = newIndex
        if (index >= 0) {
            setActiveClassName(index, oldIndex, classNameTarget)
            activeFunc(index)
        }
        if (oldIndex >= 0)
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

const recursiveQuickSort = (objectIndexSort, newData, speed, pivot, start = 0) => {
    return (dispatch, getState) => {
        if (start > pivot) return false
        let i = start - 1;
        let j = start;
        let length = newData.length - 1
        let temp
        let swapping = false
        if (!pivot) pivot = length
        if (checkIsSorted(newData, start, pivot)) return false
        let activeFunc = () => {
            objectIndexSort.lengthIndex += 1
        }
        let removeFunc = () => {
            objectIndexSort.lengthIndex -= 1
        }
        let controlIndex = controlClassNameSort('active', -1, activeFunc, removeFunc)
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
                controlIndex.setIndex(-1)
                controlIndexCompare.setIndex(-1)
                controlSwapping.setIndex(-1)
                if ((i - start) >= 1) 
                    nextI = i === (start - 1) ? parseInt(pivot / 2) : i
                    dispatch(recursiveQuickSort(objectIndexSort, newData, speed, nextI, 0))
                if ((pivot - i) >= 1) {
                    nextI = i === (start) ? start + 1 : i
                    dispatch(recursiveQuickSort(objectIndexSort, newData, speed, pivot, nextI))
                }
                if (objectIndexSort.lengthIndex === 0) {
                    dispatch(settingsStateAction.setRunSorting(false))
                    dispatch(settingsStateAction.setEndSorting(new Date()))
                }
                else 
                    dispatch(settingsStateAction.setRunSorting(true))
            }
        }, speed)
    }
}


const sortingDataQuickSort = (speed) => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualState } = state
        let newData = dataVisualState.filter((item) => Object.assign({}, item))
        let objectIndexSort = {
            lengthIndex: 0
        }
        if (checkIsSorted(newData, 0, newData.length - 1)) {
            dispatch(settingsStateAction.setEndSorting(new Date()))
        } else {
            dispatch(recursiveQuickSort(objectIndexSort, newData, speed, ))
        }
    }
}

const sortingDataInsertionSort = (speed) => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualState } = state
        let newData = dataVisualState.filter((item) => Object.assign({}, item))
        let temp
        let checkLoop
        let controlIndex = controlClassNameSort("active", 0)
        let controlIndexCompare = controlClassNameSort("active", -1)
        let controlSwapping = controlClassNameSort("swapping", -1)
        let swap = false
        let j
        let i = 0
        let interval
        let changeIndex
        let swappingJ = false
        interval = setInterval(() => {
            if (swap) {
                if (swap === 1) {
                    swap = 2
                    controlIndexCompare.setIndex(changeIndex + 1)
                } else if (swap === 2) {
                    swap = 3
                    controlSwapping.setIndex(changeIndex)
                } else if (swap === 3) {
                    swap = 4
                    controlSwapping.setIndex(changeIndex + 1)
                    if (swappingJ) {
                        if (newData[j] && newData[j] > newData[j + 1]) {
                            temp = newData[j]
                            newData[j] = newData[j + 1]
                            newData[j + 1] = temp
                            j --
                        }
                    }
                    dispatch(dataVisualStateAction.restoreData([...newData]))
                } else if (swap === 4) {
                    swap = 5
                    controlSwapping.setIndex(-1)
                } else if (swap === 6) {
                    swap = 1
                    controlIndex.setIndex(j)
                } else {
                    controlIndexCompare.setIndex(-1)
                    if (newData[j] && newData[j] > newData[j + 1]) {
                      
                        changeIndex = j
                        swap = 6
                        swappingJ = true
                    } else {
                        swappingJ = false
                        swap = false
                        j = -1
                    }
                }
            } else {
                controlIndex.setIndex(i)
                if (newData[i] > newData[i + 1]) {
                    temp = newData[i]
                    newData[i] = newData[i + 1]
                    newData[i + 1] = temp
                    checkLoop = true
                    j = i - 1
                    swap = 1
                    changeIndex = i
                }
                i ++
                if (i >= newData.length) {
                    clearInterval(interval)
                    controlIndex.setIndex(-1)
                    dispatch(settingsStateAction.setRunSorting(false))
                    dispatch(settingsStateAction.setEndSorting(new Date()))
                }
            }
            
        }, speed)
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
        } else if (type === SORT_TYPE.INSERT_SORT) {
            dispatch(sortingDataInsertionSort(speed))
        }

    }
}