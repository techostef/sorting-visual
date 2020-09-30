import { combineReducers } from 'redux'
import dataVisualState from './dataVisualState'
import dataVisualSortedState from './dataVisualSortedState'
import settingsState from './settingsState'
import sortState from './sortState'

export default combineReducers({
  dataVisualState,
  dataVisualSortedState,
  settingsState,
  sortState,
})