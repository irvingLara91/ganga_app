import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, textSizeRender, validEmail} from "../../utils/utils";

const EmailForm =({send,...props})=>{
    const [email, setEmail] = useState(null);
    const [isEmailError, setIsEmailError] = useState(false);


    const validateData = () => {
        setIsEmailError(false);
        let isError = false
        if (validEmail(email).error){
            setIsEmailError(true);
            isError = true
        }
        return isError;
    }

    const sendData = () => {
        if (validateData()) {
            return
        }

        let data = {
            email
        }
        send(data);
    }

    return(<View style={{
        marginTop: SCREEN_WIDTH * .04
    }}>

        <View>
            <Text style={{
                marginTop: SCREEN_WIDTH * .01,
                fontSize: textSizeRender(3.6),
                marginBottom: SCREEN_WIDTH * .01
            }}>Agregá los emails con los que compraste, para ver todas tus reservas en Mis Viajes.</Text>
        </View>

        <View>
            <Text style={{
                fontWeight:'bold',
                color:props.app.primaryColor,
                marginTop: SCREEN_WIDTH * .04,
                fontSize: textSizeRender(6),
                marginBottom: SCREEN_WIDTH * .02
            }}>{props.email}</Text>
            <Text style={{
                fontWeight:'bold',
                fontSize: textSizeRender(4),
            }}>Verificado·Principal</Text>
        </View>
        {/*****EMAIL******/}
        <View style={{marginTop: SCREEN_WIDTH * .06}}>
            <Text style={{
                fontSize: textSizeRender(4),
                fontWeight: 'bold',
                marginBottom: SCREEN_WIDTH * .02
            }}>AGREGAR EMAIL</Text>

            <TextInput
                autoCapitalize={'none'}
                keyboardType='email-address'
                onChangeText={text => {
                    setIsEmailError(false);
                    setEmail(text)
                }}
                value={email}
                placeholder={""}
                style={[styled.input, {borderColor: isEmailError ? 'red' : 'gray'}]}/>
            {
                isEmailError &&
                <Text style={{
                    marginTop: 5,
                    marginLeft: 5,
                    color: 'red',
                    fontSize: textSizeRender(3),
                }}>{validEmail(email).message}</Text>
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
                }}>AGREGAR</Text>
            </TouchableOpacity>
        </View>

    </View>)
}
const styled = StyleSheet.create({
    input: {
        fontSize: textSizeRender(4),
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .025,
        borderWidth: 1, borderColor: 'gray'
    },
});
export default EmailForm;
