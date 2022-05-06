import React from "react";
import {View, Image, Text, TextInput, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";

const ListMenuFooter = ["¿Qué es Ganga Hoteles?", "Trabaja con nostros", "Soporte", "Prensa y medios", "Términos y condiciones", "Políticas de huéspedes", "Centro de ayuda", "Contacto"];

const FooterApp = (props) => {
    return (
        <View style={{flex: 1}}>
            <View style={{
                padding: 20,
                height: SCREEN_WIDTH / 1.5,
                flex: 1,
                backgroundColor: props.app.tertiaryColor,
                alignItems: 'center'
            }}>
                <View>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: textSizeRender(5.5),
                        fontWeight: 'bold',
                        color: props.app.primaryColor
                    }}>Ofertas exculsivas en tu email</Text>
                    <View style={{flex: 1.4, marginTop: 20}}>
                        <TextInput
                            placeholder={"Ingresa tu email"}
                            style={{
                                width: SCREEN_WIDTH / 1.1,
                                borderRadius: 5,
                                padding: 13,
                                fontSize: textSizeRender(4),
                                backgroundColor: "white"
                            }}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{
                            padding: 14,
                            borderRadius: SCREEN_WIDTH,
                            backgroundColor: props.app.primaryColor,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: props.app.fontColorWhite,
                                fontWeight: 'bold',
                                fontSize: textSizeRender(3.5)
                            }}>QUIERO RECIBIERLAS</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end',}}>
                        <Text style={{textAlign: 'center', fontSize: textSizeRender(3)}}>Recibirás emails
                            promocionales de Ganga Hoteles{"\n"}Para más información cosultá las políticas de
                            privacidad</Text>
                    </View>
                </View>
            </View>
            <View style={{height: SCREEN_WIDTH + 40, flex: 0, backgroundColor: props.app.primaryColor}}>

                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: textSizeRender(15),
                        height: textSizeRender(15),
                        resizeMode: 'contain',
                        tintColor: props.app.fontColorWhite
                    }}
                           source={require("../../../assets/gg.png")}/>
                    <Text style={{
                        fontSize: textSizeRender(9), color: props.app.fontColorWhite, fontWeight: 'bold'
                    }}>ganga</Text>
                    <Text style={{
                        fontSize: textSizeRender(9),
                        color: props.app.fontColorWhite,
                        fontWeight: '200'
                    }}>hoteles</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{marginVertical: 20,marginBottom:30}}>
                        <Text style={{fontSize: textSizeRender(5), color: props.app.fontColorWhite}}>La cadena de
                            hoteles
                            <Text style={{
                                fontSize: textSizeRender(5),
                                color: props.app.fontColorWhite,
                                fontWeight: 'bold'
                            }}> low cost</Text>
                        </Text>
                    </View>
                    {
                        ListMenuFooter.map((item,index) => {
                            return <TouchableOpacity key={index} style={{marginTop: 10}}>
                                <Text style={{
                                    fontSize: textSizeRender(4.5),
                                    color: props.app.fontColorWhite
                                }}>{item}</Text>
                            </TouchableOpacity>
                        })
                    }

                </View>
            </View>

        </View>
    )
}
export default FooterApp;
