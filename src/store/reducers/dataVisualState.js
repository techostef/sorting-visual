import ActionEnums from '../../enums/ActionEnums'

const init = []

const dataVisualState = (state = init, action) => {
    switch(action.type) {
        case ActionEnums.DATA_VISUAL_STATE_RESTORE_DATA:
            return action.data
        default: 
            return state
    }
}

export default dataVisualState