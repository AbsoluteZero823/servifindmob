import React, { useState, useEffect } from 'react'
// import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Dimensions
} from "react-native";

import { Container, VStack, Heading, Icon, Item, Input, Text } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

import ServiceList from './ServiceList'

var { height } = Dimensions.get('window')
var { width } = Dimensions.get('window')
const data = require('../../assets/data/services.json');

const ServiceContainer = (props) => {

    const [services, setServices] = useState([]);

    useEffect(() => {



        axios
            .get(`${baseURL}services`)
            .then((res) => {
                // console.log(res.data);
                setServices(res.data);
            })
            .catch(error => console.log(error));
        return () => {
            setServices([])
        }
    }, [])

    return (
        <Container style={{ top: 0, backgroundColor: '#fdb6b1', maxWidth: '100%' }}>
            <VStack width={width - 10} space={5} bottom="5px" marginLeft="auto" marginRight="auto" backgroundColor='#fdb6b1'>

                <Input placeholder="Search" variant="filled" width="95%" borderRadius="10" top='4' left="2" py="1" px="2" backgroundColor="white" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
            </VStack>

            <View style={styles.container}>
                {/* <Text >Service Container</Text> */}
                <View style={styles.listContainer}>
                    <FlatList
                        data={services}
                        numColumns={2}
                        renderItem={({ item }) => <ServiceList
                            navigation={props.navigation}
                            key={item.title}
                            item={item} />}
                        keyExtractor={item => item.title}
                    />
                </View>
            </View>

        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        height: height / 1.3,
        // paddingBottom: 10,
        flexWrap: "wrap",
        backgroundColor: "transparent",
        top: 20
    },
    listContainer: {
        // height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "white",
        width: width
    }

})
export default ServiceContainer;