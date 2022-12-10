import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
var { width } = Dimensions.get('window')
const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
   
    useFocusEffect(

        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => setUserProfile(user.data))
                })

                .catch(error => {
                    console.log(error);
                })

            return () => {
                setUserProfile();
            }



        }, [context.stateUser.isAuthenticated]))

    return (
        <Container style={styles.container}>
            {/* <View >

            </View> */}
            <ScrollView contentContainerStyle={styles.subContainer}>
           
           <View style={styles.imageCropper}>
             <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: 'https://pbs.twimg.com/media/Ccd80gBUsAQERZj.jpg' }}
            />
            </View>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Contact Number: {userProfile ? userProfile.contact : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Role: {userProfile ? userProfile.role : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => [
                        // props.navigation.navigate("Login"),
                        AsyncStorage.removeItem("jwt"),

                        // console.log(context.stateUser.isAuthenticated),
                        logoutUser(context.dispatch)

                    ]} />
                </View>
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
export default UserProfile;