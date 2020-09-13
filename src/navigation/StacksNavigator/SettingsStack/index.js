import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../../../components/UserAccountEpic/Settings';


const Stack = createStackNavigator();

export function SettingsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Informations personnelles',
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}