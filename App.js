import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NativeRouter, Route, Switch } from "react-router-native"
import { Provider as PaperProvider } from 'react-native-paper'

import Startup from "./Startup"
import Greeting from "./Greeting"
import Login from "./Login"
import Dashboard from "./Dashboard"

export default props => {
    return (
        <NativeRouter>
            <PaperProvider>
                <Switch>
                    <Route exact path="/" component={Startup} />
                    <Route exact path="/greeting" component={Greeting} />
                    <Route exact path="/login" component={Login} />

                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </PaperProvider>
        </NativeRouter>
    )
}

