import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';



import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'

//Navigators
import Main from './Navigators/Main'


//Screens
import Header from './Shared/Header';
import ServiceContainer from './Screens/Services/ServiceContainer';
export default function App() {



  return (

    <NativeBaseProvider>
      <NavigationContainer>

        <Header />

        <Main />

      </NavigationContainer>
    </NativeBaseProvider>
  );
}


