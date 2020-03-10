import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import users from './user'
export default combineReducers({
  todos,
  visibilityFilter,
  users
})