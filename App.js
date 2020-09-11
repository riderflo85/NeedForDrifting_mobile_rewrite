import React from 'react';
import { Provider } from 'react-redux';

import Store from './src/redux/store';
import Login from './src/components/UserAccountEpic/Login/index';

export default function App() {
	return (
		<Provider store={Store}>
			<Login/>
		</Provider>
	);
}