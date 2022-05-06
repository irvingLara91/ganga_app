import React, {useState} from "react";
import {FlatList, ImageBackground, Text, View, TouchableOpacity, ActivityIndicator, Image} from "react-native";
import {array_MoreThanHotels, array_packages, dataCarousel, SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {AntDesign, Feather} from '@expo/vector-icons';
import StarRating from "react-native-star-rating";
import {ScrollView} from "native-base";
import FooterApp from "../FooterApp/FooterApp";
import HeaderHome from "../HeaderHome";
import {LinearGradient} from "expo-linear-gradient";
import DownloadOurApp from "../CarouselsComponents/DownloadOurApp";
import CarouselPromo from "../CarouselsComponents/CarouselPromo";
import CarouselPackageForYou from "../CarouselsComponents/CarouselPackageForYou";
import CarouselMoreThanHotels from "../CarouselsComponents/CarouselMoreThanHotels";




const ListRecommendedHotels = ({data = [], callApi, ...props}) => {

    const [selectedLike, setSelectedLike] = useState(-1)


    const [refreshing, setRefreshing] = useState(false)

    const _onRefresh = () => {
        setRefreshing(true)
        try {
            callApi();
        } catch (e) {
        }
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
    }

    const onLiked = (index, item) => {
        let hotel = data
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
            key={index}
            onPress={() => {
                //alert(index)
            }}
            style={{
                flex: 1,
                justifyContent: "space-around",
                paddingRight: 12,
                paddingLeft: 12,
                paddingBottom: 14,
                paddingTop: 14
            }}>
            <View style={{flex: 1}}>
                <ImageBackground
                    imageStyle={{borderTopRightRadius: 15, borderTopLeftRadius: 15}}
                    style={{width: '100%', height: SCREEN_WIDTH / 3}}
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
                            }
                                              style={{
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
                    <Text style={{marginTop: 8, fontSize: textSizeRender(3)}}>{item.country}, {item.city + ""}</Text>
                    <Text style={{marginTop: 8, fontSize: textSizeRender(4), fontWeight: 'bold'}}>{item.name}</Text>
                    <Text
                        style={{marginTop: 8, color: '#6c6c6c', fontSize: textSizeRender(3)}}>{item.description}</Text>
                    <Text style={{
                        marginTop: 8,
                        color: '#000',
                        fontSize: textSizeRender(4),
                        fontWeight: 'bold'
                    }}>Desde:{"\n$" + item.price.toLocaleString('es-AR')}</Text>


                    <View style={{marginTop: 8, width: '40%'}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={item.stars}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            halfStar={'star-half-empty'}
                            iconSet={'FontAwesome'}
                            starSize={textSizeRender(4.5)}
                            fullStarColor={props.app.tertiaryColor}
                        />
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )

    return (<View style={{
        width: '100%',
    }}>
        <FlatList data={data}
                  scrollEnabled={true}
                  style={{flexDirection: 'column'}}
                  numColumns={2}
                  key={2}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  ListHeaderComponent={
                      <View
                          style={{
                              flex: 1,
                          }}>
                          <HeaderHome app={props.app}/>
                          <View>
                              <ImageBackground
                                  imageStyle={{borderRadius: 0}}
                                  style={{width: '100%', height: SCREEN_WIDTH / 2.1}}
                                  source={require('../../../assets/peoples.jpeg')}>
                                  <LinearGradient
                                      colors={['rgba(0,0,0,.5)', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.50)', 'rgba(0,0,0,.33)', 'rgba(0,0,0,.0)']}
                                      style={{
                                          position: 'absolute',
                                          top: 0,
                                          width: '100%',
                                          height: '100%',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          paddingHorizontal: 8,
                                          paddingVertical: 16,
                                      }}>
                                      <Text style={{color: 'white', fontSize: textSizeRender(5), fontWeight: 'bold'}}>LA
                                          CADENA DE HOTELES LOW-COST</Text>
                                      <Text style={{marginTop: 5, color: 'white', fontSize: textSizeRender(3.5)}}>ES LO
                                          QUE TIENE QUE SER Y ES LOW COST.</Text>
                                  </LinearGradient>
                              </ImageBackground>
                          </View>
                          {
                              data && data.length > 0 &&
                              <View style={{
                                  marginTop: 20,
                                  marginBottom: 5,
                                  justifyContent: 'center',
                                  alignItems: 'center'
                              }}>
                                  <Text style={{fontSize: textSizeRender(5), fontWeight: 'bold'}}>Hoteles Recomendados
                                      para vos</Text>
                              </View>
                          }

                      </View>
                  }
                  renderItem={(item) => renderHotels(item)}
                  keyExtractor={(item, index) => index.toString()}
                  ListFooterComponent={
                      <View>
                          <CarouselPromo app={props.app}/>
                          <CarouselPackageForYou data={array_packages} app={props.app}/>
                          <CarouselMoreThanHotels data={array_MoreThanHotels} app={props.app}/>
                          <DownloadOurApp data={dataCarousel}/>
                          <FooterApp app={props.app}/>
                      </View>
                  }

        />
    </View>)
}
export default ListRecommendedHotels;
