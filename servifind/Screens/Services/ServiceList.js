import React from "react";
import { TouchableOpacity, View, Dimensions, Text } from "react-native";
import ServiceCard from './ServiceCard'

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
const ServiceList = (props) => {
    const { item } = props;

    return (

        <TouchableOpacity style={{ width: '50%' }}>
            <View style={{
                width: width / 2,
                backgroundColor: "transparent"
            }}>
                <ServiceCard {...item} />
            </View>

        </TouchableOpacity>


    )
}

export default ServiceList;