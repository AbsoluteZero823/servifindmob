import { Platform } from 'react-native'

let baseURL = '';

{
    Platform.OS == 'android'
        ? baseURL = 'http://10.0.2.2:3000/api/v1/'
        // ? baseURL = 'http://192.168.100.3:3000/api/v1/'
        // ? baseURL = 'http://192.168.100.252:3000/api/v1/'
       
       
        : baseURL = 'http://localhost:3000/api/v1'
}

export default baseURL;