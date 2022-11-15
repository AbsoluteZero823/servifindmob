import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';


import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'

//Navigators
import Main from './Navigators/Main'


//Screens
import Header from './Shared/Header';
import ServiceContainer from './Screens/Services/ServiceContainer';
export default function App() {



  return (
    // <Provider store={store}>
    <NativeBaseProvider>
      <NavigationContainer>

        <Header />

        <Main />

      </NavigationContainer>
    </NativeBaseProvider>
    // {/* </Provider> */ }
  );
}


