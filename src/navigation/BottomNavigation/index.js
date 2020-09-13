import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ServerStackScreen } from '../StacksNavigator/ServerStack';
import { SettingsStackScreen } from '../StacksNavigator/SettingsStack';


const bottomMenu = createBottomTabNavigator()

export function BottomMenu() {
    return (
        <bottomMenu.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Servers") {
                        iconName = 'server-network';

                    } else if (route.name === "Settings") {
                        iconName = 'account-edit';

                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#0d96d1',
                inactiveTintColor: '#a6a6a6',
            }}
        >
            <bottomMenu.Screen
                name="Servers"
                component={ServerStackScreen}
                options={{title: 'Serveurs'}}
            />
            <bottomMenu.Screen
                name="Settings"
                component={SettingsStackScreen}
                options={{title: 'Paramètres'}}
            />
        </bottomMenu.Navigator>
    );
    
}