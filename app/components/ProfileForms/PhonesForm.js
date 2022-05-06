import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";

const PhonesForm = ({send, ...props}) => {

    const [country, setCountry] = useState(null);
    const [isCountryError, setIsCountryError] = useState(false);


    const [area, setArea] = useState(null);
    const [isAreaError, setIsAreaError] = useState(false);

    const [phone, setPhone] = useState(null);
    const [isPhoneError, setIsPhoneError] = useState(false);


    const validateData = () => {
        setIsCountryError(false);
        setIsAreaError(false);
        setIsPhoneError(false);
        let isError = false
        if (country.trim() === "") {
            setIsCountryError(true);
            isError = true
        }
        if (area.trim() === "") {
            setIsAreaError(true);
            isError = true
        }
        if (phone.trim() === "") {
            setIsPhoneError(true);
            isError = true
        }
        return isError;
    }


    const sendData = () => {
        if (validateData()) {
            return
        }

        let data = {
            country,
            area,
            phone
        }
         send(data);
    }


    return (<View style={{
        marginTop: SCREEN_WIDTH * .04
    }}>

        {/*****Country******/}
        <View style={{marginBottom: 15}}>
            <Text style={{
                fontSize: textSizeRender(4),
                fontWeight: 'bold',
                marginBottom: SCREEN_WIDTH * .02
            }}>PAIS</Text>
            <TextInput
                onChangeText={text => {
                    setCountry(text)
                    setIsCountryError(false)
                }}
                value={country}
                placeholder={""}
                style={[styled.input, {borderColor: isCountryError ? 'red' : 'gray'}]}/>
            {
                isCountryError &&
                <Text style={{
                    marginTop: 5,
                    marginLeft: 5,
                    color: 'red',
                    fontSize: textSizeRender(3),
                }}>Es requerido</Text>
            }
        </View>

        {/*****AREA*****/}
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5, marginRight: 10}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>ÁREA</Text>
                <TextInput
                    onChangeText={text => {
                        setArea(text)
                        setIsAreaError(false)
                    }}
                    value={area}
                    keyboardType='phone-pad'
                    placeholder={""}
                    style={[styled.input, {borderColor: isAreaError ? 'red' : 'gray'}]}/>
                {
                    isAreaError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>Es requerido</Text>
                }
            </View>
            <View style={{flex: 1}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>TELÉFONO</Text>
                <TextInput
                    onChangeText={text => {
                        setPhone(text)
                        setIsPhoneError(false)
                    }}
                    keyboardType='phone-pad'
                    value={phone}
                    placeholder={""}
                    style={[styled.input, {borderColor: isPhoneError ? 'red' : 'gray'}]}/>
                {
                    isPhoneError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>Es requerido</Text>
                }
            </View>

        </View>
        <View>
            <Text style={{
                marginTop: SCREEN_WIDTH * .04,
                fontSize: textSizeRender(3.6),
                marginBottom: SCREEN_WIDTH * .04
            }}>Agregá tus teléfonos para que podamos contactarte en caso que ocurra algún cambio.</Text>
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
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
};

const styled = StyleSheet.create({
    input: {
        fontSize: textSizeRender(4),
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .04,
        borderWidth: 1, borderColor: 'gray'
    },
});

export default PhonesForm
