import ActionEnums from "../../enums/ActionEnums";

export const addIndexSort = (indexSort) => ({
    type: ActionEnums.SETTINGS_STATE_ADD_INDEX_SORT, indexSort
})

export const addSwapping = (swapping) => ({
    type: ActionEnums.SETTINGS_STATE_ADD_SWAPPING, swapping
})

export const removeIndexSort = (indexSort) => ({
    type: ActionEnums.SETTINGS_STATE_REMOVE_INDEX_SORT, indexSort
})

export const removeSwapping = (swapping) => ({
    type: ActionEnums.SETTINGS_STATE_REMOVE_SWAPPING, swapping
})

export const setDataSorted = (dataSorted) => ({
    type: ActionEnums.SETTINGS_STATE_SET_DATA_SORTED, dataSorted
})

export const setEndSorting = (endSorting) => ({
    type: ActionEnums.SETTINGS_STATE_SET_END_SORTING, endSorting
})

export const setIndexSort = (indexSort) => ({
    type: ActionEnums.SETTINGS_STATE_SET_INDEX_SORT, indexSort
})

export const setIndexCompare = (indexCompare) => ({
    type: ActionEnums.SETTINGS_STATE_SET_INDEX_COMPARE, indexCompare
})

export const setSpeed = (speed) => ({
    type: ActionEnums.SETTINGS_STATE_SET_SPEED, speed
})

export const setMaxArray = (maxArray) => ({
    type: ActionEnums.SETTINGS_STATE_SET_MAX_ARRAY, maxArray
})

export const setMaxValue = (maxValue) => ({
    type: ActionEnums.SETTINGS_STATE_SET_MAX_VALUE, maxValue
})

export const setRunSorting = (runSorting) => ({
    type: ActionEnums.SETTINGS_STATE_SET_RUN_SORTING, runSorting
})

export const setStartSorting = (startSorting) => ({
    type: ActionEnums.SETTINGS_STATE_SET_START_SORTING, startSorting
})

export const setSwapping = (swapping) => ({
    type: ActionEnums.SETTINGS_STATE_SET_SWAPPING, swapping
})