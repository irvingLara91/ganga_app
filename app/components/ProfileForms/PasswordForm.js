import React, {useState} from "react";
import {checkPasswordValidity, SCREEN_WIDTH, textSizeRender, validEmail} from "../../utils/utils";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";

const PasswordForm = ({send,...props}) =>{
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


    const [currentPasswordError, setCurrentPasswordError] = useState(false);

    const [matchPasswordError, setMatchPasswordError] = useState(false);


    const validateData = () => {
        setCurrentPasswordError(false);
        setMatchPasswordError(false);
        let isError = false

        if (currentPassword.trim()===""){
            setCurrentPasswordError(true);
            isError = true
        }

        if (newPassword !== confirmationPassword || confirmationPassword.trim() === "") {
            setMatchPasswordError(true);
            isError = true
        }
        return isError;
    }

    const sendData = () => {

        if (validateData()) {
            return
        }
        if (checkPasswordValidity(newPassword).caracteres &&
            checkPasswordValidity(newPassword).numero &&
            checkPasswordValidity(newPassword).mayuscula &&
            checkPasswordValidity(newPassword).minuscula
        ) {

            let data = {
                currentPassword,
                newPassword,
                confirmationPassword
            }

            send(data)
        }
    }


    return (
        <View style={{
            marginTop: SCREEN_WIDTH * .04
        }}>
            <View>
                <Text style={{
                    marginTop: SCREEN_WIDTH * .01,
                    fontSize: textSizeRender(3.6),
                    marginBottom: SCREEN_WIDTH * .01
                }}>Agregá los emails con los que compraste, para ver todas tus reservas en Mis Viajes.</Text>
            </View>

            {/*****CONTRASEÑA ACTUAL******/}
            <View style={{marginTop: SCREEN_WIDTH * .06}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>CONTRASEÑA ACTUAL</Text>

                <View style={{
                    flexDirection: 'row',
                    fontSize: textSizeRender(4),
                    borderRadius: SCREEN_WIDTH * .011,
                    backgroundColor: props.app.fontColorWhite,
                    padding: SCREEN_WIDTH * .04,
                    borderWidth: 1, borderColor:  currentPasswordError ? 'red' :'gray'
                }}>
                    <TextInput
                        placeholder={"Ingresá tu contraseña"}
                        secureTextEntry={!showPassword}
                        value={currentPassword}
                        onChangeText={text => setCurrentPassword(text)}
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
                {
                    currentPasswordError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>{"Ingrese la contraseña actual"}</Text>
                }
            </View>

            {/*****NUEVA CONTRASEÑA******/}
            <View style={{marginTop: SCREEN_WIDTH * .06}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>NUEVA CONTRASEÑA</Text>

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
                        secureTextEntry={!showPasswordNew}
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        style={{
                            flex: 1
                        }}/>
                    <TouchableOpacity
                        onPress={() => setShowPasswordNew((prevState) => !prevState)}
                        style={{
                            flex: 0
                        }}>
                        {

                            showPasswordNew ?
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
                                checkPasswordValidity(newPassword).caracteres ?
                                    <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                    :
                                    <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                            }
                        </View>
                        <View style={{flex: 0}}>
                            <Text style={{
                                fontSize: textSizeRender(3),
                                color: checkPasswordValidity(newPassword).caracteres ? 'green' : 'red'
                            }}>8 Caracteres</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                            {
                                checkPasswordValidity(newPassword).minuscula ?
                                    <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                    :
                                    <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                            }
                        </View>
                        <View style={{flex: 0}}>
                            <Text style={{
                                fontSize: textSizeRender(3),
                                color: checkPasswordValidity(newPassword).minuscula ? 'green' : 'red'
                            }}>Una minúscula</Text>
                        </View>
                    </View>
                </View>


                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                            {
                                checkPasswordValidity(newPassword).mayuscula ?
                                    <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                    :
                                    <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                            }
                        </View>
                        <View style={{flex: 0}}>
                            <Text style={{
                                fontSize: textSizeRender(3),
                                color: checkPasswordValidity(newPassword).mayuscula ? 'green' : 'red'
                            }}>Una mayúscula</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 0, marginRight: SCREEN_WIDTH * .02}}>
                            {
                                checkPasswordValidity(newPassword).numero ?
                                    <AntDesign name="check" size={textSizeRender(4)} color="green"/>
                                    :
                                    <AntDesign name="close" size={textSizeRender(4)} color="red"/>
                            }
                        </View>
                        <View style={{flex: 0}}>
                            <Text style={{
                                fontSize: textSizeRender(3),
                                color: checkPasswordValidity(newPassword).numero ? 'green' : 'red'
                            }}>Un número</Text>
                        </View>
                    </View>
                </View>
            </View>


            {/*****CONFIRMAR CONTRASEÑA******/}
            <View style={{marginTop: SCREEN_WIDTH * .06}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>CONFIRMA TU NUEVA CONTRASEÑA</Text>

                <View style={{
                    flexDirection: 'row',
                    fontSize: textSizeRender(4),
                    borderRadius: SCREEN_WIDTH * .011,
                    borderColor: matchPasswordError ? 'red' : 'gray',
                    backgroundColor: props.app.fontColorWhite,
                    padding: SCREEN_WIDTH * .04,
                    borderWidth: 1,

                }}>
                    <TextInput
                        placeholder={"Ingresá tu contraseña"}
                        secureTextEntry={!showPasswordConfirm}
                        value={confirmationPassword}
                        onChangeText={text => setConfirmationPassword(text)}
                        style={{
                            flex: 1
                        }}/>
                    <TouchableOpacity
                        onPress={() => setShowPasswordConfirm((prevState) => !prevState)}
                        style={{
                            flex: 0
                        }}>
                        {

                            showPasswordConfirm ?
                                <Feather name="eye" size={textSizeRender(5)} color={props.app.primaryColor}/>
                                :
                                <Feather name="eye-off" size={textSizeRender(5)}
                                         color={props.app.primaryColor}/>

                        }
                    </TouchableOpacity>
                </View>
                {
                    matchPasswordError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>{"Las contraseñas no son iguales"}</Text>
                }
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity
                    onPress={() => sendData()}
                    style={{
                        borderRadius: SCREEN_WIDTH * .05,
                        width: '50%', padding: SCREEN_WIDTH * .03,
                        backgroundColor: props.app.primaryColor
                    }}

                >
                    <Text style={{
                        textAlign: 'center',
                        fontSize: textSizeRender(4),
                        fontWeight: 'bold',
                        color: 'white'
                    }}>GUARDAR</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

const styled = StyleSheet.create({
    input: {
        fontSize: textSizeRender(4),
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .04,
        borderWidth: 1, borderColor: 'gray'
    },
});
export default PasswordForm;
