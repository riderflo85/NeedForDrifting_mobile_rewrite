import { LOGIN_USER_DATA, SAVE_USER_DATA } from '../actionsTypes';


const initialState = {
    username: "",
    urlServer: "",
    token: "",
    isLogin: false
};

export function userData(state=initialState, action) {
    let nexState;

    switch(action.type) {
        case LOGIN_USER_DATA:
            nexState = state;
            nexState.username = action.value.data.username;
            nexState.urlServer = action.value.data.urlServer;
            nexState.token = action.value.data.token;
            nexState.isLogin = action.value.data.isLogin;

            return nexState || state;

        case SAVE_USER_DATA:
            nexState = state;
            nexState.username = action.value.data.username;
            nexState.urlServer = action.value.data.urlServer;
            nexState.token = action.value.data.token;

            return nexState || state;

        default:
            return state;
    }
}