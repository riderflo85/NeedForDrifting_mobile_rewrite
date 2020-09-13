import { combineReducers } from 'redux';

import { userData } from './userData';
import { allServers } from './servers';
import { allTracks } from './tracks';

export default combineReducers({
    userData: userData,
    allServers: allServers,
    allTracks: allTracks,
});