import ActionEnums from '../../enums/ActionEnums'

// const init = [30, 11, 63, 64, 66, 68]
// const init = [63, 11, 30, 64, 66, 68]
// -------------------------------------------------------
// const init = [8, 15, 22, 60, 76, 82, 89, 117, 119, 149, 22, 60, 117, 149, 152, 157, 193, 237, 245, 246]
// -------------------------------------------------------
// const init = [19, 207, 41, 87, 99, 130, 238, 94, 232, 187]
// const init = [19, 207, 41, 87, 99, 130, 238, 94, 187, 232]
// -------------------------------------------------------
// const init = [30, 23, 40, 11, 36, 64, 69, 85, 93, 45]
// const init = [23, 30, 40, 11, 36, 64, 69, 85, 45, 93]
// -------------------------------------------------------
const init = [38, 27, 43, 3, 9, 82, 10]
// const init = [27, 38, 3, 43, 9, 82, 10]
// const init = [3, 27, 38, 43, 9, 10, 82]
// -------------------------------------------------------
// const init = [10, 80, 30, 90, 40, 50, 70]
// const init = [10, 30, 40, 50, 80, 90, 70]
// const init = [10, 30, 40, 50, 70, 80, 90]
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