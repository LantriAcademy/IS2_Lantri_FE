export default function reducer( state = {show: false, message: ""} , action){
    switch(action.type){
        case "SHOW":
            state = {
                show: true,
                message: ""
            }
            return state; 
        case "HIDE":
            state = {
                show: false,
                message: ""
            }
            return state;
        case "SHOWMESSAGE":
            state = {
                show: true,
                message: action.message
            }
            return state;
        default:
            return state;
    }
}