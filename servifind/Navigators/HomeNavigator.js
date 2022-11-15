import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ServiceContainer from "../Screens/Services/ServiceContainer";
import SingleService from "../Screens/Services/SingleService";
// import { Stack } from 'native-base';

const Stack = createStackNavigator()

function MyStack() {
    return (

        <Stack.Navigator>
            <Stack.Screen
                name=' '
                component={ServiceContainer}
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name='Service Details'
                component={SingleService}
                options={{
                    headerShown: false,

                }}
            />

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />

}