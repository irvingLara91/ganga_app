import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NativeBaseProvider} from "native-base";
import {Provider} from "react-redux";
import generateStore from './app/redux/store';
import Layout from "./app/containers/Layout";

const store = generateStore();


export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <StatusBar style="auto"/>
                <View style={{flex: 1}}>
                    <Layout/>
                </View>
            </NativeBaseProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});