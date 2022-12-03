import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

// import { StyleSheet, Text, View } from 'react-native';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

//Context API
import Auth from "./Context/store/Auth";


//Navigators
import Main from './Navigators/Main'


//Screens
import Header from './Shared/Header';

export default function App() {



  return (
    <Auth>
      {/* // <Provider store={store}> */}
      <NativeBaseProvider>
        <NavigationContainer>

          {/* <Header /> */}

          <Main />
          <Toast innerRef={(innerRef) => Toast.setRef(innerRef)} />
        </NavigationContainer>
      </NativeBaseProvider>
      {/* // </Provider> */}
    </Auth>

  );
}


