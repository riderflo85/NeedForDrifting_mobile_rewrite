import { GET_ALL_TRACKS } from '../actionsTypes';


const initialState = [];

export function allTracks(state=initialState, action) {

    switch(action.type) {
        case GET_ALL_TRACKS:
            return action.value.data || state;
        
        default:
            return state;
    }
}