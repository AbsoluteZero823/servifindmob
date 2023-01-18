import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions, Image, Switch } from 'react-native';
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

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isOnline, setIsOnline] = useState(false);
    const toggleOnlineSwitch = () => setIsOnline(previousState => !previousState);
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
                    // console.log(userProfile.avatar.url)
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
                        source={{ uri: userProfile ? userProfile.avatar.url : 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1674014501/servifind/avatar/default_profile.jpg' }}
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
                <Button title={"Transactions"} onPress={() => [
                    // props.navigation.navigate("Login"),
                    // AsyncStorage.removeItem("jwt"),
                    alert("Show Transaction(not Done yet)")
                    // console.log(context.stateUser.isAuthenticated),
                    // logoutUser(context.dispatch)

                ]} />




                <View style={styles.switches}>
                    <Text>Freelancer Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#fad7d4" }}
                        thumbColor={isEnabled ? "#fcc6c2" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    /></View>

                <View style={styles.switches}>
                    <Text>Online Status</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#fad7d4" }}
                        thumbColor={isOnline ? "#fcc6c2" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleOnlineSwitch}
                        value={isOnline}
                    />
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
    },
    switches: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})
export default UserProfile;