import ActionEnums from '../../enums/ActionEnums'
import _ from "lodash"

const init = {
    dataSorted: false,
    endSorting: null,
    indexSort: {},
    lengthIndexSort: 0,
    maxArray: 10,
    maxValue: 250,
    runSorting: false,
    speed: 1,
    startSorting: null,
    swapping: {},
}

const settingsState = (state = init, action) => {
    switch(action.type) {
        case ActionEnums.SETTINGS_STATE_SET_END_SORTING:
            return Object.assign({}, state, {
                endSorting: action.endSorting
            })
        case ActionEnums.SETTINGS_STATE_SET_DATA_SORTED:
            return Object.assign({}, state, {
                dataSorted: action.dataSorted
            })
        case ActionEnums.SETTINGS_STATE_SET_INDEX_SORT:
            return Object.assign({}, state, {
                indexSort: parseInt(action.indexSort)
            })
        case ActionEnums.SETTINGS_STATE_ADD_INDEX_SORT:
            if (action.indexSort >= 0)
                return Object.assign({}, state, {
                    indexSort: Object.assign({}, state.indexSort, { 
                        [action.indexSort]: action.indexSort
                    }),
                    lengthIndexSort: state.lengthIndexSort + 1,
                })
            else
                return state
        case ActionEnums.SETTINGS_STATE_REMOVE_INDEX_SORT:
            if (action.indexSort >= 0)
                return Object.assign({}, state, {
                    indexSort: _.omit(state.indexSort, action.indexSort),
                    lengthIndexSort: state.lengthIndexSort - 1,
                })
            else
                return state
        case ActionEnums.SETTINGS_STATE_ADD_SWAPPING:
            if (action.swapping >= 0)
                return Object.assign({}, state, {
                    swapping: Object.assign({}, state.swapping, { 
                        [action.swapping]: action.swapping
                    })
                })
            else
                return state
        case ActionEnums.SETTINGS_STATE_REMOVE_SWAPPING:
            if (action.swapping >= 0)
                return Object.assign({}, state, {
                    swapping: _.omit(state.swapping, action.swapping)
                })
            else
                return state
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