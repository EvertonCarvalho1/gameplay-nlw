
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { SignIn } from '../screens/SignIn';
import { AuthRoutes } from './auth.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../global/styles/theme';

export function Routes() {
    const { user } = useAuth();
    const { Navigator, Screen } = createStackNavigator();

    return (
        <NavigationContainer>
            {user.id
                ?
                <AuthRoutes />
                :
                <Navigator
                    headerMode="none"
                    screenOptions={{
                        cardStyle: {
                            backgroundColor: theme.colors.secondary100
                        }
                    }}
                >
                    <Screen name="SignIn" component={SignIn} />
                </Navigator>
            }
        </NavigationContainer>
    )
}