import React, {useEffect, useState} from 'react';
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {NavigationContainer} from "@react-navigation/native";

import {NavigationSession, NavigationNoSession} from "./AppLayout";
import {connect} from "react-redux";
import {View, Image} from "react-native";
import authDuck from "../redux/authDuck";

const Layout = (props) => {
    const [isReady, setIsReady] = useState(false);

    let [fontsLoaded] = useFonts({
        'SharpGroteskBook': require('../../assets/fonts/SharpGrotesk-Book20.otf'),
        'SharpGroteskMedium': require('../../assets/fonts/SharpGrotesk-Medium20.otf'),
    });
    useEffect(async () => {
        await SplashScreen.preventAutoHideAsync();
    }, [])

    const _cacheResourcesAsync = async () => {
        await SplashScreen.hideAsync();

        try {

        } catch (e) {
            console.warn(e);
        } finally {
            setTimeout(() => {
                setIsReady(true)
            }, 4500)
        }
    };

    if (fontsLoaded && isReady) {
        return (
            <NavigationContainer>
                {
                    props.auth.loggedIn ?
                        <NavigationSession/>
                        :
                        <NavigationNoSession/>
                }

            </NavigationContainer>
        );
    } else {
        return (
            <View style={{flex: 1, backgroundColor: '#F7F7FF'}}>

                <View style={{flex: 1}}>
                    <Image
                        source={require("../../assets/kikert_splash.gif")}
                        onLoad={_cacheResourcesAsync}
                        style={{resizeMode: 'cover', width: '100%', height: '100%'}}
                    />
                </View>
            </View>
        )
    }

};

const mapState = (state) => {
    return {
        auth: state.auth,
        app: state.app,
        name: state.app.name,
        primaryColor: state.app.primaryColor,
        secondaryColor: state.app.secondaryColor
    };
};
export default connect(mapState)(Layout)
