import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

export default props => {

    const handleContinue = _ => {
        Linking.openURL("https://securechatapp.us/messages")
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