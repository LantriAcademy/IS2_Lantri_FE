export default function reducer( state = {token: "", id: "", foundationId: "", type: ""} , action){
    switch(action.type){
        case "LOGIN":
            state = {
                token : action.token,
                id: action.id,
                foundationId: action.foundationId,
                type: action.type
            }
            return state; 
        case "LOGOFF":
            state = {}
            return true;
        case "isLogged":
            if(state.token != null){
                return true;
            }
            return false;
        default:
            return state;
       
    }
}