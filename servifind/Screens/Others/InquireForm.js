import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TextInput, Dimensions } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'
import Toast from 'react-native-toast-message'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';


var { width } = Dimensions.get("window");
const InquireForm = (props) => {

    const countries = ["Male", "Female"]

    // const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    // const [contact, setContact] = useState("")
    // const [age, setAge] = useState("")
    // const [gender, setGender] = useState("")
    // const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const InquireForm = () => {
        if (name === '' ||
            email === '' ||
            age === '' ||
            gender === '' ||
            password === '' ||
            contact === '' ||
            status === '' ||
            message === ''

        ) {
            setError("Please Fill in the Form Correctly")
        }

        let user = {
            name: name,
            email: email,
            age: age,
            gender: gender,
            password: password,
            contact: contact,
            status: 'activated',
            message: message

        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: "Inquire Succeeded",
                        text2: "Please login into your account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                })
            })


    }

    return (
        // <KeyboardAwareScrollView
        //     viewIsInsideTabBar={true}
        //     extraHeight={200}

        //     enableOnAndroid={true}
        // >
        <FormContainer title={"Inquire"} style={{ backgroundColor: 'white' }}>
            <Text style={{ alignSelf: "flex-start", marginHorizontal: 45, fontSize: 15, fontWeight: 'bold' }}>Freelancer Information</Text>
            <View style={{ borderColor: "black", opacity: 10, borderWidth: 2, borderRadius: 10, backgroundColor: 'transparent', width: "80%", marginBottom: 10 }}>
                <Text >
                    awhdaui
                </Text>
                <Text >
                    awhdaui
                </Text>
                <Text >
                    awhdaui
                </Text>
            </View>

            <Text style={{ alignSelf: "flex-start", marginHorizontal: 45, fontSize: 15, fontWeight: 'bold' }}>Instruction Message</Text>
            {/* <Input
                placeholder={"Email"}
                name={"email"}
                id={"email"}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            /> */}

            <Input
                placeholder={"Message"}
                name={"message"}
                id={"message"}
                onChangeText={(text) => setMessage(text)}
            />

            {/* <View style={{ width: width, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: '7%' }}>
                <TextInput
                    style={styles.Tinput}
                    placeholder={"Age"}
                    name={"age"}
                    id={"age"}
                    onChangeText={(text) => setAge(text)}
                />






                <SelectDropdown
                    placeholder={"Gender"}
                    name={"gender"}
                    id={"gender"}
                    // ref={citiesDropdownRef}
                    data={countries}
                    onSelect={(selectedItem) => setGender(selectedItem)}
                    defaultButtonText={'Select Gender'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}

                />

            </View> */}

            {/* <Input
                placeholder={"Contact Number"}
                name={"contact"}
                id={"contact"}
                keyboardType={"numeric"}
                onChangeText={(text) => setContact(text)}
            /> */}

            {/* <Input
                placeholder={"Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            /> */}


            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
            </View>

            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Pressable title={"Inquire"} style={[styles.button, { marginVertical: 10 }]} onPress={() => register()}>
                    <Text style={styles.middleText}>Inquire</Text>
                </Pressable>
            </View>
            {/* <View>
                <Text style={{ color: 'black' }}>Already have an account?
                    <Pressable style={{ alignItems: 'center', justifyContent: 'center', }} title="Login" onPress={() => props.navigation.navigate("Login")} >
                        <Text style={{ color: '#fdb6b1' }} > Login</Text>
                    </Pressable>
                </Text>

            </View> */}
        </FormContainer >

        // </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({

    buttonGroup: {
        width: '80%',
        margin: 10,
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 118,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fdb6b1',
        color: 'white'
    },
    Tinput: {
        height: 60,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        // height: 60,
        borderWidth: 2,
        borderColor: 'black',
        width: '30%',

    },
    middleText: {
        marginBottom: 0,
        alignSelf: "center",
        color: 'black'
    },
    dropdown2BtnStyle: {
        margin: 10,
        padding: 10,
        flex: 1,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
    dropdown2BtnTxtStyle: { color: 'gray', textAlign: 'left', fontSize: 15 },
    dropdown2DropdownStyle: { backgroundColor: 'red', marginTop: -40 },
    dropdown2RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#EFEFEF' },
    dropdown2RowTxtStyle: { color: 'black', textAlign: 'left' },
})


export default InquireForm;