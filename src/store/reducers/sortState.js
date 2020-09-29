import ActionEnums from '../../enums/ActionEnums'
import { SORT_TYPE } from '../../enums/DataEnums'

const init = [
    {
        Id: 1,
        isSelected: false,
        name: SORT_TYPE.BUBLE_SORT,
    },
    {
        Id: 2,
        isSelected: false,
        name: SORT_TYPE.QUICK_SORT,
    },
    {
        Id: 3,
        isSelected: false,
        name: SORT_TYPE.INSERT_SORT,
    },
    {
        Id: 4,
        isSelected: true,
        name: SORT_TYPE.MERGE_SORT
    },
]

const settings = (state = init, action) => {
    let newState = [], index
    switch(action.type) {
        case ActionEnums.SORT_STATE_SET_IS_SELECTED:
            newState = [...state]
            index = state.findIndex((item) => item.Id === action.Id)
            newState[index] = Object.assign({}, newState[index], {
                isSelected: action.isSelected
            })
            return newState
        case ActionEnums.SORT_STATE_RESTORE_DATA:
            return action.data
        default: 
            return state
    }
}

export default settings