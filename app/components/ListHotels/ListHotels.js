import React, {useState} from "react";
import {FlatList, View, TouchableOpacity, Image, ImageBackground, Text, ActivityIndicator} from "react-native";
import {array_WhatCanWeDo, SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {AntDesign} from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import FooterApp from "../FooterApp/FooterApp";
import CarouselWhatCanWeDo from "../CarouselsComponents/CarouselWhatCanWeDo";
import {useNavigation} from "@react-navigation/native";

const ListHotels = ({hotels = [], ...props}) => {
    const navigation = useNavigation();
    const [selectedLike, setSelectedLike] = useState(-1)


    const onLiked = (index, item) => {
        let hotel = hotels
        let targetHotel = hotel[index];
        setSelectedLike(item.id)

        targetHotel.is_favorite = !targetHotel.is_favorite;
        let result = "";
        if (targetHotel.is_favorite) {
            result = "1";
        } else {
            result = "0";
        }
        setTimeout(() => {
            targetHotel.is_favorite = result === "1" ? true : false;
            setSelectedLike(-1)
            hotel[index] = targetHotel;
        }, 3000);

    }

    const renderHotels = ({item, index}) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("HotelDescriptionScreen",{hotel:item})
            }}
        >
            <View style={{backgroundColor: '#8f8f8f', height: 1.5}}/>
            <View style={{padding: SCREEN_WIDTH * .09}}>
                <ImageBackground
                    imageStyle={{
                        borderTopRightRadius: 15, borderTopLeftRadius: 15
                    }}
                    style={{width: '100%', height: SCREEN_WIDTH / 2.5}}
                    source={{uri: "https://www.clarin.com/img/2017/11/24/H1HCblIef_340x340.jpg"}}>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        paddingHorizontal: 0, marginTop: 15
                    }}>
                        <View style={{flex: 1}}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '50%',
                                height: '20%',
                                backgroundColor: props.app.primaryColor,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10
                            }}>
                                <Text style={{fontSize: textSizeRender(3), color: props.app.fontColorWhite}}>10%</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end', marginTop: -5, marginRight: 10}}>
                            <TouchableOpacity onPress={() => {
                                onLiked(index, item);
                            }
                            } style={{
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: 'white',
                                height: SCREEN_WIDTH * .08,
                                width: SCREEN_WIDTH * .08,
                                alignItems: 'center'
                            }}>
                                {selectedLike !== item.id ?
                                    <AntDesign name={item.is_favorite ? "heart" : "hearto"} size={textSizeRender(5)}
                                               color={props.app.primaryColor}/>
                                    :
                                    <ActivityIndicator size="small" color={props.app.primaryColor}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <View slyle={{flex: 1}}>
                    <Text style={{
                        marginTop: 8,
                        fontSize: textSizeRender(5),
                        textTransform: 'capitalize',
                        fontWeight: 'bold'
                    }}>{item.name}</Text>
                    <Text style={{marginTop: 8, fontSize: textSizeRender(3)}}>{item.country}, {item.city + ""}</Text>
                    <View style={{marginTop: 12, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            <View style={{width: '50%'}}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={item.stars}
                                    emptyStar={'star-o'}
                                    fullStar={'star'}
                                    halfStar={'star-half-empty'}
                                    iconSet={'FontAwesome'}
                                    starSize={textSizeRender(3.5)}
                                    fullStarColor={props.app.tertiaryColor}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Image
                                style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 5}}
                                source={require('../../../assets/icon_acondicionador-aire.png')}/>
                            <Image
                                style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 5}}
                                source={require('../../../assets/icon_banera.png')}/>
                            <Image
                                style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 5}}
                                source={require('../../../assets/icon_bellboy.png')}/>
                            <Image
                                style={{width: SCREEN_WIDTH * .09, height: SCREEN_WIDTH * .09, marginRight: 5}}
                                source={require('../../../assets/icon_mesero.png')}/>
                        </View>
                    </View>
                    <Text style={{marginTop: 8, color: '#6c6c6c', fontSize: textSizeRender(3)}}>{item.description}</Text>
                    <Text style={{
                        marginTop: 12,
                        color: '#000',
                        fontSize: textSizeRender(4),
                        fontWeight: 'bold'
                    }}>Desde:{" $" + item.price.toLocaleString('es-AR')}/noche</Text>
                    <View style={{
                        marginTop: 12,
                    }}>
                        <Text style={{
                            color: '#6c6c6c', fontSize: textSizeRender(3)
                        }}>Pagá al alojamientoo hasta en 12 cuotas sin interés.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop:2,
                            width:'50%',
                        }}
                        onPress={()=>{
                            alert("e")
                        }}
                    >
                        <Text style={{
                            textDecorationLine: "underline",
                            color: 'red', fontSize: textSizeRender(3)
                        }}>Ver bancos y tarjetas</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )


    return (
        <View style={{
            width: '100%',
            marginBottom: (SCREEN_WIDTH * .19) * 2
        }}>
            <FlatList data={hotels}
                      renderItem={(item) => renderHotels(item)}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={
                          <View>
                              <CarouselWhatCanWeDo title={"Que podés hacer en "+props.search.city} data={array_WhatCanWeDo} app={props.app}/>
                              <FooterApp app={props.app}/>
                          </View>
                      }
            />
        </View>
    )
};
export default ListHotels;
