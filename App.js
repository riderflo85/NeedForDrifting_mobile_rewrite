import React from 'react';
import { Provider } from 'react-redux';

import Store from './src/redux/store';
// For test
import Login from './src/components/UserAccountEpic/Login';
import ListServers from './src/components/ManageServerEpic/ListServers';
import Settings from './src/components/UserAccountEpic/Settings';
//

export default function App() {
	return (
		<Provider store={Store}>
			<Settings/>
		</Provider>
	);
}