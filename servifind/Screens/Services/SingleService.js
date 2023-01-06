import React, { useContext,useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button, Dimensions, Pressable } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import AuthGlobal from '../../Context/store/AuthGlobal';
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
const SingleService = (props) => {
    const context = useContext(AuthGlobal)
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');

    return (
        <Container style={styles.container}>
            <ScrollView style={{ width: '100%', height: '100%', alignSelf: 'center', marginBottom: 80, padding: 5 }}>
                <View>

                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo.2012/04/01/17/29/box-23649_960_720.png'

                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <View style={styles.infoContainer}>
                        <Text>{item.category.name}</Text>
                        <View style={styles.imageCropper}>
                            <Image
                                style={styles.profile_image}
                                resizeMode="contain"
                                source={{ uri: item.user.image }}
                            />
                        </View>
                        {/* <Text>{item.user.name}</Text> */}
                        <Text>{item.user.name}</Text>


                        { context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null ? 
            
            <Button title={'Inquire'} color={'green'} onPress={() => 
                
                props.navigation.navigate("User")}
                
               
                />

            : 
            <Button title={'Inquire'} color={'green'} onPress={() => 
                // props.navigation.navigate("Inquire Form")}
                
                props.navigation.navigate({
                    name: 'Inquire Form',
                    params: { service_id: item._id },
                    merge: true,
                  })
                }
                />
            }

                        
                    </View>

                </View>
            </ScrollView>

        </Container>
    )
}

const styles = StyleSheet.create({

    container: {
        position: 'relative',
        height: height,
        width: width,
        // backgroundColor: 'yellow',
        left: 40

    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250,
        margin: 'auto',

    },
    infoContainer: {
        width: '100%',
        // backgroundColor: 'blue',
        alignSelf: 'center',
        alignItems: 'center',
        height: 250
    },
    imageCropper: {
        width: 25,
        height: 25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',
        // marginVertical: 15
    },
    profile_image: {
        // display: 'inline',
        // margin: 0 auto;
        height: 25,
        width: 'auto'
    }
})

export default SingleService;