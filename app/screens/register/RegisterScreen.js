import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import ContainerRegister from "../../components/ScreenContainers /ContainerRegister";
import {
    checkPasswordValidity,
    SCREEN_WIDTH,
    statusBarHeight,
    textSizeRender,
    validEmail
} from "../../utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";
import {doLoginAction} from "../../redux/authDuck";

const RegisterScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const onRegister=()=>{

        if (validEmail(email).error){
            alert(validEmail(email).message)
            return
        }

        if (checkPasswordValidity(password).caracteres &&
            checkPasswordValidity(password).numero &&
            checkPasswordValidity(password).mayuscula &&
            checkPasswordValidity(password).minuscula
        ){
            props.doLoginAction({email,password}).then(response=>{
                alert(response.message)
            }).catch(e=>{});
        }

    }



    return (
        <ContainerRegister title={"Registro"} app={props.app}>
            <View style={{width: '100%', paddingBottom: 20}}>

                <View style={{
                    alignItems: 'center',
                    marginTop: statusBarHeight,
                    paddingHorizontal: SCREEN_WIDTH * .08
                }}>
                    <Text style={{
                        color: props.app.primaryColor,
                        fontWeight: 'bold',
                        fontSize: textSizeRender(6)
                    }}>
                        Creá tu cuenta
                    </Text>
                    <Text style={{
                        marginTop: SCREEN_WIDTH * .03,
                        color: '#727272',
                        fontSize: textSizeRender(4.1)
                    }}>
                        Te deseamos una feliz estadía en nuestra app.
                    </Text>
                </View>
                <View style={{
                    paddingTop: statusBarHeight - 20,
                    paddingHorizontal: SCREEN_WIDTH * .12
                }}>
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            marginBottom: SCREEN_WIDTH * .03,
                            fontSize: textSizeRender(4.5),
                        }}>EMAIL</Text>
                        <TextInput
                            autoCapitalize={'none'}
                            placeholder={"Ingresá tu mail"}
                            keyboardType={'email-address'}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={{
                                fontSize: textSizeRender(4),
                                borderRadius: SCREEN_WIDTH * .011,
                                backgroundColor: props.app.fontColorWhite,
                                padding: SCREEN_WIDTH * .04,
                                borderWidth: 1, borderColor: 'gray'
                            }}/>
                    </View>

                    <View style={{
                        marginTop: SCREEN_WIDTH * .08,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            marginBottom: SCREEN_WIDTH * .03,
                            fontSize: textSizeRender(4.5),
                        }}>CONTRASEÑA</Text>
                        <View style={{
                            flexDirection: 'row',
                            fontSize: textSizeRender(4),
                            borderRadius: SCREEN_WIDTH * .011,
                            backgroundColor: props.app.fontColorWhite,
                            padding: SCREEN_WIDTH * .04,
                            borderWidth: 1, borderColor: 'gray'
                        }}>
                            <TextInput
                                placeholder={"Ingresá tu contraseña"}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                style={{
                                    flex: 1
                                }}/>
                            <TouchableOpacity
                                onPress={() => setShowPassword((prevState) => !prevState)}
                                style={{
                                    flex: 0
                                }}>
                                {

                                    showPassword ?
                                        <Feather name="eye" size={textSizeRender(5)} color={props.app.primaryColor}/>
                                        :
                                        <Feather name="eye-off" size={textSizeRender(5)}
                                                 color={props.app.primaryColor}/>

                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{justifyContent: 'center'}}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 15, marginBottom: 15
                        }}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                                    {
                                        checkPasswordValidity(password).caracteres ?
                                            <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                            :
                                            <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                                    }
                                </View>
                                <View style={{flex: 0}}>
                                    <Text style={{
                                        fontSize: textSizeRender(3),
                                        color: checkPasswordValidity(password).caracteres ? 'green' : 'red'
                                    }}>8 Caracteres</Text>
                                </View>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                                    {
                                        checkPasswordValidity(password).minuscula ?
                                            <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                            :
                                            <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                                    }
                                </View>
                                <View style={{flex: 0}}>
                                    <Text style={{
                                        fontSize: textSizeRender(3),
                                        color: checkPasswordValidity(password).minuscula ? 'green' : 'red'
                                    }}>Una minúscula</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                                    {
                                        checkPasswordValidity(password).mayuscula ?
                                            <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                            :
                                            <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                                    }
                                </View>
                                <View style={{flex: 0}}>
                                    <Text style={{
                                        fontSize: textSizeRender(3),
                                        color: checkPasswordValidity(password).mayuscula ? 'green' : 'red'
                                    }}>Una mayúscula</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                                    {
                                        checkPasswordValidity(password).numero ?
                                            <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                            :
                                            <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                                    }
                                </View>
                                <View style={{flex: 0}}>
                                    <Text style={{
                                        fontSize: textSizeRender(3),
                                        color: checkPasswordValidity(password).numero ? 'green' : 'red'
                                    }}>Un número</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        marginTop: SCREEN_WIDTH * .08,
                    }}>
                        <TouchableOpacity
                            onPress={()=>onRegister()}
                            style={{
                                fontSize: textSizeRender(4),
                                borderRadius: SCREEN_WIDTH,
                                backgroundColor: props.app.primaryColor,
                                padding: SCREEN_WIDTH * .04,
                            }}>
                            <Text style={{
                                fontSize: textSizeRender(4),
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: props.app.fontColorWhite
                            }}>CREAR CUENTA</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </ContainerRegister>
    )
};
const mapState = (state) => {
    return {
        app: state.app
    };
};

export default connect(mapState,{doLoginAction})(RegisterScreen);
