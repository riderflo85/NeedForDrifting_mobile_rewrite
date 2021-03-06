import { GET_ALL_SERVER, RUN_SERVER_CMD, CHANGE_TRACK } from '../actionsTypes';

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
    let nexState;

    switch(action.type) {

        case GET_ALL_SERVER:
            return action.value.data || state;

        case RUN_SERVER_CMD:
            nexState = state.map(server => {
                if (server.id === action.value.data.idServer) {
                    return {
                        id: server.id,
                        name: server.name,
                        status: action.value.data.status,
                        track: server.track
                    };
                } else {
                    return server;
                }
            });

            return nexState || state;

        case CHANGE_TRACK:
            nexState = state.map(server => {
                if (server.id === action.value.data.idServer) {
                    return {
                        id: server.id,
                        name: server.name,
                        status: server.status,
                        track: action.value.data.trackName
                    };
                } else {
                    return server;
                }
            });

            return nexState || state;

        default:
            return state;
    }
}