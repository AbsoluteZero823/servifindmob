import React, {useContext}from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import {Dimensions} from 'react-native';
import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import AuthGlobal from "../Context/store/AuthGlobal";


var { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();

function MyStack() {
    const context = useContext(AuthGlobal)
    return (
        
        <Stack.Navigator>
            {context.stateUser.isAuthenticated === true ? (
             <Stack.Screen
             name="User Profile"
             component={UserProfile}
             options={{
                headerStyle: { backgroundColor: '#fdb6b1' },
                 headerShown: true
             }}
            />
     
            ) : 
            
     
   <>
   
   
   <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerStyle: { backgroundColor: '#fdb6b1'},
                headerShown:true
            }}
        />
<Stack.Screen
            name="Register"
            component={Register}
            options={{
                headerStyle: { backgroundColor: '#fdb6b1' },
                headerShown: true
            }}
        />
   </>
            
         
            
            }

           
        </Stack.Navigator>

    )
}

export default function UserNavigator() {

    return <MyStack />
}