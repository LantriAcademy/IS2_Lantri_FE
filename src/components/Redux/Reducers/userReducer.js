export default function reducer( state = {token: "", id: "", foundationId: "", email: "", userType: ""} , action){
    switch(action.type){
        case "LOGIN":
            state = {
                token : action.token,
                id: action.id,
                foundationId: action.foundationId,
                email: action.email,
                userType: action.userType
            }
            return state; 
        case "LOGOFF":
            state = {}
            return state;
        case "GET":
            return state;
        case "FoundationID":
            return {...state, foundationId: action.foundationId};
        default:
            return state;
    }
}