import ActionEnums from '../../enums/ActionEnums'

const init = {
    endSorting: null,
    indexSort: 0,
    indexCompare: 0,
    maxArray: 10,
    maxValue: 250,
    runSorting: false,
    speed: 1,
    startSorting: null,
    swapping: false,
}

const settingsState = (state = init, action) => {
    switch(action.type) {
        case ActionEnums.SETTINGS_STATE_SET_END_SORTING:
            return Object.assign({}, state, {
                endSorting: action.endSorting
            })
        case ActionEnums.SETTINGS_STATE_SET_INDEX_SORT:
            return Object.assign({}, state, {
                indexSort: parseInt(action.indexSort)
            })
        case ActionEnums.SETTINGS_STATE_SET_INDEX_COMPARE:
            return Object.assign({}, state, {
                indexCompare: parseInt(action.indexCompare)
            })
        case ActionEnums.SETTINGS_STATE_SET_SPEED:
            return Object.assign({}, state, {
                speed: action.speed
            })
        case ActionEnums.SETTINGS_STATE_SET_MAX_ARRAY:
            return Object.assign({}, state, {
                maxArray: action.maxArray
            })
        case ActionEnums.SETTINGS_STATE_SET_MAX_VALUE:
            return Object.assign({}, state, {
                maxValue: action.maxValue
            })
        case ActionEnums.SETTINGS_STATE_SET_RUN_SORTING:
            return Object.assign({}, state, {
                runSorting: action.runSorting
            })
        case ActionEnums.SETTINGS_STATE_SET_START_SORTING:
            return Object.assign({}, state, {
                startSorting: action.startSorting
            })
        case ActionEnums.SETTINGS_STATE_SET_SWAPPING:
            return Object.assign({}, state, {
                swapping: action.swapping
            })
        default: 
            return state
    }
}

export default settingsState