import { LOGIN_USER_DATA, SAVE_USER_DATA, UPDATE_USER_DATA } from '../actionsTypes';


// const initialState = {
//     username: "",
//     urlServer: "",
//     token: "",
//     isLogin: false
// };

// For test in dev
const initialState = {
    username: "admin",
    urlServer: "http://192.168.1.17:8000",
    token: "Ihzt3xi5R5jqCMgVVi9UMwmi",
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

        case UPDATE_USER_DATA:
            nexState = state;
            nexState.username = action.value.data.username;
            nexState.urlServer = action.value.data.urlServer;
            nexState.token = action.value.data.token;
            nexState.isLogin = true;

            return nexState || state;

        default:
            return state;
    }
}