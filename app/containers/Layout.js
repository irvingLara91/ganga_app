import React, {useEffect, useRef, useState} from 'react';
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {NavigationContainer} from "@react-navigation/native";

import {NavigationSession, NavigationNoSession} from "./AppLayout";
import {connect} from "react-redux";
import {View, Image,StyleSheet, Button} from "react-native";

import LottieView from 'lottie-react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/utils";

const Layout = (props) => {
    const animation = useRef(null);
    const [isReady, setIsReady] = useState(false);

    let [fontsLoaded] = useFonts({
        'SharpGroteskBook': require('../../assets/fonts/SharpGrotesk-Book20.otf'),
        'SharpGroteskMedium': require('../../assets/fonts/SharpGrotesk-Medium20.otf'),
    });
    useEffect(() => {
        animation.current?.play();
    }, [])

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
            <View style={styles.animationContainer}>
                <LottieView
                    loop={false}
                    onAnimationFinish={(a)=>{
                        setIsReady(true)
                    }}
                    ref={animation}
                    style={{
                        backgroundColor: props.app.primaryColor,
                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../assets/walterMellow.json')}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});

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
