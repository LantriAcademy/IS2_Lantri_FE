import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './Reducers'

const middleware = applyMiddleware(thunk, )//logger)

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, middleware)
const persistor = persistStore(store)
export default {store, persistor}
