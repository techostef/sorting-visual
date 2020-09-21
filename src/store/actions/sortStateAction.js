import ActionEnums from "../../enums/ActionEnums";

export const setIsSelected = (Id, isSelected) => ({
    type: ActionEnums.SORT_STATE_SET_IS_SELECTED, Id, isSelected
})

export const restoreData = (data) => ({
    type: ActionEnums.SORT_STATE_RESTORE_DATA, data
})
