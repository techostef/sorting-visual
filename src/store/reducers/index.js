import { combineReducers } from 'redux'
import dataVisualState from './dataVisualState'
import settingsState from './settingsState'
import sortState from './sortState'

export default combineReducers({
  dataVisualState,
  settingsState,
  sortState,
})