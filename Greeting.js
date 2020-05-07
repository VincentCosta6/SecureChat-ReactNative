import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default props => {
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