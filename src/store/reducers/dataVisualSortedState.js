import ActionEnums from '../../enums/ActionEnums'

const init = []

const dataVisualSortedState = (state = init, action) => {
    switch(action.type) {
        case ActionEnums.DATA_VISUAL_SORTED_STATE_RESTORE_DATA:
            return action.data
        default: 
            return state
    }
}

export default dataVisualSortedState