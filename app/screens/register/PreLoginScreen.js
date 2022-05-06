import React from "react";
import {connect} from "react-redux";
import {View, Text, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, statusBarHeight, textSizeRender} from "../../utils/utils";
import ToolbarRegister from "../../components/Toolbars/ToolbarRegister";
import {MaterialCommunityIcons} from '@expo/vector-icons';

const PreLoginScreen = (props) => {

    return (
        <View style={{
            flex: .89,
            paddingTop: statusBarHeight + 50,
            backgroundColor: props.app.secondaryColor,
        }}>
            <ToolbarRegister app={props.app} screen={"Prelogin"}/>
            <View style={{width: '100%', height: '100%', alignItems: 'center'}}>

                <View style={{
                    alignItems: 'center',
                    marginTop: statusBarHeight
                }}>
                    <Text style={{
                        color: props.app.primaryColor,
                        fontWeight: 'bold',
                        fontSize: textSizeRender(5.1)
                    }}>
                        Bienvenidos a Ganga Hoteles
                    </Text>
                    <Text style={{
                        marginTop: SCREEN_WIDTH * .03,
                        color: '#727272',
                        fontSize: textSizeRender(4.1)
                    }}>
                        ES LO QUE TIENE QUE SER Y ES LOW COST.
                    </Text>
                </View>
                <View style={{
                    width: SCREEN_WIDTH,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: SCREEN_WIDTH,
                    marginTop: statusBarHeight
                }}>
                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.navigate("LoginScreen")
                        }}
                        style={{
                            borderRadius: SCREEN_WIDTH * .5,
                            borderWidth: 1.5,
                            backgroundColor: props.app.fontColorWhite,
                            borderColor: props.app.primaryColor,
                            padding: SCREEN_WIDTH * .045,
                            flexDirection: 'row', alignItems: 'center'
                        }}
                    >
                        <View style={{flex: 0, marginRight: SCREEN_WIDTH * .04}}>
                            <MaterialCommunityIcons
                                name="email" size={SCREEN_WIDTH * .07}
                                color={props.app.primaryColor}
                            />
                        </View>
                        <View style={{flex: 0, marginRight: SCREEN_WIDTH * .03}}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: textSizeRender(4)
                            }}>INGRESAR CON TU MAIL</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.navigate("RegisterScreen")
                        }}
                        style={{
                            width:'50%',
                            marginTop: statusBarHeight,
                            borderRadius: SCREEN_WIDTH * .5,
                            backgroundColor: props.app.primaryColor,
                            padding: SCREEN_WIDTH * .035,
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                                color:props.app.fontColorWhite,
                                fontSize: textSizeRender(4)
                            }}>REGISTRATE</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
};
const mapState = (state) => {
    return {
        app: state.app
    }
};
export default connect(mapState)(PreLoginScreen);
