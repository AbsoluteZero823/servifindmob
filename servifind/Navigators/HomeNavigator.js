import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ServiceContainer from "../Screens/Services/ServiceContainer";
import SingleService from "../Screens/Services/SingleService";
import InquireForm from '../Screens/Others/InquireForm';
// import { Stack } from 'native-base';

const Stack = createStackNavigator()

function MyStack() {
    return (

        <Stack.Navigator>
            <Stack.Screen
                name='ServiceContainer'
                component={ServiceContainer}
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name='Service Details'
                component={SingleService}
                options={{
                    headerShown: true,
                    headerBackgroundContainerStyle: { backgroundColor: 'red' },
                    tabBarStyle: { backgroundColor: 'white' },
                    headerStyle: { backgroundColor: '#fdb6b1' },
                    tabBarActiveTintColor: '#fdb6b1',
                }}
            />
            <Stack.Screen
                name='Inquire Form'
                component={InquireForm}
                options={{
                    headerShown: true,
                    headerBackgroundContainerStyle: { backgroundColor: 'red' },
                    tabBarStyle: { backgroundColor: 'white' },
                    headerStyle: { backgroundColor: '#fdb6b1' },
                    tabBarActiveTintColor: '#fdb6b1',
                }}
            />

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />

}