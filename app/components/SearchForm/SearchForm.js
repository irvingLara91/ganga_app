import React, {useState} from "react";
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, textSizeRender, validEmail} from "../../utils/utils";
import {EvilIcons, MaterialIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Actionsheet, Box, ScrollView, TextArea} from 'native-base';
import DateTimePickerCustom from "../DateTimePickerCustom/DateTimePickerCustom";
import moment from "moment";

const ListNumbers = ({send, selected, number = 11, title = "Habitaciones", ...props}) => {

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
                        Array.from(Array(number).keys()).map(item => {
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
                                }}>{item+""}</Actionsheet.Item>
                            )
                        })
                    }
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
const SearchForm = ({send, ...props}) => {
    let today = new Date();


    /** *
     * Data From alert RRROR
     * **/
    const [cityError, setCityError] = useState(false);
    const [dateInitError, setDateInitError] = useState(false);
    const [dateEndError, setDateEndError] = useState(false);
    const [hoursError, setHoursError] = useState(false);
    const [roomError, setRoomError] = useState(false);
    const [personsError, setPersonsError] = useState(false);
    /** *
     *  END Data From alert RRROR
     * **/

    /** *
     * Data From
     * **/
    const [city, setCity] = useState("");
    const [dateInit, setDateInit] = useState(today);
    const [dateEnd, setDateEnd] = useState(today);
    const [hours, setHours] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [persons, setPersons] = useState(0);
    /** *
     *End Data From
     * **/

    const [isDateInitSelected, setIsDateInitSelected] = useState(false);
    const [showInit, setShowInit] = useState(false);
    const [isDateEndSelected, setIsDateEndSelected] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [modeType, setModeType] = useState('date')

    const onChangeDateInit = (selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') {
            setShowInit(false)
        }
        setDateInit(currentDate);
        if (selectedDate !== undefined) {
            setIsDateInitSelected(true)
        }
    };

    const onChangeDateEnd = (selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') {
            setShowEnd(false)
        }
        setDateEnd(currentDate);
        if (selectedDate !== undefined) {
            setIsDateEndSelected(true)
        }
    };


    const [openHour, setOpenHour] = useState(false);

    const onCloseHour = () => {
        setOpenHour(false)
    };

    const [openRoom, setOpenRoom] = useState(false);

    const onCloseRoom = () => {
        setOpenRoom(false)
    };

    const [openPerson, setOpenPerson] = useState(false);

    const onClosePersons = () => {
        setOpenPerson(false)
    };


    const validateFrom = () => {
        setCityError(false)
        setDateInitError(false)
        setDateEndError(false)
        setHoursError(false)
        setRoomError(false)
        setPersonsError(false)
        let isError = false
        if (city.trim() === "") {
            setCityError(true)
            isError = true
        }

        if (!isDateInitSelected) {
            setDateInitError(true)
            isError = true
        }


        if (!props.isMicro) {
            if (!isDateEndSelected) {
                setDateEndError(true)
                isError = true
            }
            if (persons === 0) {
                setPersonsError(true)
                isError = true
            }

            if (rooms === 0) {
                setRoomError(true)
                isError = true
            }
        } else {
            if (hours === 0) {
                setHoursError(true)
                isError = true
            }
        }

        return isError;
    }

    const sendFrom = () => {

        if (validateFrom()) {
            return
        }

        let data = null
        if (!props.isMicro) {
            data = {
                city,
                dateInit : moment(dateInit).format("DD/MM/YYYY"),
                dateEnd : moment(dateEnd).format("DD/MM/YYYY"),
                rooms,
                persons
            }

        } else {
            data = {
                city,
                dateInit : moment(dateInit).format("DD/MM/YYYY"),
                hours
            }
        }

        send(data)

    }

    return (
        <View style={{
            marginTop: SCREEN_WIDTH * .04
        }}>
            {/*****DESTINO******/}
            <View>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>DESTINO</Text>
                <View style={[styled.contentInput, {borderColor: cityError ? 'red' : 'gray'}]}>
                    <View
                        style={{
                            flex: 0,
                            marginRight: 10,
                        }}>

                        <Ionicons name="ios-earth-outline" size={textSizeRender(10)}
                                  color={props.app.primaryColor}/>

                    </View>
                    <TextInput
                        onChangeText={text => {
                            setCity(text)
                        }}
                        value={city}
                        placeholder={"Ingresá una ciudad o alojamiento"}
                        placeholderTextColor={'#727272'}
                        style={{
                            flex: 1,
                            fontSize: textSizeRender(4)
                        }}
                    />
                </View>
                {
                    cityError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>{'Requirdo'}</Text>
                }

            </View>

            {/****FECHAS Y HORA*****/}
            <View style={{
                paddingTop: SCREEN_WIDTH * .05,
            }}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    marginBottom: SCREEN_WIDTH * .02
                }}>FECHAS</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{flex: 1, marginRight: 5}}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowInit(true)
                            }
                            }
                            style={[styled.contentInput, {borderColor: dateInitError ? 'red' : 'gray'}]}>
                            <View style={{
                                flex: 0,
                                marginRight: 10,
                                justifyContent: 'center'
                            }}>

                                <EvilIcons name="calendar" size={textSizeRender(8)}
                                           color={props.app.primaryColor}/>
                            </View>
                            <Text
                                style={{
                                    color: '#727272',
                                    flex: 1,
                                    fontSize: textSizeRender(3)
                                }}
                            >
                                {isDateInitSelected ? moment(dateInit).format('DD/MM/YYYY') : 'Entrada'}

                            </Text>
                        </TouchableOpacity>
                        {
                            dateInitError ?
                                <Text style={{
                                    marginTop: 5,
                                    marginLeft: 5,
                                    color: 'red',
                                    fontSize: textSizeRender(3),
                                }}>{"Requirdos"}</Text>

                            :
                            <View style={{height: textSizeRender(3)}}/>

                        }
                    </View>
                        {
                            !props.isMicro ?
                                <View style={{flex: 1, marginLeft: 5}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        isDateInitSelected ?
                                            setShowEnd(true)
                                            :
                                            alert("Selecciona la fecha de entrada")

                                    }
                                    }
                                    style={[styled.contentInput, {borderColor: dateEndError ? 'red' : 'gray'}]}>
                                    <View style={{
                                        flex: 0,
                                        marginRight: 10,
                                        justifyContent: 'center'
                                    }}>

                                        <EvilIcons name="calendar" size={textSizeRender(8)}
                                                   color={props.app.primaryColor}/>
                                    </View>
                                    <Text
                                        style={{
                                            color: '#727272',
                                            flex: 1,
                                            fontSize: textSizeRender(3)
                                        }}
                                    >
                                        {isDateEndSelected ? moment(dateEnd).format('DD/MM/YYYY') : 'Salida'}

                                    </Text>
                                </TouchableOpacity>
                                    {
                                        dateEndError ?
                                        <Text style={{
                                            marginTop: 5,
                                            marginLeft: 5,
                                            color: 'red',
                                            fontSize: textSizeRender(3),
                                        }}>{"Requirdo"}</Text>

                                        :
                                        <View style={{height: textSizeRender(3)}}/>
                                    }

                                </View>
                                :
                                <View style={{flex: 1, marginLeft: 5}}>
                                <TouchableOpacity
                                    onPress={() => setOpenHour(true)}
                                    style={[styled.contentInput, {borderColor: hoursError ? 'red' : 'gray'}]}>
                                    <View style={{
                                        flex: 0,
                                        marginRight: 10,
                                        justifyContent: 'center'
                                    }}>

                                        <EvilIcons name="calendar" size={textSizeRender(8)}
                                                   color={props.app.primaryColor}/>
                                    </View>
                                    <Text
                                        style={{
                                            color: '#727272',
                                            textAlign: 'center',
                                            flex: 1,
                                            fontSize: textSizeRender(3)
                                        }}
                                    >
                                        {hours} {" Horas"}
                                    </Text>
                                    <View style={{flex: 0}}>
                                        <MaterialIcons name="keyboard-arrow-down" size={textSizeRender(6)}
                                                       color={'#727272'}/>
                                    </View>
                                </TouchableOpacity>
                                    {
                                        hoursError ?
                                        <Text style={{
                                            marginTop: 5,
                                            marginLeft: 5,
                                            color: 'red',
                                            fontSize: textSizeRender(3),
                                        }}>{"Requirdo"}</Text>
                                            :
                                            <View style={{height: textSizeRender(3)}}/>
                                    }

                                </View>
                        }
                </View>
            </View>

            {/****HABITACIONES*****/}
            {
                !props.isMicro &&
                <View style={{
                    paddingTop: SCREEN_WIDTH * .05,
                }}>
                    <Text style={{
                        fontSize: textSizeRender(4),
                        fontWeight: 'bold',
                        marginBottom: SCREEN_WIDTH * .02
                    }}>HABITACIONES</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{flex: 1, marginRight: 5}}>
                            <TouchableOpacity
                                onPress={() => setOpenRoom(true)}
                                style={[styled.contentInput, {
                                    marginBottom: 5,
                                    borderColor: roomError ? 'red' : 'gray'
                                }]}>
                                <View style={{
                                    flex: 0,
                                    marginRight: 10,
                                    justifyContent: 'center'
                                }}>
                                    <MaterialCommunityIcons name="bed-outline" size={textSizeRender(6)}
                                                            color={props.app.primaryColor}/>
                                </View>
                                <Text
                                    style={{
                                        color: '#727272',
                                        textAlign: 'center',
                                        flex: 1,
                                        fontSize: textSizeRender(3)
                                    }}
                                >
                                    {rooms} {"Habitaciones"}
                                </Text>
                                <View style={{flex: 0}}>
                                    <MaterialIcons name="keyboard-arrow-down" size={textSizeRender(6)}
                                                   color={'#727272'}/>
                                </View>
                            </TouchableOpacity>
                            {
                                roomError &&
                                <Text style={{
                                    marginLeft: 5,
                                    color: 'red',
                                    fontSize: textSizeRender(3),
                                }}>{"Requirdo"}</Text>
                            }
                        </View>
                        <View style={{flex: 1, marginLeft: 5}}>
                            <TouchableOpacity
                                onPress={() => setOpenPerson(true)}
                                style={[styled.contentInput, {borderColor: personsError ? 'red' : 'gray'}]}>
                                <View style={{
                                    flex: 0,
                                    marginRight: 10,
                                    justifyContent: 'center'
                                }}>

                                    <MaterialIcons name="emoji-people" size={textSizeRender(6)}
                                                   color={props.app.primaryColor}/>
                                </View>
                                <Text
                                    style={{
                                        color: '#727272',
                                        textAlign: 'center',
                                        flex: 1,
                                        fontSize: textSizeRender(3)
                                    }}
                                >
                                    {persons} {" Personas"}
                                </Text>
                                <View style={{flex: 0}}>
                                    <MaterialIcons name="keyboard-arrow-down" size={textSizeRender(6)}
                                                   color={'#727272'}/>
                                </View>
                            </TouchableOpacity>
                            {
                                personsError &&
                                <Text style={{
                                    marginTop: 5,
                                    marginLeft: 5,
                                    color: 'red',
                                    fontSize: textSizeRender(3),
                                }}>{"Requirdo"}</Text>
                            }
                        </View>
                    </View>
                </View>
            }
            <View style={{alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity
                    onPress={() => sendFrom()}
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
                    }}>BUSCAR</Text>
                </TouchableOpacity>
            </View>
            {
                openHour &&
                <ListNumbers
                    app={props.app}
                    isOpen={openHour}
                    selected={hours}
                    title={"Horas"}
                    send={(item) => {
                        setHours(item);
                        onCloseHour();
                    }} number={11} onClose={onCloseHour}/>
            }

            {
                openRoom &&
                <ListNumbers
                    app={props.app}
                    isOpen={openRoom}
                    selected={rooms}
                    title={"Habitaciones"}
                    send={(item) => {
                        setRooms(item);
                        onCloseRoom();
                    }} number={21} onClose={onCloseRoom}/>
            }

            {
                openPerson &&
                <ListNumbers
                    app={props.app}
                    isOpen={openPerson}
                    selected={persons}
                    title={"Personas"} send={(item) => {
                    setPersons(item);
                    onClosePersons();
                }} number={21} onClose={onClosePersons}/>
            }

            {
                showInit &&
                <DateTimePickerCustom
                    app={props.app}
                    title={'Fecha de entrada'}
                    visible={showInit} setVisible={setShowInit}
                    date={dateInit ? dateInit : new Date()} mode={modeType} minimumDate={today}
                    onChange={onChangeDateInit}
                />
            }

            {
                showEnd &&
                <DateTimePickerCustom
                    app={props.app}
                    title={'Fecha de salida'}
                    visible={showEnd} setVisible={setShowEnd}
                    date={dateEnd ? dateEnd : new Date()} mode={modeType}
                    minimumDate={isDateInitSelected ? dateInit : today}
                    onChange={onChangeDateEnd}
                />
            }
        </View>
    )
};
const styled = StyleSheet.create({
    contentInput: {
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_WIDTH * .15,
        flexDirection: 'row',
        borderRadius: SCREEN_WIDTH * .011,
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * .04,
        borderWidth: 1,
    }
})
export default SearchForm
