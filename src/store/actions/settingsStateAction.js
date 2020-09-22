import ActionEnums from "../../enums/ActionEnums";

export const setEndSorting = (endSorting) => ({
    type: ActionEnums.SETTINGS_STATE_SET_END_SORTING, endSorting
})

export const setIndexSort = (indexSort) => ({
    type: ActionEnums.SETTINGS_STATE_SET_INDEX_SORT, indexSort
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