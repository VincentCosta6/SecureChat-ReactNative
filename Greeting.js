import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { withRouter } from "react-router-native"

export const Greeting = props => {
    const handleContinue = _ => {
        props.history.push("/login")
    }

    return (
        <View style={styles.container}>
            <Text>Welcome to SecureChat link!</Text>
            <TouchableOpacity onPress = {handleContinue}>
                <Text>Continue</Text>
            </TouchableOpacity>
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
})

export default withRouter(Greeting)