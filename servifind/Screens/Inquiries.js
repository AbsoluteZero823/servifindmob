import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

var { width } = Dimensions.get('window')
const Inquiries = (props) => {
  
    return (
        <Container style={styles.container}>
            {/* <View >

            </View> */}
            <ScrollView contentContainerStyle={styles.subContainer}>
           <Text>daw</Text>
        
           
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "blue",
        maxWidth: width
    },
    subContainer: {
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    imageCropper: {
        width: 100,
        height: 100,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',
        marginVertical: 15
    },
    image: {
        // display: 'inline',
        // margin: 0 auto;
        height: '100%',
        width: 'auto'
    }
})
export default Inquiries;