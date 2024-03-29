import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native'

var { width } = Dimensions.get("window");

const ServiceCard = (props) => {
    const { title, image, user, category } = props;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: image ? image : 'https://cdn.pixabay.com/photo.2012/04/01/17/29/box-23649_960_720.png' }}
            />
            <View style={styles.card} />
            <Text style={styles.title}>
                {title.length > 25 ? title.substring(0, 25 - 3)
                    + '...' : title
                }
            </Text>
            {/* <Text style={styles.price}>${price}</Text> */}
            <View style={{ marginBottom: 60 }}>
               <Text>{category.name}</Text> 
               
                {/* <Button title={'Inquire'} color={'green'} /> */}
                <View style={styles.imageCropper}>
             <Image
                style={styles.profile_image}
                resizeMode="contain"
                source={{ uri: user.image }}
            />
            </View><Text>{user.name}</Text> 
            </View>
   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 35,
        marginBottom: 30,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginTop: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 12,
        textAlign: 'center'
    }, imageCropper: {
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

export default ServiceCard;