import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import { ActivityIndicator, TextInput, Button, Dialog, RadioButton } from 'react-native-paper'

import * as SecureStore from 'expo-secure-store'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { withRouter } from "react-router-native"

export const Dashboard = props => {
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("Loading")
    const [subscriptionToken, setSubToken] = useState("")

    const [dialogVisible, setDialogVisible] = useState(false)
    const [radioButton, setRadioButton] = useState("first")
    const [creatingSub, setCreatingSub] = useState(false)

    useEffect(_ => {
        loadUser()
    }, [])

    const loadUser = async _ => {
        const tokenString = SecureStore.getItemAsync("token")
        const userString = SecureStore.getItemAsync("user")
        const subscriptionString = SecureStore.getItemAsync("subscription")

        const result = await Promise.all([tokenString, userString, subscriptionString])

        setToken(result[0])

        const userObj = JSON.parse(result[1])
        setUsername(userObj.username)

        if (!result[2]) {
            setSubToken("none")
        }
        else {
            setSubToken(result[2])
        }
    }

    const logOut = async _ => {
        if (subscriptionToken && subscriptionToken !== "none")
            await handleDeleteSubscription()

        const deleteToken = SecureStore.setItemAsync("token", "cleared")
        const deleteUser = SecureStore.deleteItemAsync("user")

        await Promise.all([deleteToken, deleteUser])

        props.history.push("/login")
    }

    const handleSubscripton = _ => {
        setDialogVisible(true)
    }

    const createSubscription = async _ => {
        setCreatingSub(true)

        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            return
        }
        let token2 = await Notifications.getExpoPushTokenAsync()

        console.log(Platform.OS)

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('securechat-linker', {
                name: 'securechat-linker',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            })
        }

        try {
            const res = await fetch("https://servicetechlink.com/subscription", {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json",
                    'Authorization': token
                },
                method: "POST",
                body: JSON.stringify({ Endpoint: token2, Type: "expo" })
            })

            const json = await res.json()

            setCreatingSub(false)
            setDialogVisible(false)
            setSubToken(token2)

            await SecureStore.setItemAsync("subscription", token2)
        }
        catch (e) {
            setCreatingSub(false)
        }
    }

    const handleDeleteSubscription = async _ => {
        const res = await fetch("https://servicetechlink.com/subscription", {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': token
            },
            method: "DELETE",
            body: JSON.stringify({ Endpoint: subscriptionToken })
        })

        await SecureStore.deleteItemAsync("subscription")
        setSubToken("none")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Hello {username}</Text>
            {subscriptionToken !== "" && subscriptionToken !== "none" && <Text style={styles.titleText}>Subscription is active</Text>}
            {
                !dialogVisible &&
                <>
                    {
                        subscriptionToken !== "" &&
                            subscriptionToken === "none" ?
                            <Button
                                style={styles.subButton}
                                mode="contained"
                                onPress={handleSubscripton}
                            >
                                Create Subscription
                        </Button> :
                            <Button
                                style={styles.subButton}
                                mode="contained"
                                onPress={handleDeleteSubscription}
                            >
                                Delete Subscription
                        </Button>
                    }
                    <Button mode="contained" onPress={logOut}>Log out</Button>
                </>
            }

            <Dialog
                visible={dialogVisible}
                onDismiss={_ => setDialogVisible(false)}
            >
                <Dialog.Title>Create Subscription</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.urlRadioButton}>
                        <RadioButton
                            value="first"
                            status={radioButton === 'first' ? 'checked' : 'unchecked'}
                            onPress={_ => setRadioButton("first")}
                        />
                        <Text>securechat.netlify.app</Text>
                    </View>
                    <View style={styles.urlRadioButton}>
                        <RadioButton
                            value="second"
                            status={radioButton === 'second' ? 'checked' : 'unchecked'}
                            onPress={_ => setRadioButton("second")}
                        />
                        <Text>securechatapp.us</Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button>Cancel</Button>
                    <Button onPress={createSubscription} loading={creatingSub} disabled={creatingSub}>Create</Button>
                </Dialog.Actions>
            </Dialog>
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
    },
    subButton: {
        marginVertical: 15
    },
    urlRadioButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})

export default withRouter(Dashboard)