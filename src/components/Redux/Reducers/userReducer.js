export default function reducer( state = {token: "", id: "", foundationId: ""} , action){
    switch(action.type){
        case "LOGIN":
            state = {
                token : action.token,
                id: action.id,
                foundationId: action.foundationId
            }
            return state; 
        break;
        case "LOGOFF":
            state = {}
            return true;
        break;
        default:
            return state;
    }
}