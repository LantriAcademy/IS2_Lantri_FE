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
        default:
            return state;
    }
}
const Testing = (state = [], action ) =>{
    switch(action.type){
        case "KEEP":
            state[action.key] = action.value
            return true;
        case "DESTROY":
            state[action.key] = null;
            return true;
        case "GET":
            return state;
        default:
            return state;
    }
}

 
const fUNdationReducer = combineReducers({
    User,
    Testing
});
const store = createStore(fUNdationReducer);

store.dispatch({type: "KEEP", key:"Saludo", value:"Hola buen hombre, cómo está? "});
const response = store.dispatch({type: "GET", key:"Saludo"});

console.log(response);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
