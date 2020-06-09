import { combineReducers } from 'redux'
import taskReducer from './taskReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    taskReducer,
    loginReducer
})