import React, {useEffect} from 'react';
import {LogBox, StyleSheet, StatusBar, View} from 'react-native';
import {NativeBaseProvider} from "native-base";
import {Provider} from "react-redux";
import generateStore from './app/redux/store';
import Layout from "./app/containers/Layout";

const store = generateStore();
console.warn
LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    "exported from 'deprecated-react-native-prop-types'.",
    "ColorPropType will be removed from React Native"
])

export default function App() {

    useEffect(()=>{
        LogBox.ignoreAllLogs();
    },[])
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <StatusBar
                    animated={true}
                    backgroundColor={"#e94d4d"}
                    barStyle={'light-content'}
                />
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
