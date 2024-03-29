import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button,FlatList, ActivityIndicator, StyleSheet, Dimensions, Image } from 'react-native';
import { Container, Item, Input } from "native-base"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome"
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import ListInquiries from './ListInquiries';

import AuthGlobal from '../../Context/store/AuthGlobal';
import baseURL from '../../assets/common/baseUrl'

import axios from 'axios';

var { height, width }= Dimensions.get("window")

var { width } = Dimensions.get('window')
const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Instruction</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Freelancer Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Status</Text>
            </View>
            {/* <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Price</Text>
            </View> */}
        </View>
    )
}
const Inquiries = (props) => {
    const context = useContext(AuthGlobal)
    const [inquiriesList, setInquiriesList] = useState()
    const [inquiriesFilter, setInquiriesFilter] = useState()
    const [loading, setLoading]=useState()
    const [token, setToken] = useState();

   
    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}inquiries`)
                    .then((res) => {
                        // console.log(context.stateUser.user.userId)
                        // console.log(res.data[0].customer._id)
                            const data = res.data
                       const userInquiry = data.filter(
                         (data) => data.customer._id === context.stateUser.user.userId
                       )
                        setInquiriesList(userInquiry);
                        setInquiriesFilter(userInquiry);
                        // setInquiriesList(res.data);
                        // setInquiriesFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setInquiriesList();
                    setInquiriesFilter();
                    setLoading(true);
                }
            },
            [context.stateUser.isAuthenticated],
        )
    )

    // const searchProduct = (text) => {
    //     if (text == "") {
    //         setProductFilter(productList)
    //     }
    //     setProductFilter(
    //         productList.filter((i) => 
    //             i.name.toLowerCase().includes(text.toLowerCase())
    //         )
    //     )
    // }

    const deleteInquiry = (id) => {
        axios
            .delete(`${baseURL}inquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const inquiries = inquiriesFilter.filter((item) => item._id !== id)
                setInquiriesFilter(inquiries)
            })
            .catch((error) => console.log(error));
    }

  return (
    <View style={styles.container}>
        {/* <View style={styles.buttonContainer}>
            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("Orders")}
            >
                <Icon name="shopping-bag" size={18} color="white" />
                <Text style={styles.buttonText}>Orders</Text>
            </EasyButton>
            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("ProductForm")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Products</Text>
            </EasyButton>
            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("Categories")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Categories</Text>
            </EasyButton>
        </View> */}
      {/* <View>
          <Header searchBar rounded>
              <Item style={{ padding: 5 }}>
                  <Icon name="search" />
                  <Input 
                    placeholder="Search"
                    onChangeText={(text) => searchProduct(text)}
                  />
              </Item>
          </Header>
      </View> */}

      {loading ? (
          <View style={styles.spinner}> 
              <ActivityIndicator size="large" color="red" />
          </View>
      ) : (
          <FlatList 
            data={inquiriesFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
                
                // <Text>{item.instruction}</Text>
                <ListInquiries 
                    {...item}
                    navigation={props.navigation}
                    index={index}
                    key={index}
                    delete={deleteInquiry}
                />
            )}
           
            keyExtractor={(item) => item._id}
          />
      )}
    </View>
  );
};

//     return (
//         <Container style={styles.container}>
//             {/* <View >

//             </View> */}
//             <ScrollView contentContainerStyle={styles.subContainer}>
//            <Text>daw</Text>
        
           
//             </ScrollView>
//         </Container>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         // backgroundColor: "blue",
//         maxWidth: width
//     },
//     subContainer: {
//         alignItems: "center",
//         // backgroundColor: "yellow"
//     },
//     imageCropper: {
//         width: 100,
//         height: 100,
//         position: 'relative',
//         overflow: 'hidden',
//         borderRadius: 50,
//         backgroundColor: 'gainsboro',
//         marginVertical: 15
//     },
//     image: {
//         // display: 'inline',
//         // margin: 0 auto;
//         height: '100%',
//         width: 'auto'
//     }
// })

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 2,
        width: width / 4
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10
    },
    container: {
        height: height,
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})
export default Inquiries;