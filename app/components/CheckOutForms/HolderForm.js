import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {Actionsheet, Box, ScrollView} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import SelectGenericComponent from "./SelectGenericComponent";

const typeDoc_ = [{id: 1, name: "DNI"}, {id: 2, name: "Pasaporte"}];


const HolderForm = ({name,
                        setName,
                        lastName,
                        setLastName,
                        typeDoc,
                        setTypeDoc,
                        numDoc,
                        setNumDoc
                        ,...props}) => {
    const [openTypeDoc, setOpenTypeDoc] = useState(false);


    const onClosesTypeDoc = () => {
        setOpenTypeDoc(false)
    };

    return (
        <View style={{paddingTop: SCREEN_WIDTH * .07, paddingHorizontal: SCREEN_WIDTH * .07}}>
            <Text style={{fontSize: textSizeRender(5.2), fontWeight: 'bold'}}>Quién será el titular de la
                reseva? </Text>
            <View style={{marginTop: 20}}>
                <Text style={{fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Adulto</Text>
                <Text style={{marginTop: 5, fontSize: textSizeRender(3.6)}}>Será el responsable de hacer check-in y
                    check-out</Text>
            </View>
            <View style={{marginTop: 20}}>
                <Text style={{marginBottom: 10, fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Nombres</Text>
                <TextInput
                    autoCapitalize={'none'}
                    onChangeText={text => {
                        setName(text)
                    }}
                    value={name}
                    placeholder={""}
                    style={[styles.input, {borderColor: props.nameError ? 'red' : 'gray'}]}/>

                {
                    props.nameError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>Es requerido</Text>
                }
            </View>
            <View style={{marginTop: 10}}>
                <Text style={{marginBottom: 10, fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Apellidos</Text>
                <TextInput
                    autoCapitalize={'none'}
                    onChangeText={text => {
                        setLastName(text)
                    }}
                    value={lastName}
                    placeholder={""}
                    style={[styles.input, {borderColor: props.lastNameError ? 'red' : 'gray'}]}/>
                {
                    props.lastNameError &&
                    <Text style={{
                        marginTop: 5,
                        marginLeft: 5,
                        color: 'red',
                        fontSize: textSizeRender(3),
                    }}>Es requerido</Text>
                }
            </View>
            <View style={{marginTop: 10}}>
                <Text style={{marginBottom: 10, fontSize: textSizeRender(4.3), fontWeight: 'bold'}}>Tipo y número de documento</Text>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <TouchableOpacity
                      onPress={() => {
                          setOpenTypeDoc(true)
                      }}
                      style={{
                          flex: 0,
                          paddingHorizontal: 10,
                          backgroundColor: 'white',
                          height: Platform.OS === "ios" ? SCREEN_WIDTH * .105 : SCREEN_WIDTH * .12,
                          borderRadius: SCREEN_WIDTH * .011,
                          width: SCREEN_WIDTH * .32,
                          flexDirection: 'row',
                          borderColor: props.app.primaryColor,
                          alignItems: 'center',
                          borderWidth: 1
                      }}>
                      <View style={{flex: 1}}>
                          <Text style={{
                              fontWeight: '800',
                              color: props.app.primaryColor,
                              fontSize: textSizeRender(3.2)
                          }}>{typeDoc ? typeDoc_.find(x => x.id === typeDoc).name : "Select"}</Text>
                      </View>
                      <View>
                          <MaterialIcons name="keyboard-arrow-down" size={textSizeRender(8)}
                                         color={props.app.primaryColor}/>
                      </View>
                  </TouchableOpacity>
                  <View style={{flex: 1, marginLeft: 10}}>
                      <TextInput
                          autoCapitalize={'none'}
                          keyboardType="numeric"
                          onChangeText={text => {
                              setNumDoc(text)
                          }}
                          value={numDoc}
                          placeholder={""}
                          style={[styles.input, {borderColor: props.numDocError ? 'red' : 'gray'}]}/>

                      {
                          props.numDocError &&
                          <Text style={{
                              marginTop: 5,
                              marginLeft: 5,
                              color: 'red',
                              fontSize: textSizeRender(3),
                          }}>Es requerido</Text>
                      }
                  </View>
              </View>

            </View>
            <View style={{
                marginTop:SCREEN_WIDTH * .07,
                width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>
            {
                openTypeDoc &&
                <SelectGenericComponent
                    app={props.app}
                    options={typeDoc_}
                    selected={typeDoc}
                    send={(item) => {
                        setTypeDoc(item.id)
                        onClosesTypeDoc()
                    }}
                    isOpen={openTypeDoc}
                    onClose={onClosesTypeDoc}
                />

            }
        </View>)

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
export default HolderForm;
