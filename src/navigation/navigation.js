import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { BottomMenu } from './BottomNavigation';


function BottomNavigation() {
    return (
        <NavigationContainer>
            <BottomMenu/>
        </NavigationContainer>
    );
}

export default BottomNavigation;