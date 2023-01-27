import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Inquiries from '../Screens/User/Inquiries';
import ServiceContainer from "../Screens/Services/ServiceContainer";
// import SingleService from "../Screens/Services/SingleService";
// import { Stack } from 'native-base';

const Stack = createStackNavigator()

function MyStack() {
    return (

        <Stack.Navigator>
          
            {/* <Stack.Screen
                name='Service Details'
                component={SingleService}
                options={{
                    headerShown: false,

                }}
            /> */}

        </Stack.Navigator>
    )
}

export default function InquiriesNavigator() {
    return <MyStack />

}