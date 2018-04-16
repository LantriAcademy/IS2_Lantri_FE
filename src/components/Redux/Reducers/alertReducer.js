export default function reducer( state = {show: false, message: "", typeAlert: ""} , action){
    switch(action.type){
        case "SHOWALERT":
            state = {
                show: true,
                message: action.message,
                typeAlert: action.typeAlert
            }
            return state; 
        case "HIDEALERT":
            return {...state, show:false}
        default:
            return state;
    }
}