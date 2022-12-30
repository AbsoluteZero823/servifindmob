import React, { useContext,useState,useCallback } from 'react';
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

import AuthGlobal from '../../Context/store/AuthGlobal';


var { width } = Dimensions.get("window");
const InquireForm = (props) => {

    const context = useContext(AuthGlobal)
 

    // const [email, setEmail] = useState("")
    const [instruction, setInstruction] = useState("")
    const [attachments, setAttachments] = useState("")
    const [service_id, setService_id] = useState("")
    const [customer, setCustomer] = useState("")
    // const [password, setPassword] = useState("")
    // const [message, setMessage] = useState("")
    const [error, setError] = useState("")

 
   



        

    const InquireForm = () => {
        if (instruction === ''
            // attachments === '' 
            // age === '' ||
            // gender === '' ||
            // password === '' ||
            // contact === '' ||
            // status === '' ||
            // message === ''

        ) {
            setError("Please Fill in the Form Correctly")
        }
        else{

        let inquiry = {
            instruction: instruction,
            attachments: 'adwa',
            service_id: props.route.params.service_id,
            customer: context.stateUser.user.userId,
          

        }

        axios
            .post(`${baseURL}inquiries/inquireform`, inquiry)
            .then((res) => {
                if (res.status == 200) {
                    
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: "Inquire Succeeded",
                        // text2: "Please login into your account"
                    })
                    setTimeout(() => {
                       
                        props.navigation.navigate("ServiceContainer");
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
    }

    return (
    
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
         

            <Input
                placeholder={"Instruction"}
                name={"instruction"}
                id={"instruction"}
                onChangeText={(text) => setInstruction(text)}
            />

            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Pressable title={"Inquire"} style={[styles.button, { marginVertical: 10 }]} 
                onPress={() => InquireForm()} 
                // onPress={() => console.log(props.route.params.service_id)} 
                >
                    <Text style={styles.middleText}>Inquire</Text>
                </Pressable>
            </View>
           
        </FormContainer >

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