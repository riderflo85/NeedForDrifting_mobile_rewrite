import axios from 'axios';

import { loginUserDataAction } from '../../redux/actions';

export async function authenticateUser(dispatch, urlServer, userData, loadingCb, statusResponseCb) {
    try {
        const url = urlServer + "/api/v1/check_login";
        const response = await axios.get(url, {
            params: {
                username: userData.username,
                pwd: userData.password,
                api: userData.token
            }
        });

        loadingCb();

        if (!response.data.error) {
            dispatch(loginUserDataAction({
                username: userData.username,
                token: userData.token,
                isLogin: userData.stayConnected,
                urlServer: urlServer
            }));
        } else {
            statusResponseCb();
        }


    } catch (error) {
        console.log('error in the login request', error);
        console.log('data: ', urlServer, userData);
    }
}