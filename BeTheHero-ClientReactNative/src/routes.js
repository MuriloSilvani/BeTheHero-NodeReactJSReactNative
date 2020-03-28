import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';
import Chat from './pages/Chat';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>


                <Stack.Screen name='Incidents' component={Incidents} />
                <Stack.Screen name='Detail' component={Detail} />
                <Stack.Screen name='Chat' component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
