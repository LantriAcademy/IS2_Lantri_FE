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
export default fUNdationReducer;