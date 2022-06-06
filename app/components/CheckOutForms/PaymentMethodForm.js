import React, {useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const payment_methods = [
    {id:1,name:"Pagar al alojamiento"},
    {id:2,name:"Tarjeta de crédito"},
    {id:3,name:"Tarjeta de débito"}];

const CheckPaymentMethodsCustom = ({options, selected, setSelected, ...props}) => {
    return (
        <View style={{height: SCREEN_WIDTH * .44, flexDirection: 'column', width: '100%', alignSelf: 'center', marginBottom: 10}}>
            {
                options.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{flex: 1}} onPress={() => setSelected(item.id)}>
                                <View style={{flex: 1}}>
                                    <View style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: SCREEN_WIDTH * .08,
                                            height: SCREEN_WIDTH * .08,
                                            borderRadius: SCREEN_WIDTH * .08,
                                            borderWidth: SCREEN_WIDTH * .008,
                                            borderColor: item.id === selected ? props.app.primaryColor : 'gray'
                                        }}>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: SCREEN_WIDTH * .044,
                                                height: SCREEN_WIDTH * .044,
                                                borderRadius: SCREEN_WIDTH * .03,
                                                backgroundColor: item.id === selected ? props.app.primaryColor : 'transparent'
                                            }}/>
                                        </View>
                                        <Text style={{marginLeft:10,alignSelf: 'center'}}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                )
            }
        </View>
    )
}

const PaymentMethodForm =({payment, setPayment,...props})=>{
    const navigation = useNavigation();

    return(
        <View style={{paddingTop:SCREEN_WIDTH * .07,paddingHorizontal:SCREEN_WIDTH * .07}}>
            <Text style={{fontSize:textSizeRender(5.7),fontWeight:'bold'}}>Ya casi está! Completá tu datos y finaliza la compra</Text>
            <View style={{marginTop:20}}>
                <Text style={{fontSize:textSizeRender(4.5),fontWeight:'bold'}}>Como querés pagar? </Text>
                <Text style={{marginTop:5,color:props.app.primaryColor,fontSize:textSizeRender(4.5),fontWeight:'600'}}>Ver condiciones</Text>
            </View>
            <View style={{paddingTop:20}}>
                {
                    props.error &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>Es requerido</Text>
                }
                <CheckPaymentMethodsCustom app={props.app}
                                           options={payment_methods}
                                           selected={payment}
                                   setSelected={setPayment}/>
            </View>
            <View style={{width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>

            {

                props.preOrder.card?
                    <View style={{paddingTop:SCREEN_WIDTH * .07}}>
                        <View style={{
                            paddingHorizontal:20,
                            marginTop:SCREEN_WIDTH * .01,
                            width:'100%',
                            height:SCREEN_WIDTH *.25,
                            backgroundColor:'white',
                            borderWidth:1,
                            borderColor:'#b0b0b0',
                            borderRadius:5,
                            alignItems:'center',
                            flexDirection:'row'
                        }}>
                            <View style={{
                                flex:.5,
                                alignItems:'center',
                                marginRight:10,
                            }}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        navigation.navigate("AddCardScreen");
                                    }}

                                    style={{
                                        width:'80%',
                                        height:SCREEN_WIDTH *.12,
                                        backgroundColor:'white',
                                        borderWidth:1,
                                        borderColor:'#b0b0b0',
                                        borderRadius:5,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}>
                                    <AntDesign name="plus" size={24} color={props.app.primaryColor} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{
                                color:'#525252',
                                fontSize:textSizeRender(3.5),fontWeight:'bold'
                            }}>Tarjeta </Text>
                            <Text style={{
                                color:'#525252',
                                fontSize:textSizeRender(3.5),fontWeight:'bold'
                            }}>*******{ props.preOrder.card.numberCard.substr(-4)}
                            </Text>
                        </View>
                    </View>

                    :
                <View style={{paddingTop:SCREEN_WIDTH * .07}}>
                    <Text style={{fontSize:textSizeRender(5.2),fontWeight:'bold'}}>Seleccioná la tarjeta de crédito</Text>
                    <View style={{
                        paddingHorizontal:20,
                        marginTop:SCREEN_WIDTH * .07,
                        width:'100%',
                        height:SCREEN_WIDTH *.25,
                        backgroundColor:'white',
                        borderWidth:1,
                        borderColor:'#b0b0b0',
                        borderRadius:5,
                        alignItems:'center',
                        flexDirection:'row'
                    }}>
                        <View style={{
                            flex:.5,
                            alignItems:'center',
                            marginRight:10,
                        }}>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate("AddCardScreen");
                                }}

                                style={{
                                width:'80%',
                                height:SCREEN_WIDTH *.12,
                                backgroundColor:'white',
                                borderWidth:1,
                                borderColor:'#b0b0b0',
                                borderRadius:5,
                                alignItems:'center',
                                justifyContent:'center',
                            }}>
                                <AntDesign name="plus" size={24} color={props.app.primaryColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex:1,
                            marginLeft:10,
                        }}>
                            <Text style={{
                                color:'#525252',
                                fontSize:textSizeRender(3.5),fontWeight:'bold'
                            }}>{"Seleccioná tu tarjeta\n(solo tarjeta de crédito)."}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop:SCREEN_WIDTH * .07,
                        width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>
                </View>
            }

        </View>
    )
}
export default PaymentMethodForm;
