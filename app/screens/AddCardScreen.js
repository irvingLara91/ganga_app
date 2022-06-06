import React, {useEffect, useState} from "react";
import {View, TextInput, Text, StyleSheet,TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addInfoToPreOrder} from "../redux/preOrderDuck";
import ContainerGeneric from "../components/ScreenContainers/ContainerGeneric";
import {SCREEN_WIDTH, textSizeRender} from "../utils/utils";
import _ from 'lodash';
import yearMonthDateField from "react-native-datefield/src/YearMonthDateField";

const AddCardScreen = (props) => {

    const [fullName,setNameFull]=useState('');
    const [errorName,setErrorName]=useState(false);

    const [numberCard,setNumberCard]=useState(null);
    const [errorNumber,setErrorNumber]=useState(false);

    const [cardExpiry,setCardExpiry]=useState(null);
    const [errorExpiry,setErrorExpiry]=useState(false);

    const [cvv,setCvv]=useState(null);
    const [errorCvv,setErrorCvv]=useState(false);


    const onChange = (event) => {
        let value = event.nativeEvent.text
        const expDateFormatter = value.replace(/\//g, "").substring(0, 2) + (value.length > 2 ? '/' : '') + value.replace(/\//g, "").substring(2, 4);
        ///console.log(expDateFormatter)
        setCardExpiry(expDateFormatter)
    }

    const valCard =()=>{
        let error = false;
        setErrorName(false);
        setErrorNumber(false);
        setErrorExpiry(false);
        setErrorCvv(false);
        if (fullName.trim()===""){
            error = true;
            setErrorName(true);
        }

        if (numberCard === null || numberCard.length < 16){
            error = true;
            setErrorNumber(true);
        }

        if (cardExpiry===null || cardExpiry.length<5){
            error = true
            setErrorExpiry(true);
        }

        if (cvv===null || cvv.length < 3){
            error = true;
            setErrorCvv(true);
        }

        return error;
    }



    const send=()=>{
        if (valCard()){
            return;
        }
        const start = `/`;
        const month = cardExpiry.split(start)[0]
        const year = cardExpiry.split(start)[1]


        let card = {
            fullName,
            numberCard,
            month,
            year,
            cvv
        }

        //console.log("card",card)
        props.addInfoToPreOrder({card:card})
        props.navigation.goBack()

    }


    return (
        <ContainerGeneric app={props.app} title={"Agregar tarjeta"} isForm={false}>
            <View style={{paddingTop: SCREEN_WIDTH * .05, paddingHorizontal: SCREEN_WIDTH * .05}}>
                <View style={{
                    marginVertical:20
                }}>
                    <Text>Nombre Completo</Text>
                    <TextInput
                        value={fullName}
                        onChangeText={text => {
                            setNameFull(text)
                        }}
                        placeholder={"Nombre completo"}
                        style={[styled.input, {borderColor: errorName ? 'red' : 'gray'}]}/>

                    {
                        errorName &&
                        <Text style={{
                            marginTop: 5,
                            marginLeft: 5,
                            color: 'red',
                            fontSize: textSizeRender(3),
                        }}>{'Requirdo nombre completo'}</Text>
                    }
                </View>
                <View>
                    <Text>Numero de tarjeta</Text>
                    <TextInput
                        value={numberCard}
                        onChangeText={text => {
                            setNumberCard(text)
                        }}
                        placeholder={"4242424242424242"}
                        maxLength={19}
                        autoCapitalize={'none'}
                        keyboardType="number-pad"
                        style={[styled.input, {borderColor: errorNumber ? 'red' : 'gray'}]}/>
                    {
                        errorNumber &&
                        <Text style={{
                            marginTop: 5,
                            marginLeft: 5,
                            color: 'red',
                            fontSize: textSizeRender(3),
                        }}>{'Requirdo número de tarjeta'}</Text>
                    }
                </View>

                <View style={{flexDirection:'row', marginVertical:20}}>
                    <View style={{flex:1,marginRight:5}}>
                        <Text>Fecha de expiración</Text>
                        <TextInput
                            placeholder={"MM/YY"}
                            value = {cardExpiry}
                            onChange={(event) => onChange(event)}
                            autoCapitalize={'none'}
                            keyboardType="number-pad"
                            maxLength={5}
                            style={[styled.input, {borderColor: errorExpiry ? 'red' : 'gray'}]}/>

                        {
                            errorExpiry &&
                            <Text style={{
                                marginTop: 5,
                                marginLeft: 5,
                                color: 'red',
                                fontSize: textSizeRender(3),
                            }}>{'Requirdo fecha de expiración'}</Text>
                        }
                    </View>
                    <View style={{flex:1,marginLeft:5}}>
                    <Text>CVV</Text>
                        <TextInput
                            value={cvv}
                            onChangeText={text => {
                                setCvv(text)
                            }}
                            secureTextEntry={true}
                            placeholder={"CVV"}
                            autoCapitalize={'none'}
                            keyboardType="number-pad"
                            maxLength={4}
                            style={[styled.input, {borderColor: errorCvv ? 'red' : 'gray'}]}/>
                        {
                            errorCvv &&
                            <Text style={{
                                marginTop: 5,
                                marginLeft: 5,
                                color: 'red',
                                fontSize: textSizeRender(3),
                            }}>{'Requirdo cvv'}</Text>
                        }
                    </View>
                </View>

                <View style={{
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    height:SCREEN_WIDTH * .15}}>
                    <TouchableOpacity
                        onPress={send}
                        style={[styled.buttonStyle,{backgroundColor: props.app.primaryColor}]}>
                        <Text style={styled.textButton}>agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ContainerGeneric>
    )

}

const styled = StyleSheet.create({
    input: {
        fontSize: textSizeRender(4),
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .025,
        borderWidth: 1
    },
    buttonStyle:{
        width:'60%',
        height:'80%',
        borderRadius: SCREEN_WIDTH,
        justifyContent:'center',
        alignItems:'center'
    },
    textButton:{
        color:'white',
        fontSize:textSizeRender(4),
        fontWeight:'bold'
    }
});


const mapState = (state) => {
    return {
        app: state.app,
        auth: state.auth,
        preOrder: state.preOrder
    }
}
export default connect(mapState, {addInfoToPreOrder})(AddCardScreen);
