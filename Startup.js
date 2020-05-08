import React, { useEffect, useState } from "react"

import { StyleSheet, View, Text } from 'react-native';

import { ActivityIndicator } from 'react-native-paper'

import * as SecureStore from 'expo-secure-store'

import { withRouter } from "react-router-native"

export const Startup = props => {
    const [startupText, setStartupText] = useState("Reading storage")

    useEffect(_ => {
        handleUseEffect()
    }, [])

    const handleUseEffect = async _ => {
        const tokenVal = await SecureStore.getItemAsync("token")

        if(!tokenVal) {
            return props.history.push("/greeting")
        }

        if(tokenVal === "cleared") {
            return props.history.push("/login")
        }

        checkUserExists(tokenVal)
    }

    const checkUserExists = async token => {
        setStartupText("Checking token")

        try {
            const res = await fetch("https://servicetechlink.com/get/session", {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json",
                    'Authorization': token
                }
            })

            const json = await res.json()

            if(json.user) {
                handleSuccess(json.user)
            }
            else throw "Error user is not in JSON object"
        }
        catch(e) {
            props.history.push("/login")
        }
    }
    
    const handleSuccess = user => {
        props.history.push("/dashboard")
    }

    return (
        <View style = {styles.container}>
            <ActivityIndicator size = 'large' />
            <Text style = {styles.text}>{startupText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
        marginTop: 40
    }
})

export default withRouter(Startup)