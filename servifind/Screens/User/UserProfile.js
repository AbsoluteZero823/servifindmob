import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions, Image, Switch, Pressable, TouchableOpacity } from 'react-native';
import { Container, useTheme } from "native-base"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome"

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';


import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
import * as ImagePicker from "expo-image-picker"
import { SafeAreaView } from 'react-native-safe-area-context';

var { width, height } = Dimensions.get('window')
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
                     // Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })();
                })

            return () => {
                setUserProfile();

            }



        }, [context.stateUser.isAuthenticated]))

        const Action = ({icon, title, screen}) => {
            const {colors} = useTheme();
            return(
                <View style={styles.action} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={width} >
                    

                        {/* <View style={styles.iconContainer} center color={colors.primaryLight}>
                            
                        </View> */}
                        <Text style={styles.actionTitle} title3 >{title}</Text>
                    
                    <Icon color={'gainsboro'} size={22} name={'chevron-right'} />
                </View>
            )
        };
        
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
    
            if (!result.canceled) {
                setMainImage(result.uri);
                setImage(result.uri);
            }
        };

    return (
        <SafeAreaView style={styles.container}>
            {/* <View >

            </View> */}
            
            <View style={{backgroundColor: "#fdb6b1", width: width, display:"flex", flexDirection: "row", alignItems:"center"}}>
                <View style={styles.imageCropper}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={{ uri: userProfile ? userProfile.avatar.url : 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1674014501/servifind/avatar/default_profile.jpg' }}
                    />
                   
                </View>
                <View>
                    <Text>
                        Hello!
                    </Text>
                <Text style={{ fontSize: 20 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                </View>
               
              <TouchableOpacity style={styles.editbtn} onPress=
        {() => [
            alert("Edit Profile(not Done yet)")     
        ]}>
              {/* <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity> */}
                <Icon
                            name="pencil"

                            color="white"
                            size={10}
                            
                        />
                       </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.subContainer}>
<View style={styles.actions}>

{/* <TouchableOpacity style={{paddingTop:10}} onPress=
        {() => [
            alert("Edit Profile(not Done yet)")     
        ]}>
        <Action title={'Edit Profile'} icon={'edit'} />
    </TouchableOpacity>
     */}
     <View>
     <Text style={styles.bold}>Freelancer</Text> 
     
     {userProfile && userProfile.role != 'customer' && (
                                
                                <View style={[styles.switches, { marginTop: 5 }]}>
                                    <Text style={styles.actionTitle} >Freelancer Mode</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#fad7d4" }}
                                        thumbColor={isEnabled ? "#fcc6c2" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                                            )}
 {userProfile && userProfile.role != 'customer' && (
                <View style={[styles.switches, { marginTop: -5 }]}>
                    <Text style={styles.actionTitle}>Online Status</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#fad7d4" }}
                        thumbColor={isOnline ? "#fcc6c2" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleOnlineSwitch}
                        value={isOnline}
                    />
                </View>
  )}

     <TouchableOpacity  style={{paddingTop:10}}  onPress=
        {() => [
            alert("My Services(not Done yet)")     
        ]}>
        <Action title={'My Services'} icon={'edit'} />   
    </TouchableOpacity>
        
    <TouchableOpacity  style={{paddingTop:10}}  onPress=
        {() => [
            alert("Client`s inquiries(not Done yet)")     
        ]}>
        <Action title={'Client`s Inquiries'} icon={'edit'} />   
    </TouchableOpacity>




     </View>
    
    <View>
    <Text style={styles.bold}>Buyer</Text> 

    <TouchableOpacity  style={{paddingTop:10}}   onPress={() => props.navigation.navigate("inquiries")}>
        <Action title={'Manage Orders'} icon={'edit'} />   
    </TouchableOpacity>

    <TouchableOpacity  style={{paddingTop:10}}  onPress=
        {() => [
            alert("Post a request(not Done yet)")     
        ]}>
        <Action title={'Post a request'} icon={'edit'} />   
    </TouchableOpacity>
    </View>
    
    <View style={{marginBottom:10}}>
    <Text style={styles.bold}>General</Text>
    <TouchableOpacity onPress=
        {() => [
            alert("Change Password(not Done yet)")     
        ]}>
        <Action title={'Change Password'} icon={'edit'} />   
    </TouchableOpacity> 

       
    <TouchableOpacity  style={{paddingTop:10}}  onPress=
        {() => [
            alert("Support(not Done yet)")     
        ]}>
        <Action title={'Support'} icon={'edit'} />   
    </TouchableOpacity>
    <TouchableOpacity  style={{backgroundColor:'white', width: width, paddingVertical: 7,paddingHorizontal:29}} title={"Sign Out"} onPress={() => [
                        // props.navigation.navigate("Login"),
                        AsyncStorage.removeItem("jwt"),

                        // console.log(context.stateUser.isAuthenticated),
                        logoutUser(context.dispatch)

                    ]}><Text style={[styles.actionTitle,{color:'red'}]}>Sign Out</Text>
        
    </TouchableOpacity>
   
    </View>
    
      


   
    {/* <Action title={'Edit Profile'} icon={'edit'} />
    <Action title={'Edit Profile'} icon={'edit'} />
    <Action title={'Edit Profile'} icon={'edit'} />
    <Action title={'Edit Profile'} icon={'edit'} />
    <Action title={'Edit Profile'} icon={'edit'} />
    <Action title={'Edit Profile'} icon={'edit'} />
    <Action title={'Edit Profile'} icon={'edit'} /> */}
</View>
                {/* <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Contact Number: {userProfile ? userProfile.contact : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Role: {userProfile ? userProfile.role : ""}
                    </Text>
                </View> */}
                {/* userProfile ? userProfile.name */}



              

                {/* <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => [
                        // props.navigation.navigate("Login"),
                        AsyncStorage.removeItem("jwt"),

                        // console.log(context.stateUser.isAuthenticated),
                        logoutUser(context.dispatch)

                    ]} />


                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: "center",
        // backgroundColor: "blue",
      
        top:-40,
        maxWidth: width,
        height: height/1.15
    },
    subContainer: {
        alignItems: "center",
        // height: height
        // backgroundColor: "yellow",
        // paddingBottom: 25,
        
    },
    imageCropper: {
        width: 70,
        height: 70,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',
        marginVertical: 15,
        marginHorizontal: 15
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
        alignItems: "center",
        justifyContent: "space-between",
        width: width,
        paddingHorizontal:29
        
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    editbtn: {
        position: "absolute",
        right: 15,
        
        // bottom: 5,
        backgroundColor: "#fdb6b5",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    action:{
        marginVertical:10,
        paddingHorizontal:29, 
        
        // display:'flex',
        // flexDirection:'row'
    },
    iconContainer:{
        width: 40,
        height: 40,
        borderRadius: 6,

    },
    actionTitle:{
        // marginLeft: 19
        fontSize: 18,
     
    },
    bold:{
fontSize: 25,
fontWeight: 'bold',
marginLeft: 25,
marginTop: 10
    }
})
export default UserProfile;