import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListServers from '../../../components/ManageServerEpic/ListServers';
// import DetailServer from '../../../components/ManageServerEpic/DetailServer';


const Stack = createStackNavigator();

export function ServerStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="All servers"
                component={ListServers}
                options={{
                    title: "Assetto Corsa",
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            />
            {/* <Stack.Screen
                name="Detail server"
                component={DetailServer}
                options={{
                    title: "Gérer votre serveur AC",
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            /> */}
        </Stack.Navigator>
    );
}