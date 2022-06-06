import React, {useState,useEffect} from "react";
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import CountryPicker from "react-native-country-picker-modal";
import {MaterialIcons} from "@expo/vector-icons";
import {Actionsheet, Box, ScrollView} from "native-base";

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



const PhonesForm = ({send, ...props}) => {
    const [country, setCountry] = useState(null);
    const [isCountryError, setIsCountryError] = useState(false);

    const [area, setArea] = useState(null);
    const [isAreaError, setIsAreaError] = useState(false);

    const [phone, setPhone] = useState("");
    const [isPhoneError, setIsPhoneError] = useState(false);


    const [areas,setAreas] = useState(null);
    const [errorAreas,setErrorAreas] = useState(null);
    const [open,setOpen] = useState(false);

    const onClose = () => {
        setOpen(false)
    };

    useEffect(() => {
        if (country){
            setArea(null)
            console.log(country)
            setAreas(country.callingCode);
        }
        return () => {
            setAreas(null)
        };
    }, [country]);



    const validateData = () => {
        setIsCountryError(false);
        setIsAreaError(false);
        setIsPhoneError(false);
        let isError = false
        if (country === null) {
            setIsCountryError(true);
            isError = true
        }
        if (area === null) {
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
            country: country.name,
            area:area,
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
        </View>

        {/*****AREA*****/}
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0, marginRight: 10}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>ÁREA</Text>

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
    </View>)
};

const styled = StyleSheet.create({
    input: {
        fontSize: textSizeRender(4),
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .025,
        borderWidth: 1, borderColor: 'gray'
    },
});

export default PhonesForm
