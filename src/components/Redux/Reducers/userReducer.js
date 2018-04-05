export default function reducer( state = {token: "", id: "", foundationId: "", userType: ""} , action){
    switch(action.type){
        case "LOGIN":
            state = {
                token : action.token,
                id: action.id,
                foundationId: action.foundationId,
                userType: action.userType
            }
            return state; 
        case "LOGOFF":
            state = {}
            return state;
        case "GET":
            return state;
        default:
            return state;
    }
}