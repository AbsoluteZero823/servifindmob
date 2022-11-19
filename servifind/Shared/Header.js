import react from 'react'
import { StyleSheet, Image, SafeAreaView, Text, View, Dimensions } from 'react-native'

const Header = () => {
    var { width } = Dimensions.get('window')
    return (

        <SafeAreaView style={{ width: width, paddingTop: 50, backgroundColor: '#fdb6b1' }}>
            <Image
                source={require('../assets/Logo.png')}
                resizeMode='contain'
                style={{ height: 50, alignItems: 'center', left: -40, backgroundColor: '#fdb6b1' }}

            />

        </SafeAreaView >

    )
}
const styles = StyleSheet.create({
    header: {

        // flexDirection: 'row',
        // alignContent: 'center',
        // justifyContent: 'center',
        paddingTop: 20,
        height: 100,
        backgroundColor: '#24262b'


    }
})



export default Header;