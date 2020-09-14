import {
    LOGIN_USER_DATA,
    SAVE_USER_DATA,
    GET_ALL_SERVER,
    GET_ALL_TRACKS,
    RUN_SERVER_CMD
} from './actionsTypes';


export function loginUserDataAction(data) {
    return {
        type: LOGIN_USER_DATA,
        value: { data: data }
    };
}

export function saveUserDataAction(data) {
    return {
        type: SAVE_USER_DATA,
        value: { data: data }
    };
}

export function getAllServersAction(data) {
    return {
        type: GET_ALL_SERVER,
        value: { data: data }
    };
}

export function getAllTracksAction(data) {
    return {
        type: GET_ALL_TRACKS,
        value: { data: data }
    };
}

export function runServerCmdAction(data) {
    return {
        type: RUN_SERVER_CMD,
        value: { data: data }
    };
}