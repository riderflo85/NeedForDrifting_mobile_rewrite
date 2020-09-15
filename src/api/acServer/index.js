import axios from 'axios';

import {
    loginUserDataAction,
    getAllServersAction,
    getAllTracksAction,
    runServerCmdAction,
    updateTrackAction,
} from '../../redux/actions';

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

export async function fetchServers(dispatch, urlServer, userData, loadingCb, statusResponseCb) {
    try {
        const url = urlServer + "/api/v1/get_servers";
        const response = await axios.get(url, {
            params: {
                username: userData.username,
                api: userData.token
            }
        });

        loadingCb();

        if (!response.data.error) {
            dispatch(getAllServersAction(response.data.servers));
        } else {
            // Display the error message to the user
            // statusResponseCb();
        }

    } catch (error) {
        console.log(error);
        loadingCb();
    }
}

export async function fetchTracks(dispatch, urlServer, userData, loadingCb) {
    try {
        const url = urlServer + "/api/v1/get_tracks";
        const response = await axios.get(url, {
            params: {
                username: userData.username,
                api: userData.token
            }
        });

        loadingCb();
        if (!response.data.error) {
            dispatch(getAllTracksAction(response.data.tracks));
        } else {

        }

    } catch (error) {
        console.log('fetchTracks', error);
        console.log(userData);
        loadingCb();
    }
}

export async function runCommand(dispatch, urlServer, userData, idServer, cmd, loadingCb, setStatusCb) {
    try {
        const url = urlServer + "/api/v1/run_command";
        const response = await axios.get(url, {
            params: {
                username: userData.username,
                api: userData.token,
                server_id: idServer,
                server_cmd: cmd
            }
        });

        loadingCb();

        if (response.data.state.check) {
            const newStatus = response.data.state.res === 'run' ? 'running' : 'stoping';

            dispatch(runServerCmdAction({
                idServer: idServer,
                status: newStatus
            }));

            setStatusCb(newStatus);

        } else {
            dispatch(runServerCmdAction({
                idServer: idServer,
                status: 'error'
            }));
            
            setStatusCb('error');
        }


    } catch (error) {
        console.log(error);
        loadingCb();
    }
}

export async function updateTrack(dispatch, urlServer, userData, idServer, idTrack, trackName, configTrack, maxClients, loadingCb) {
    try {
        const url = urlServer + "/api/v1/change_track";
        const response = await axios.get(url, {
            params: {
                username: userData.username,
                api: userData.token,
                server_id: idServer,
                track_id: idTrack,
                config_track: configTrack,
                max_clients: maxClients
            }
        });

        loadingCb();

        if (response.data.state) {
            dispatch(updateTrackAction({
                idServer: idServer,
                trackName: trackName
            }));

        } else {
            
        }


    } catch (error) {
        console.log(error);
        // loadingCb();
    }
}