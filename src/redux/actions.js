import { LOGIN_USER_DATA, SAVE_USER_DATA } from './actionsTypes';

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