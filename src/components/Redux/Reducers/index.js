import { combineReducers } from 'redux'

import user from './userReducer'
import loading from './loadingReducer'

export default combineReducers({
    user,
    loading
})