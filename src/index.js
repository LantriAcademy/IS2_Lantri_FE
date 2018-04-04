import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import { fUNdationReducer } from './components/Redux/reducers';
import { combineReducers } from 'redux'

const User = (state={}, action) =>{
    switch(action.type){
        case "LOGIN":
            state = {
                "token" : action.token,
                "id": action.id,
                "foundationId": action.foundationId
            } 
        break;
        case "LOGOFF":
            state = {}
        break;
    }
    return state;  
}

 
const fUNdationReducer = combineReducers({
    User
});
const store = createStore(fUNdationReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
