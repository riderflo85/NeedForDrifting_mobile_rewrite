import { updateUserDataAction } from '../../../redux/actions';


function UpdateUserData(dispatch, username, urlServer, token, oldUserData) {
    let newData = {
        username: '',
        urlServer: '',
        token: ''
    };

    username === '' ? newData.username = oldUserData.username : newData.username = username;

    urlServer === '' ? newData.urlServer = oldUserData.urlServer : newData.urlServer = urlServer;

    token === '' ? newData.token = oldUserData.token : newData.token = token;

    dispatch(updateUserDataAction(newData));
}

export default UpdateUserData;