import ActionEnums from '../../enums/ActionEnums'

// const init = [30, 11, 63, 64, 66, 68]
// const init = [63, 11, 30, 64, 66, 68]
const init = [23, 30, 11, 64, 66, 64, 69, 85, 93, 100]
// const init = [27, 74, 66, 67, 23]
// const init = [10, 30, 50, 40]

const dataVisualState = (state = init, action) => {
    switch(action.type) {
        case ActionEnums.DATA_VISUAL_STATE_RESTORE_DATA:
            return action.data
        default: 
            return state
    }
}

export default dataVisualState