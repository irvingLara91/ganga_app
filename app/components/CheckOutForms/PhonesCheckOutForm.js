import React, {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import CountryPicker from 'react-native-country-picker-modal'
import {MaterialIcons} from "@expo/vector-icons";
import {Actionsheet, Box, ScrollView} from "native-base";
import SelectGenericComponent from "./SelectGenericComponent";

const SelectComponent = ({send, selected, options = [], title = "Seleccione", ...props}) => {

    const sendData = (item) => {
        send(item)
    }

    return (
        <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
            <Actionsheet.Content bg={'white'}>
                <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: textSizeRender(5)
                    }}>
                        {title}
                    </Text>
                </Box>
                <ScrollView style={{width: '100%'}}>
                    {
                        options.length >0  ?
                        options.map(item => {
                            return (
                                <Actionsheet.Item
                                    _pressed={{
                                        bg: selected === item ? 'red.100' : 'red.100',
                                        _text: {
                                            fontSize: textSizeRender(4.3),
                                        }
                                    }}

                                    bg={selected === item ? 'red.100' : 'white'}

                                    key={item} onPress={() => {
                                    sendData(item);
                                }}>{"+"+item}</Actionsheet.Item>
                            )
                        })
                            :
                            <Text style={{
                                fontSize:textSizeRender(5),
                                fontWeight:'500',
                                textAlign:'center'
                            }}>No se tiene areas</Text>
                    }
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}



const PhonesCheckOutForm =({
                               country,setCountry,
                               area,setArea,
                               phone,setPhone,
                               checkWhatsapp,
                                setCheckWhatsapp,
                               isCountryError,
                               isAreaError,
                               isPhoneError,
                               ...props})=>{

    const [areas,setAreas] = useState(null);
    const [errorAreas,setErrorAreas] = useState(null);
    const [open,setOpen] = useState(false);

    const onClose = () => {
        setOpen(false)
    };

    useEffect(() => {
        if (country){
            setArea(null)
            setAreas(country.callingCode);
        }
        return () => {
            setAreas(null)
        };
    }, [country]);


    return(
        <View style={{paddingTop: SCREEN_WIDTH * .07, paddingHorizontal: SCREEN_WIDTH * .07}}>
            <Text style={{fontSize: textSizeRender(5.2), fontWeight: 'bold'}}>A que número podemos llamarte</Text>

            <View>

            </View>


            {/*****Country******/}
            <View style={{
                marginTop: 20,
                marginBottom: 15}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>Código de país</Text>

                <View>
                    <CountryPicker
                        placeholder={''}
                        containerButtonStyle={[{
                                fontSize: textSizeRender(4),
                                borderRadius: SCREEN_WIDTH * .011,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: Platform.OS ==="ios" ?  SCREEN_WIDTH * .11 : SCREEN_WIDTH * .12,
                                borderWidth: 1,
                            }, {borderColor: isCountryError || errorAreas ? 'red' : 'gray'}]}
                        filterProps={{placeholder:"Buscador"}}
                        withFilter={true}
                        withEmoji={true}
                        withCallingCode={true}
                        withCountryNameButton={true}
                        countryCode={country ? country.cca2  : ""}
                        withFlag={true}
                        withCurrency={true}
                        translation={"spa"}
                        withModal={true}
                        withFlagButton={true}
                        onSelect={(response)=>{
                            setCountry(response)
                        }}
                    />
                </View>
                {
                    isCountryError || errorAreas ?
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>Es requerido</Text>
                        :
                        null
                }
            </View>

            {/*****AREA*****/}
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0, marginRight: 0}}>
                    <Text style={{
                        fontSize: textSizeRender(4),
                        fontWeight: 'bold',
                        marginBottom: SCREEN_WIDTH * .02
                    }}>Área</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            if (areas!==null){
                                setOpen(true)
                                setErrorAreas(false)
                            }else {
                                setErrorAreas(true)
                            }

                        }}
                        style={[{
                            paddingHorizontal: 10,
                            backgroundColor: 'white',
                            height: Platform.OS === "ios" ? SCREEN_WIDTH * .105 : SCREEN_WIDTH * .12,
                            borderRadius: SCREEN_WIDTH * .011,
                            width: SCREEN_WIDTH * .32,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1
                        }, {
                            flexDirection:'row',
                            borderColor: isAreaError ? 'red' : 'gray'}]}>
                        <View style={{flex: 1}}>
                            <Text style={{
                                fontWeight: '800',
                                fontSize: textSizeRender(3.2)
                            }}>{area ? "+"+area : "Select"}</Text>
                        </View>
                        <View>
                            <MaterialIcons name="keyboard-arrow-down" size={textSizeRender(8)}
                                           color={'black'}/>
                        </View>
                    </TouchableOpacity>
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
                <View style={{flex: 1, marginLeft: 10}}>
                    <Text style={{
                        fontSize: textSizeRender(4),
                        fontWeight: 'bold',
                        marginBottom: SCREEN_WIDTH * .02
                    }}>Número</Text>
                    <TextInput
                        onChangeText={text => {
                            setPhone(text)
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
            <View style={{marginTop: 20}}>
                <TouchableOpacity
                    style={{flex: 1}} onPress={() => setCheckWhatsapp(!checkWhatsapp)}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: SCREEN_WIDTH * .09,
                                height: SCREEN_WIDTH * .09,
                                borderRadius: SCREEN_WIDTH * .08,
                                borderWidth: SCREEN_WIDTH * .007,
                                borderColor: checkWhatsapp ? props.app.primaryColor : 'gray'
                            }}>
                                <View style={{
                                    width: SCREEN_WIDTH * .05,
                                    height: SCREEN_WIDTH * .05,
                                    borderRadius: SCREEN_WIDTH * .03,
                                    backgroundColor: checkWhatsapp ? props.app.primaryColor : 'transparent'
                                }}/>
                            </View>
                            <Text style={{
                                fontSize: textSizeRender(3.5),
                                fontWeight: 'bold',
                                marginLeft: 10, alignSelf: 'center'
                            }}>{"Quiero recibir notificacines vía Whatsapp\ny SMS"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop:SCREEN_WIDTH * .07,
                width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>

            {
                open &&
                <SelectComponent
                    app={props.app}
                    options={areas}
                    selected={area}
                    send={(item) => {
                        setArea(item)
                        onClose()
                    }}
                    isOpen={open}
                    onClose={onClose}
                />

            }
        </View>
    )
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
export default PhonesCheckOutForm;
