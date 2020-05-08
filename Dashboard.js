import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { ActivityIndicator, TextInput, Button } from 'react-native-paper'

import * as SecureStore from 'expo-secure-store'

import { withRouter } from "react-router-native"

export const Dashboard = props => {
    const [username, setUsername] = useState("Loading")

    useEffect(_ => {
        loadUser()
    }, [])

    const loadUser = async _ => {
        const userString = await SecureStore.getItemAsync("user")

        const userObj = JSON.parse(userString)

        setUsername(userObj.username)
    }

    const logOut = async _ => {
        const deleteToken = SecureStore.setItemAsync("token", "cleared")
        const deleteUser = SecureStore.deleteItemAsync("user")

        await Promise.all([ deleteToken, deleteUser ])

        props.history.push("/login")
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.titleText}>Hello {username}</Text>
            <Button mode = "contained" onPress = {logOut}>Log out</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        
    },
    titleText: {
        fontSize: 35,
        textAlign: "center"
    },
    pageText: {
        fontSize: 30,
        textAlign: "center"
    }
})

export default withRouter(Dashboard)