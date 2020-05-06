import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default props => {
    const [username, setUsername] = useState("")

    return (
        <View style={styles.container}>
            <View>
                <Text>Username</Text>
                <TextInput value = {username} onChange = {event => setUsername(event.target.value)}></TextInput>
            </View>
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