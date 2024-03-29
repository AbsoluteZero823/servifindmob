import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"
import React from "react";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                const token = data.token;
                AsyncStorage.setItem("jwt", token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded, user))
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Logged in Successfuly",
                    text2: ""
                });
            } else {
                logoutUser(dispatch)
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please provide correct credentials",
                text2: ""
            });
            logoutUser(dispatch)
        })
}

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content": "application.json"
        },
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
    // console.log("awit");
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");

    Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Logged Out Successfuly",
        text2: ""
    });
    dispatch(setCurrentUser({}))

}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}