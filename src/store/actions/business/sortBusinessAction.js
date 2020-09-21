import { batch } from "react-redux"
import * as sortStateAction from "../sortStateAction"

export const setAllIsSelected = (isSelected) => {
    return (dispatch, getState) => {
        const state = getState()
        const { sortState } = state
        let newSortState = sortState.map((item) => Object.assign({}, item, {
            isSelected: isSelected
        }))
        dispatch(sortStateAction.restoreData(newSortState))
    }
}

export const setIsSelected = (Id, isSelected) => {
    return (dispatch, getState) => {
        batch(() => {
            dispatch(setAllIsSelected(false))
            dispatch(sortStateAction.setIsSelected(Id, isSelected))
        })
    }
}