import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { ActivityIndicator, TextInput, Button } from 'react-native-paper'

import * as SecureStore from 'expo-secure-store'

import { withRouter } from "react-router-native"

export const Login = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const handleSignin = async _ => {
        setLoading(true)
        handleRequest()
    }

    const handleRequest = async _ => {
        try {
            const res = await fetch("https://servicetechlink.com/login", {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify({ username, password })
            })

            setLoading(false)

            const error = res.status === 400
                
            const json = await res.json()

            if(error) {
                setError(json.message)
            }
            else {
                setError(json.message)
                const saveToken = SecureStore.setItemAsync("token", json.token)
                const saveUser = SecureStore.setItemAsync("user", JSON.stringify(json.user))
                
                await Promise.all([ saveToken, saveUser ])

                props.history.push("/dashboard")
            }
        }
        catch(e) {
            setError("Error occurred while logging in, the server may be down")
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.titleText}>SecureChat Notifier</Text>
            <Text style = {styles.pageText}>Sign in</Text>

            <TextInput label = "Username" value = {username} onChangeText = {text => setUsername(text)} />
            <TextInput label = "Password" value = {password} onChangeText = {text => setPassword(text)} />

            <Button onPress = {handleSignin} mode = "contained" loading = {loading} disabled = {username === "" || password === "" || loading}>
                Sign in
            </Button>

            { error && <Text>{error}</Text> }
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

export default withRouter(Login)