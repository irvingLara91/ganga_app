import React from "react";
import {FlatList, StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import ContainerGeneric from "../components/ScreenContainers/ContainerGeneric";
import CarouselHotel from "../components/CarouselsComponents/CarouselHotel";
import {array_WhatCanWeDo, SCREEN_WIDTH, textSizeRender} from "../utils/utils";
import {useRoute} from "@react-navigation/native";
import StarRating from "react-native-star-rating";
import {AntDesign, FontAwesome5, SimpleLineIcons} from '@expo/vector-icons';
import Constants from "expo-constants";
import CarouselWhatCanWeDo from "../components/CarouselsComponents/CarouselWhatCanWeDo";
import {ScrollView} from "native-base";

const images = [
    {
        id: 1,
        image: "https://static.hosteltur.com/app/public/uploads/img/releases/2020/10/01/L_110055_1-gallery-hotel.jpg"
    },
    {
        id: 2,
        image: "https://exp.cdn-hotels.com/hotels/1000000/10000/5400/5310/1b143ff8_z.jpg?impolicy=fcrop&w=773&h=530&q=high"
    },
    {
        id: 3,
        image: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/40/81/40817_v3.jpeg"
    }];
const services = [
    {id: 1, name: "Early Check in", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 2, name: " Desayuno completo", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 3, name: "Lavanderia", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 4, name: "Coffee point", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 5, name: "Set de baño completo", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 6, name: "Snack box", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},

];

const GridServices = (props) => {

    const ingredientViews = (data, index) => {
        return (
            <View key={index} style={styles.gridServices}>
                {data.icon}
                <Text style={styles.serviceText}>{data.name}</Text>
            </View>
        );
    };
    return (
        <View style={{
            flex: 1, flexDirection: 'row', flexWrap: 'wrap', margin: -20
        }}>
            {props.services.map((value, index) => {
                return ingredientViews(value, index);
            })}
        </View>
    )
}


const HotelDescriptionScreen = (props) => {
    const {hotel} = useRoute().params ?? {};


    return (
        <ContainerGeneric title={"Hoteles"} isForm={false} app={props.app}>
            <ScrollView>
                <View style={{height: SCREEN_WIDTH * .6}}>
                    <CarouselHotel app={props.app} images={images}/>
                </View>
                <View style={{
                    flex: 1,
                    paddingTop: SCREEN_WIDTH * .08
                }}>
                    <Text style={{
                        paddingHorizontal: SCREEN_WIDTH * .09,
                        fontSize: textSizeRender(5),
                        textTransform: 'capitalize',
                        fontWeight: 'bold'
                    }}>{hotel?.name}</Text>
                    <Text style={{
                        paddingHorizontal: SCREEN_WIDTH * .09,
                        marginTop: 8, fontSize: textSizeRender(3)
                    }}>{hotel?.country}, {hotel?.city + ""}</Text>
                    <View style={{
                        paddingHorizontal: SCREEN_WIDTH * .09,
                        flexDirection: 'row', alignItems: 'center'
                    }}>
                        <View style={{flex: 1, marginTop: 8}}>
                            <View style={{width: '22%'}}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={hotel.stars}
                                    emptyStar={'star-o'}
                                    fullStar={'star'}
                                    halfStar={'star-half-empty'}
                                    iconSet={'FontAwesome'}
                                    starSize={textSizeRender(3.5)}
                                    fullStarColor={props.app.tertiaryColor}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, marginTop: 8}}>
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 10}}
                                    source={require('../../assets/icon_acondicionador-aire.png')}/>
                                <Image
                                    style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 10}}
                                    source={require('../../assets/icon_banera.png')}/>
                                <Image
                                    style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 10}}
                                    source={require('../../assets/icon_bellboy.png')}/>
                                <Image
                                    style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 10}}
                                    source={require('../../assets/icon_mesero.png')}/>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: SCREEN_WIDTH * .09,
                    }}>
                        <Text style={{
                            marginTop: 8,
                            color: '#6c6c6c',
                            fontSize: textSizeRender(4)
                        }}>{hotel.description}</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: SCREEN_WIDTH * .09,
                        flex: 1, marginTop: 16
                    }}>
                        <GridServices services={services}/>
                    </View>

                    <View style={{
                        paddingHorizontal: SCREEN_WIDTH * .09,
                        flex: 1, marginTop: 16
                    }}>
                        <View style={{
                            paddingTop: SCREEN_WIDTH * .08
                        }}>
                            <Text style={{
                                fontSize: textSizeRender(4),
                                fontWeight: 'bold'
                            }}>Condiciones del alojamiento</Text>
                        </View>

                        <View style={{paddingTop: SCREEN_WIDTH * .05}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <SimpleLineIcons name="login" style={{transform: [{rotate: '180deg'}]}}
                                                 size={textSizeRender(5)} color={'#808080'}/>
                                <Text style={{
                                    color: '#808080',
                                    fontSize: textSizeRender(3),
                                }}> Horario de Check in: 12:00</Text>
                            </View>
                        </View>

                        <View style={{paddingTop: SCREEN_WIDTH * .05}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <SimpleLineIcons name="logout" style={{transform: [{rotate: '180deg'}]}}
                                                 size={textSizeRender(5)} color={'#808080'}/>
                                <Text style={{
                                    color: '#808080',
                                    fontSize: textSizeRender(3),
                                }}> Horario de Check out: 12:00</Text>
                            </View>
                        </View>
                        <View style={{paddingTop: SCREEN_WIDTH * .05}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{
                                    color: '#808080',
                                    fontSize: textSizeRender(3),
                                }}>Desayuno 07:30 - 10:30</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingTop: SCREEN_WIDTH * .05, paddingBottom: SCREEN_WIDTH * .22}}>
                        <CarouselWhatCanWeDo title={"Que podés hacer en " + hotel?.city} data={array_WhatCanWeDo}
                                             app={props.app}/>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.containerRe}>
                <View style={{
                    marginLeft: SCREEN_WIDTH * .05,
                    flex: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: SCREEN_WIDTH * .11,
                        width: SCREEN_WIDTH * .11,
                        height: SCREEN_WIDTH * .11,
                        backgroundColor: props.app.primaryColor
                    }}>
                        <AntDesign name="infocirlceo" size={24} color="white"/>
                    </View>
                </View>
                <View style={{flex: 1,
                    marginLeft:20,
                    justifyContent: 'center'}}>
                    <Text style={{fontSize: textSizeRender(3.5)}}>4 noches | 2 personas</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: textSizeRender(4.5)}}>${hotel.price.toLocaleString('es-AR')}</Text>
                    <Text style={{fontSize: textSizeRender(2.6)}}>Impuestos incluidos</Text>

                </View>
                <View style={{marginRight: SCREEN_WIDTH * .05,flex: 0, justifyContent: 'center'}}>
                    <TouchableOpacity style={{
                        backgroundColor: props.app.primaryColor,
                        width: '100%',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SCREEN_WIDTH * .05
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: textSizeRender(3)
                        }}>RESERVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ContainerGeneric>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    serviceText: {
        marginLeft: 10,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: '700',
        alignSelf: 'center',
        fontSize: textSizeRender(2.9),
        color: 'black',
    },
    gridServices: {
        marginTop: 12,
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 5,
        paddingEnd: 5,
        paddingTop: 8,
        marginLeft: SCREEN_WIDTH * .03,
        marginRight: SCREEN_WIDTH * .03,
        paddingBottom: 8,
        borderRadius: 8,
    },
    containerRe: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: "#C4C4C4",
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        position: 'absolute',
        bottom: 0,
        height: SCREEN_WIDTH * .22,
        width: '100%',
        backgroundColor: 'white'
    }
});
const mapState = (state) => {
    return {
        app: state.app,
        auth: state.auth
    }
}
export default connect(mapState)(HotelDescriptionScreen);
