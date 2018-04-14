import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { PersistGate } from 'redux-persist/integration/react'
import Store  from './components/Redux/store'
/* import persistor from './components/Redux/store' */
import { Provider } from 'react-redux'
/* console.log(store);
console.log(persistor); */

ReactDOM.render(
    <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
