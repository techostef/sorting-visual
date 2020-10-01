import { SORT_TYPE } from "../../../enums/DataEnums"
import * as dataVisualStateAction from "../dataVisualStateAction"
import * as dataVisualSortedStateAction from "../dataVisualSortedStateAction"
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
        dispatch(dataVisualSortedStateAction.restoreData(data))
        dispatch(settingsStateAction.setDataSorted(false))
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

const getPathMergeSort = (arr, newData, start, end, loop = 0) => {
    return (dispatch, getState) => {
        if (!start) start = 0
        if (!end) end = newData.length - 1
        const gap = end - start
        if (!arr[loop]) {
            arr[loop] = []
        }
        arr[loop].push({
            start,
            end,
        })

        if (gap > 1) {
            let middle = parseInt(gap / 2)
            dispatch(getPathMergeSort(arr, newData, start, middle + start, loop + 1))
            dispatch(getPathMergeSort(arr, newData, (middle + 1) + start, end, loop + 1))
        }
    }
}

const recursiveMergeSort1 = (arr, newData, start, end, position = 'main', loop = 0, parentStart, parentEnd) => {
    return (dispatch, getState) => {
        if (!start) start = 0
        if (!end) end = newData.length - 1
        const gap = end - start
        let temp
        if (!arr[loop]) {
            arr[loop] = []
        }
        arr[loop].push({
            start,
            end,
        })
        
        let swapping = -1

        let interval
        let controlIndex = controlClassNameSort("active", -1)
        let controlIndexCompare = controlClassNameSort("active", -1)
        let controlSwapping = controlClassNameSort("swapping", -1)

        const funcFinish = () => {
            dispatch(recursiveMergeSort2(arr, [...newData]))
        }

        if (gap > 1) {
            let middle = parseInt(gap / 2)
            dispatch(recursiveMergeSort1(arr, newData, start, middle + start, 'left', loop + 1, start, end))
            dispatch(recursiveMergeSort1(arr, newData, (middle + 1) + start, end, 'right', loop + 1, start, end))
        } else if (gap === 1) {
            interval = setInterval(() => {
                if (swapping >= 0) {
                    // console.log("swapping", start, end)
                    if (swapping === 1) {
                        controlSwapping.setIndex(start)
                        swapping = 2
                    } else if (swapping === 2) {
                        controlSwapping.setIndex(end)
                        dispatch(dataVisualStateAction.restoreData([...newData]))
                        swapping = 3
                    } else if (swapping === 3) {
                        controlSwapping.setIndex(-1)
                        swapping = 4
                    } else {
                        controlIndex.setIndex(-1)
                        controlIndexCompare.setIndex(-1)
                        swapping = -1
                        clearInterval(interval)
                        if (start === arr[0][0].end - 1 && end === arr[0][0].end) {
                            funcFinish()
                        }
                    }
                } else {
                    if (newData[start] > newData[end]) {
                        temp = newData[start]
                        newData[start] = newData[end]
                        newData[end] = temp
                        swapping = 1
                        controlIndex.setIndex(start)
                        controlIndexCompare.setIndex(end)
                    } else {
                        clearInterval(interval)
                        if (start === arr[0][0].end - 1 && end === arr[0][0].end) {
                            funcFinish()
                        }
                    }
                    
                }
            }, 1000)
        } else if (gap === 0) {
            if (start === arr[0][0].end && end === arr[0][0].end) {
                funcFinish()
            }
        }
    }
}

const recursiveMergeSort2 = (speed, arr, newData, loop) => {
    return (dispatch, getState) => {
        if (loop >= 0) {} else loop = arr.length - 1
        if (!arr[loop] || arr[loop].length === 1) {
            dispatch(settingsStateAction.setRunSorting(false))
            return false
        }
        let controlIndex = controlClassNameSort("active", -1)
        let controlIndexCompare = controlClassNameSort("active", -1)
        let controlSwapping = controlClassNameSort("swapping", -1)
        let index, indexCompare
        let i
        let i1 = -1, end1
        let i2, end2 = -1
        let newDataTemp = [...newData]
        let j = 0
        let swapping = -1
        let swappingStep
        let interval = setInterval(() => {
            if (j >= arr[loop].length) {
                clearInterval(interval)
                dispatch(recursiveMergeSort2(speed, arr, [...newData], loop - 1))
            } else {
                if (i1 >= 0 && end2 >= 0) {
                    if (i < end2) {
                        if (swapping >= 0) {
                            if (swapping === 1) {
                                swapping = 2
                                controlSwapping.setIndex(index)
                            } else if (swapping === 2) {
                                swapping = 3
                                controlSwapping.setIndex(indexCompare)
                                dispatch(dataVisualStateAction.restoreData([...newData]))
                            } else if (swapping === 3) {
                                controlSwapping.setIndex(-1)
                                swapping = -1
                                if (i === end2 - 1) {
                                    swapping = 4
                                    newData[i + 1] = newDataTemp[index]
                                } else {
                                    swapping = 7
                                }
                                
                            }else if (swapping === 4) {
                                controlSwapping.setIndex(indexCompare)
                                swapping = 5
                            } else if (swapping === 5) {
                                controlSwapping.setIndex(index)
                                dispatch(dataVisualStateAction.restoreData([...newData]))
                                swapping = 6
                            } else if (swapping === 6) {
                                controlSwapping.setIndex(-1)
                                swapping = 7
                            } else if (swapping === 7) {
                                swapping = -1
                                if (newDataTemp[i1] >= newDataTemp[i2]) {
                                    i2++
                                    if (i2 > end2) {
                                        i++
                                        while(i1 <= end1) {
                                            newData[i] = newDataTemp[i1]
                                            i1++
                                            i++
                                        }
                                    }
                                }
                                else if (newDataTemp[i2] >= newDataTemp[i1]) {
                                    i1++
                                    if (i1 > end1) {
                                        i++
                                        while(i2 <= end2) {
                                            newData[i] = newDataTemp[i2]
                                            i2++
                                            i++
                                        }
                                    }
                                }
                                dispatch(dataVisualStateAction.restoreData([...newData]))
                                i++
                            }
                        } else {
                           
                            if (newDataTemp[i1] >= newDataTemp[i2]) {
                                objSwap = {index1: i1, index2: i2}
                                swappingStep(objSwap)
                                i1 = objSwap.index1
                                i2 = objSwap.index2
                            } else if (newDataTemp[i2] >= newDataTemp[i1]) {
                                objSwap = {index1: i2, index2: i1}
                                swappingStep(objSwap)
                                i2 = objSwap.index1
                                i1 = objSwap.index2
                            }
                            dispatch(dataVisualStateAction.restoreData([...newData]))
                            i++
                        }
                    } else {
                        j += 2
                        i1 = end2 = -1
                    }
                } else {
                    i1 = arr[loop][j].start
                    end1 = arr[loop][j].end
                    i = i1       

                    i2 = arr[loop][j + 1].start 
                    end2 = arr[loop][j + 1].end
                    var objSwap
                    swappingStep = (data) => {
                        swapping = 1
                        index = data.index1
                        indexCompare = data.index2
                        controlIndex.setIndex(data.index2)
                        controlIndexCompare.setIndex(data.index1)
                        newData[i] = newDataTemp[data.index2]
                        i--
                    }
                }
            }
            console.log("interval loop", loop)
        }, speed)
    }
}

const sortingDataMergeSort = (speed) => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualState } = state
        let newData = dataVisualState.filter((item) => Object.assign({}, item))
        let temp
        let controlIndex = controlClassNameSort("active", -1)
        let controlIndexCompare = controlClassNameSort("active", -1)
        let controlSwapping = controlClassNameSort("swapping", -1)
        // let arr = [[{"start":0,"end":19}],[{"start":0,"end":9},{"start":10,"end":19}],[{"start":0,"end":4},{"start":5,"end":9},{"start":10,"end":14},{"start":15,"end":19}],[{"start":0,"end":2},{"start":3,"end":4},{"start":5,"end":7},{"start":8,"end":9},{"start":10,"end":12},{"start":13,"end":14},{"start":15,"end":17},{"start":18,"end":19}],[{"start":0,"end":1},{"start":2,"end":2},{"start":5,"end":6},{"start":7,"end":7},{"start":10,"end":11},{"start":12,"end":12},{"start":15,"end":16},{"start":17,"end":17}]]
        // dispatch(recursiveMergeSort2(arr, newData, 4))
        let arr = []
        // dispatch(getPathMergeSort(arr, newData))
        dispatch(getPathMergeSort(arr, newData))
        let index
        let indexCompare
        let swapping = -1
        let i = 0
        let loop = arr.length - 1
        let interval = setInterval(() => {
            if (i >= arr[loop].length) {
                if (loop === 0) {
                    clearInterval(interval)
                    dispatch(recursiveMergeSort2(speed, arr, [...newData], arr.length - 1))
                } else {
                    i = 0;
                    loop -= 1
                    controlIndex.setIndex(-1)
                    controlIndexCompare.setIndex(-1)
                    controlSwapping.setIndex(-1)
                }
            } else {
                if (swapping >= 0) {
                    if (swapping === 1) {
                        swapping = 2
                        controlSwapping.setIndex(index)
                    } else if (swapping === 2) {
                        swapping = 3
                        controlSwapping.setIndex(indexCompare)
                        dispatch(dataVisualStateAction.restoreData([...newData]))
                    } else {
                        swapping = -1
                        controlSwapping.setIndex(-1)
                    }
                } else {
                    index = arr[loop][i].start
                    indexCompare = arr[loop][i].end
                    if (indexCompare - index === 1) {
                        controlIndexCompare.setIndex(indexCompare)
                        controlIndex.setIndex(index)
                        if (newData[index] > newData[indexCompare]) {
                            swapping = 1
                            temp = newData[index]
                            newData[index] = newData[indexCompare]
                            newData[indexCompare] = temp
                        }
                    }
                    i ++
                }
            }
        }, speed)

    }
}

export const sortingDataVisual = () => {
    return (dispatch, getState) => {
        const state = getState()
        const { dataVisualSortedState, settingsState, sortState } = state
        const selectedSortItem = sortState.find((item) => item.isSelected)
        let speed = settingsState.speed * 10
        dispatch(settingsStateAction.setRunSorting(true))
        dispatch(settingsStateAction.setStartSorting(new Date()))
        let newDataSorted = [...dataVisualSortedState]
        dispatch(recursiveQuickSortA(newDataSorted))
        dispatch(dataVisualSortedStateAction.restoreData(newDataSorted))
        dispatch(settingsStateAction.setDataSorted(true))
        const type = selectedSortItem && selectedSortItem.name
        if (type === SORT_TYPE.BUBLE_SORT) {
            dispatch(sortingDataBubleSort(speed))
        } else if (type === SORT_TYPE.QUICK_SORT) {
            dispatch(sortingDataQuickSort(speed))
        } else if (type === SORT_TYPE.INSERT_SORT) {
            dispatch(sortingDataInsertionSort(speed))
        } else if (type === SORT_TYPE.MERGE_SORT) {
            dispatch(sortingDataMergeSort(speed))
        }

    }
}