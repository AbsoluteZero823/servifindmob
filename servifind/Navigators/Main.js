import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Dimensions} from 'react-native';
// import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"


//Stacks
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import InquiriesNavigator from './InquiriesNavigator';
// const context = useContext(AuthGlobal);
var { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                keyboardHidesTabBar: true,
                headerShown: true,
                // showLabel: true,
        
                headerBackgroundContainerStyle: { backgroundColor: 'red' },
                tabBarStyle: { backgroundColor: 'white', height: height*0.07 },
                headerStyle: { backgroundColor: '#fdb6b1' },
                tabBarActiveTintColor: '#fdb6b1',
                
            }}
        >

            <Tab.Screen
                name='Home'
                
                component={HomeNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />

                    )
                }}
            />
            <Tab.Screen
                name="Inquiries"
                component={InquiriesNavigator}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="clipboard"

                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Message"
                component={HomeNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="envelope"

                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={UserNavigator}
                
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color}) => (
                        <Icon
                            name="user"

                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main;