import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const register = () => {
        if (email === '' ||
            name === '' ||
            age === '' ||
            gender === '' ||
            contact === '' ||
            password === ''
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
            status: 'activated'

        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                    }, 500)
                }
            })
            .catch((error) => {

            })


    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={100}
            enableOnAndroid={true}
        >
            <FormContainer title={"Register"}>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Age"}
                    name={"age"}
                    id={"age"}
                    onChangeText={(text) => setAge(text)}
                />
                <Input
                    placeholder={"Gender"}
                    name={"gender"}
                    id={"gender"}
                    onChangeText={(text) => setGender(text)}
                />
                <Input
                    placeholder={"Contact Number"}
                    name={"contact"}
                    id={"contact"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setContact(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View style={{ paddingBottom: 10 }}>
                    <Button title={"Register"}
                        onPress={() => register()}
                    />
                </View>
                <View>
                    <Button title={"Back to Login"} onPress={
                        () => props.navigation.navigate("Login")
                    } />
                </View>
            </FormContainer>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({

    buttonGroup: {
        width: '80%',
        margin: 10,
        alignItems: 'center'
    }
})


export default Register;