import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './Reducers'

const middleware = applyMiddleware(thunk, logger)

export default createStore(reducer, middleware)
