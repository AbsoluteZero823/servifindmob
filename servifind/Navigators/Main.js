import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"


//Stacks
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                keyboardHidesTabBar: true,
                headerShown: false,
                // showLabel: true,
                headerBackgroundContainerStyle: { backgroundColor: 'red' },
                tabBarStyle: { backgroundColor: 'white' },
                headerStyle: { backgroundColor: 'red' },
                tabBarActiveTintColor: '#fdb6b1'
            }}
        >

            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{

                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />

                    )
                }}
            />
            <Tab.Screen
                name="Cart"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="shopping-cart"

                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Admin"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="cog"

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
                    tabBarIcon: ({ color }) => (
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