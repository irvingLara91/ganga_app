import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from "../screens/register/LoginScreen";
import {Dimensions, Text, View} from "react-native";
import {store} from '../redux/store'
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import {AntDesign, Ionicons} from '@expo/vector-icons';
import PreLoginScreen from "../screens/register/PreLoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import SearchScreen from "../screens/SearchScreen";
import HotelsScreen from "../screens/HotelsScreen";
import GenericScreen from "../screens/GenericScreen";
import HotelDescriptionScreen from "../screens/HotelDescriptionScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ActionOptionMenu = ({icon, title, focused, color, size}) => {
    let app = store.getState().app;

    return (
        <View style={{
            marginTop: 10,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }}>
            {

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 3,
                    borderRadius: 10,
                    width: size * 1.2,
                    height: size * 1.2,
                }}>
                    {icon}
                </View>
            }
            <View>
                <Text style={{
                    fontFamily: 'SharpGroteskBook',
                    color: focused ? app.primaryColor : "black",
                    fontSize: 11
                }}>{title}</Text>
            </View>
        </View>
    )
}

const StackLoginRegisterScreen = () => {
    return (<Stack.Navigator
        initialRouteName="PreLoginScreen"
        screenOptions={{
            headerMode: 'none',
        }}>
        <Stack.Screen
            name={"PreLoginScreen"} component={PreLoginScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"LoginScreen"} component={LoginScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>

        <Stack.Screen
            name={"RegisterScreen"} component={RegisterScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
    </Stack.Navigator>)
}

const MenuTabs = () => {
    let app = store.getState().app;

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            activeColor="#e91e63"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    bottom: 0,
                    backgroundColor: '#e3e3e3',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 0.3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.1
                },
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            headerShown: false,
                            gestureEnabled: false,
                            tabBarIcon: ({focused, color, size}) =>
                                <ActionOptionMenu
                                    icon={<AntDesign
                                        style={{textAlignVertical: 'center'}}
                                        name="home" size={size * .98} color={focused ? app.primaryColor : "black"}/>}
                                    title={"Home"}
                                    focused={focused} color={color} size={size}/>,
                        }}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                        options={{
                            tabBarLabel: 'Login',
                            headerShown: false,
                            gestureEnabled: false,
                            tabBarIcon: ({focused, color, size}) =>
                                <ActionOptionMenu
                                    icon={<Ionicons name="person-outline" style={{textAlignVertical: 'center'}}
                                                    size={size * .98} color={focused ? app.primaryColor : "black"}/>}
                                    title={"Perfil"}
                                    focused={focused} color={color} size={size}/>,
                        }}/>
        </Tab.Navigator>
    )
}

const MenuTabsNoSession = () => {
    let app = store.getState().app;

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            activeColor="#e91e63"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    bottom: 0,
                    backgroundColor: '#e3e3e3',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 0.3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.1
                },
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            headerShown: false,
                            gestureEnabled: false,
                            tabBarIcon: ({focused, color, size}) =>
                                <ActionOptionMenu
                                    icon={<AntDesign
                                        style={{textAlignVertical: 'center'}}
                                        name="home" size={size * .98} color={focused ? app.primaryColor : "black"}/>}
                                    title={"Home"}
                                    focused={focused} color={color} size={size}/>,
                        }}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                        listeners={({navigation}) => ({
                            tabPress: (e) => {
                                e.preventDefault();
                                navigation.navigate("Register");
                            },
                        })}
                        options={{
                            tabBarLabel: 'Login',
                            headerShown: false,
                            gestureEnabled: false,
                            tabBarIcon: ({focused, color, size}) =>
                                <ActionOptionMenu
                                    icon={<Ionicons name="person-outline" style={{textAlignVertical: 'center'}}
                                                    size={size * .98} color={focused ? app.primaryColor : "black"}/>}
                                    title={"Login"}
                                    focused={focused} color={color} size={size}/>,
                        }}/>
        </Tab.Navigator>
    )
}

const AppStackNoSessionScreen = () => {
    return (<Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerMode: 'none',
        }}
    >
        <Stack.Screen
            name={"Home"} component={MenuTabsNoSession} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"SearchScreen"} component={SearchScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"HotelsScreen"} component={HotelsScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"GenericScreen"} component={GenericScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"HotelDescriptionScreen"} component={HotelDescriptionScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"Register"} component={StackLoginRegisterScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>

    </Stack.Navigator>)
}

const AppStackScreen = () => {
    return (<Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerMode: 'none',
        }}
    >
        <Stack.Screen
            name={"Home"} component={MenuTabs} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"SearchScreen"} component={SearchScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"HotelsScreen"} component={HotelsScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"HotelDescriptionScreen"} component={HotelDescriptionScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
        <Stack.Screen
            name={"GenericScreen"} component={GenericScreen} options={{
            headerShown: false,
            gestureEnabled: false,
        }}/>
    </Stack.Navigator>)
}


export const NavigationNoSession = () => {
    return (
        <AppStackNoSessionScreen/>
    )
}


export const NavigationSession = () => {
    return (
        <AppStackScreen/>
    )
}

