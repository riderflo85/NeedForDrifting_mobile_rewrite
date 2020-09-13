import { GET_ALL_SERVER } from '../actionsTypes';

/* ************************************** */
const initialState = [];
// [
//     {
//         id: "1",
//         name: "AC_NeedForDrifting_Débutant",
//         status: "running",
//         track: "Drift",
//     },
// ]
/* ************************************** */

export function allServers(state=initialState, action) {

    switch(action.type) {
        case GET_ALL_SERVER:
            return action.value.data || state;
        
        default:
            return state;
    }
}