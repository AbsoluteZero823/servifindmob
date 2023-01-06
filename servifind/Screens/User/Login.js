import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

//Context API
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from "../../Context/actions/Auth.actions"
var { width, height } = Dimensions.get("window");

const Login = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Profile")
        }
    }, [context.stateUser.isAuthenticated])

    const handleSubmit = () => {
        const user = {
            email,
            password,
        };

        if (email === "" || password === "") {
            setError("Please fill in your credentials");
        } else {
            loginUser(user, context.dispatch);
        }
    };
    return (
        <View>
             
        <FormContainer title={''}>
        <Image
                source={require('../../assets/Logo.png')}
                resizeMode='contain'
                style={{ height: 120, alignItems: 'center', width: width, backgroundColor: 'white', bottom: 50 }}

            />
            <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text)}
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
        </View>
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