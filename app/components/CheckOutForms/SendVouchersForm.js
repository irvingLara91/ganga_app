import React, {useState} from "react";
import {SCREEN_WIDTH, textSizeRender, validEmail} from "../../utils/utils";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const SendVouchersForm = ({
                              email,
                              setEmail,
                              confirmEmail,
                              setConfirmEmail,
                              checkNotification,
                              setCheckNotification,
                              ...props
                          }) => {

    return (
        <View style={{paddingTop: SCREEN_WIDTH * .07, paddingHorizontal: SCREEN_WIDTH * .07}}>
            <Text style={{fontSize: textSizeRender(5.2), fontWeight: 'bold'}}>A dónde enviamos tu vouchers?</Text>
            <View style={{marginTop: 20}}>
                <Text style={{fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Adulto</Text>
                <Text style={{marginTop: 5, fontSize: textSizeRender(3.6)}}>
                    El email que elijas será fundamental para que gestiones tu reserva y recibas información importante
                    sobre tu viaje.
                </Text>
                <View style={{marginTop: 20}}>
                    <Text style={{marginBottom: 10, fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Email donde
                        recibirás los vouchers</Text>
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize={'none'}
                        onChangeText={text => {
                            setEmail(text)
                        }}
                        value={email}
                        placeholder={""}
                        style={[styles.input, {borderColor: props.emailError ? 'red' : 'gray'}]}/>
                    {
                        props.emailError &&
                        <Text style={{
                            marginTop: 5,
                            marginLeft: 5,
                            color: 'red',
                            fontSize: textSizeRender(3),
                        }}>{validEmail(email).message}</Text>
                    }
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{marginBottom: 10, fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Confirma tu
                        email</Text>
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize={'none'}
                        onChangeText={text => {
                            setConfirmEmail(text)
                        }}
                        value={confirmEmail}
                        placeholder={""}
                        style={[styles.input, {borderColor: props.confirmEmailError ? 'red' : 'gray'}]}/>
                </View>
                {
                    props.confirmEmailError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>{validEmail(confirmEmail).error ? validEmail(confirmEmail).message :
                        "La confirmación del email no coincide"
                    }</Text>
                }
                <View style={{marginTop: 20}}>
                    <TouchableOpacity
                        style={{flex: 1}} onPress={() => setCheckNotification(!checkNotification)}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: SCREEN_WIDTH * .09,
                                    height: SCREEN_WIDTH * .09,
                                    borderRadius: SCREEN_WIDTH * .08,
                                    borderWidth: SCREEN_WIDTH * .007,
                                    borderColor: checkNotification ? props.app.primaryColor : 'gray'
                                }}>
                                    <View style={{
                                        width: SCREEN_WIDTH * .05,
                                        height: SCREEN_WIDTH * .05,
                                        borderRadius: SCREEN_WIDTH * .03,
                                        backgroundColor: checkNotification ? props.app.primaryColor : 'transparent'
                                    }}/>
                                </View>
                                <Text style={{
                                    fontSize: textSizeRender(3.8),
                                    fontWeight: 'bold',
                                    marginLeft: 10, alignSelf: 'center'
                                }}>{"Quiero recibir notificacines de ofertas"}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop:SCREEN_WIDTH * .07,
                    width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        fontSize: textSizeRender(4),
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .025,
        borderWidth: 1, borderColor: 'gray'
    }

})
export default SendVouchersForm;
