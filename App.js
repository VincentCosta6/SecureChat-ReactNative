import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Router, Stack, Scene } from "react-native-router-flux"

import Greeting from "./Greeting"
import Login from "./Login"

export default props => {

    return (
        <Router>
            <Stack key="root">
                <Scene key="greeting" component={Greeting} title="Greetings" />
                <Scene key="login" component={Login} title="Login" />
            </Stack>
        </Router>
    )
}

