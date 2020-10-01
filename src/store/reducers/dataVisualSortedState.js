import ActionEnums from '../../enums/ActionEnums'

const init = [152, 232, 233, 233, 45, 119, 30, 82, 67, 160]

const dataVisualSortedState = (state = init, action) => {
    switch(action.type) {
        case ActionEnums.DATA_VISUAL_SORTED_STATE_RESTORE_DATA:
            return action.data
        default: 
            return state
    }
}

export default dataVisualSortedState