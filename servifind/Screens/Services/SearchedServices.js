import React from "react";
import { View, StyleSheet } from 'react-native'
import { Content,Container, Left, Body, ListItem, Thumbnail, Text } from 'native-base'

const SearchedServices = (props) => {
    const servicesFiltered = props;
    // console.log(servicesFiltered)
    // console.log(Object.keys(servicesFiltered).length)
    // Object.values
    return (
        <Container>
        {/* <Content> */}
            {servicesFiltered.length > 0 ? (
             servicesFiltered.map((item) => (
                <ListItem 
                //onPress={navigation}
                key={item._id.$oid}
                // avatar
                >
                    <Left>
                        <Thumbnail
                            source={{ uri: item.image ? 
                                item.image: 'https://cdn.pixabay.com/photo.2012/04/01/17/29/box-23649_960_720.png'}}
                        />
                    </Left>
                    <Body>
                        <Text>{item.title}</Text>
                        {/* <Text note>{item.description}</Text> */}
                    </Body>
                </ListItem>
                
            ))
            ) : (
   <View style={StyleSheet.center}>
                    <Text style={{alignSelf: "center"}}> 
                    {/* No Services match the selected criteria */}
                    </Text>
                </View>
               
            )}
        {/* </Content> */}
        </Container>
    )
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchedServices;