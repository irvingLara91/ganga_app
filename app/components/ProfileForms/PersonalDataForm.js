import React, {useEffect,useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import DateField from 'react-native-datefield';
import moment from "moment";

const CheckGenderCustom = ({options, selected, setSelected, ...props}) => {
    return (
        <View style={{height: 70, flexDirection: 'row', width: '100%', alignSelf: 'center', marginBottom: 10}}>
            {
                options.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{flex: 1}} onPress={() => setSelected(index)}>
                                <View style={{flex: 1}}>
                                    <View style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: SCREEN_WIDTH * .09,
                                            height: SCREEN_WIDTH * .09,
                                            borderRadius: SCREEN_WIDTH * .08,
                                            borderWidth: SCREEN_WIDTH * .007,
                                            borderColor: index === selected ? props.app.primaryColor : 'gray'
                                        }}>
                                            <View style={{
                                                width: SCREEN_WIDTH * .05,
                                                height: SCREEN_WIDTH * .05,
                                                borderRadius: SCREEN_WIDTH * .03,
                                                backgroundColor: index === selected ? props.app.primaryColor : 'transparent'
                                            }}/>
                                        </View>
                                        <Text style={{marginLeft:10,alignSelf: 'center'}}>{item}</Text>
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

const PersonalDataForm = ({profile = null, send, ...props}) => {
    const [firstName, setFirstName] = useState('');
    const [isRequestFirstNameError, setIsRequestFirstNameError] = useState(false);

    const [lastName, setLastName] = useState('');
    const [isRequestLastNameError, setIsRequestLastNameError] = useState(false);

    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);


    useEffect(() => {
        if (profile){
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
            setGender(profile.gender)
            setBirthday(profile.birthday)
        }
    }, [profile]);



    const validateData = () => {
        setIsRequestLastNameError(false);
        setIsRequestFirstNameError(false);
        let isError = false
        if (firstName.trim() === "") {
            setIsRequestFirstNameError(true);
            isError = true
        }
        if (lastName.trim() === "") {
            setIsRequestLastNameError(true);
            isError = true
        }
        return isError;
    }

    const sendData = () => {
        if (validateData()) {
            return
        }

        let data = {
            firstName,
            lastName,
            birthday,
            gender
        }
        send(data);
    }

    return (
        <View style={{
        marginTop: SCREEN_WIDTH * .04
    }}>
        {/*****FIRSTNAME******/}
        <View>
            <Text style={{
                fontSize: textSizeRender(4),
                fontWeight: 'bold',
                marginBottom: SCREEN_WIDTH * .02
            }}>NOMBRES</Text>
            <Text style={{
                fontSize: textSizeRender(3.5),
                marginBottom: SCREEN_WIDTH * .04
            }}>Como figura en el documneto de viaje</Text>
            <TextInput
                onChangeText={text => {
                    setIsRequestFirstNameError(false)
                    setFirstName(text)
                }}
                value={firstName}
                placeholder={"Escribe tu nombre"}
                style={[styled.input, {borderColor: isRequestFirstNameError ? 'red' : 'gray'}]}/>
            {
                isRequestFirstNameError &&
                <Text style={{
                    marginTop: 5,
                    marginLeft: 5,
                    color: 'red',
                    fontSize: textSizeRender(3),
                }}>Es requerido</Text>
            }
        </View>

        {/*****LASTNAME******/}
        <View style={{marginTop: SCREEN_WIDTH * .06}}>
            <Text style={{
                fontSize: textSizeRender(4),
                fontWeight: 'bold',
                marginBottom: SCREEN_WIDTH * .02
            }}>APELLIDOS</Text>
            <Text style={{
                fontSize: textSizeRender(3.5),
                marginBottom: SCREEN_WIDTH * .04
            }}>Como figura en el documneto de viaje</Text>
            <TextInput
                onChangeText={text => {
                    setIsRequestLastNameError(false);
                    setLastName(text)
                }}
                value={lastName}
                placeholder={"Escribe tus apellidos"}
                style={[styled.input, {borderColor: isRequestLastNameError ? 'red' : 'gray'}]}/>
            {
                isRequestLastNameError &&
                <Text style={{
                    marginTop: 5,
                    marginLeft: 5,
                    color: 'red',
                    fontSize: textSizeRender(3),
                }}>Es requerido</Text>
            }
        </View>

        {/*****Birthdat******/}
        <View style={{marginTop: SCREEN_WIDTH * .06}}>
            <Text style={{
                fontSize: textSizeRender(4),
                fontWeight: 'bold',
                marginBottom: SCREEN_WIDTH * .02
            }}>FECHA DE NACIMIENTO</Text>
            <DateField
                labelDate="Día"
                labelMonth="Mes"
                labelYear="Año"
                placeholderTextColor={'gray'}
                value={new Date(birthday)}
                styleInput={styled.inputBorder}
                onSubmit={(value) => {
                    setBirthday(moment(value).format("MM/DD/YYYY"))
                }}
                handleErrors={(error) => {
                    alert(error)
                }}
            />
        </View>

        {/*****GENDER******/}
        <View style={{marginTop: SCREEN_WIDTH * .06}}>
            <Text style={{
                fontSize: textSizeRender(4),
                fontWeight: 'bold',
                marginBottom: SCREEN_WIDTH * .02
            }}>SEXO</Text>
            <CheckGenderCustom app={props.app} options={['Femenino', 'Masculino']} selected={gender}
                               setSelected={setGender}/>
        </View>


        <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
                style={{
                    borderRadius: SCREEN_WIDTH * .05,
                    width:'50%',padding: SCREEN_WIDTH * .03,
                    backgroundColor:props.app.primaryColor
                }}
                onPress={() => sendData()}
            >
                <Text style={{
                    textAlign:'center',
                    fontSize: textSizeRender(4),
                    fontWeight:'bold',
                    color:'white'}}>GUARDAR</Text>
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
    inputBorder: {
        marginTop: 10,
        width: '30%',
        borderColor: 'gray',
        height: SCREEN_WIDTH * .13,
        backgroundColor: 'white',
        borderRadius: SCREEN_WIDTH * .011,
        borderWidth: 1,
        color: 'black',
    },
    inputBorderError: {
        marginTop: 10,
        width: '30%',
        borderColor: 'red',
        height: SCREEN_WIDTH * .13,
        backgroundColor: 'white',
        borderRadius: SCREEN_WIDTH * .011,
        borderWidth: 1,
        color: 'black',
    }
})
export default PersonalDataForm;
