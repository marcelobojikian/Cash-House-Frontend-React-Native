import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import NewTransaction from './pages/Transactions/New';
import CreatedTransaction from './pages/Transactions/Created';
import SendedTransaction from './pages/Transactions/Sended';
import DetailTransaction from './pages/Transactions/Detail';

import Transactions from './pages/Transactions';
import Sign from './pages/auth';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Sign" component={Sign} />
                <AppStack.Screen name="Transactions" component={Transactions} />

                <AppStack.Screen name="Detail" component={DetailTransaction} />
                <AppStack.Screen name="New" component={NewTransaction} />
                <AppStack.Screen name="Created" component={CreatedTransaction} />
                <AppStack.Screen name="Sended" component={SendedTransaction} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}