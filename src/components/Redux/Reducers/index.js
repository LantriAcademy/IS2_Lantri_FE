import { combineReducers } from 'redux'

import user from './userReducer'
import loading from './loadingReducer'
import alert from './alertReducer'
export default combineReducers({
    user,
    loading,
    alert
})