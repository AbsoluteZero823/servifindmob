import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = () => {
        const user = {
            email,
            password
        }

        if (email === "" || password === "") {
            setError("Please fill in your credentials")
        } else {
            console.log('success')
        }
    }
    return (
        <FormContainer title={'Log In Now'}>
            <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Pressable style={[styles.button, { marginVertical: 20 }]} onPress={() => handleSubmit()}>
                    <Text style={styles.middleText}>Login</Text>
                </Pressable>
            </View>

            <View>
                <Text style={{ color: 'black' }}>Don't have an account yet?
                    <Pressable style={{ alignItems: 'center', justifyContent: 'center', }} title="Regsiter" onPress={() => props.navigation.navigate("Register")} >
                        <Text style={{ color: '#fdb6b1' }} >Register</Text>
                    </Pressable>
                </Text>

            </View>
        </FormContainer >
    )
}


const styles = StyleSheet.create({

    button: {
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 125,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fdb6b1',
        color: 'white'
    },
    buttonGroup: {
        width: '80%',
        alignItems: 'center',

    },
    middleText: {
        marginBottom: 0,
        alignSelf: "center",
        color: 'black'
    }
})

export default Login;