import React, {useRef, useState} from "react";
import {Carousel,Pagination} from "react-native-snap-carousel-v4";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {AntDesign} from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import {LinearGradient} from "expo-linear-gradient";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.2);


const CarouselPackageForYou = ({data = [], containerStyle = {}, ...props}) => {
    const [selectedLike, setSelectedLike] = useState(-1)

    /***
     * Carouse
     ***/
    const carouselRef = useRef();
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = data.length;
    const [slide, setSlide] = useState(0);

    const onLiked = (index, item) => {
        let packages = data
        let targetPackage = packages[index];
        setSelectedLike(item.id)

        targetPackage.favorite = !targetPackage.favorite;
        let result = "";
        if (targetPackage.favorite) {
            result = "1";
        } else {
            result = "0";
        }
        setTimeout(() => {
            targetPackage.favorite = result === "1" ? true : false;
            setSelectedLike(-1)
            packages[index] = targetPackage;
        }, 3000);

    }

    const renderItem = ({item, index}) => (
        <TouchableOpacity
            key={index}
            onPress={() => {
                // alert(index)
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
                    imageStyle={{borderRadius: SCREEN_WIDTH * .04}}
                    style={{width: '100%', height: SCREEN_WIDTH / 1.6}}
                    source={{uri: item.image}}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.39)', 'rgba(0,0,0,0.46)', 'rgba(0,0,0,0.38)', 'rgba(0,0,0,0.27)', 'rgba(0,0,0,.0)']}
                        style={{
                            borderRadius: SCREEN_WIDTH * .04,
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={{
                            flex: 0,
                            flexDirection: 'row',
                            paddingHorizontal: 0, marginTop: 15
                        }}>
                            <View style={{flex: 1}}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '83%',
                                    height: SCREEN_WIDTH * .08,
                                    backgroundColor: props.app.primaryColor,
                                    borderTopRightRadius: SCREEN_WIDTH * .04,
                                    borderBottomRightRadius: SCREEN_WIDTH * .04
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: textSizeRender(3.1), color: props.app.fontColorWhite
                                    }}>Desde ${item.price.toLocaleString('es-AR')}</Text>
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
                                        <AntDesign name={item.favorite ? "heart" : "hearto"} size={textSizeRender(5)}
                                                   color={props.app.primaryColor}/>
                                        :
                                        <ActivityIndicator size="small" color={props.app.primaryColor}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                paddingBottom: SCREEN_WIDTH * .1,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                maxWidth: SCREEN_WIDTH * .5,
                                fontSize: textSizeRender(10),
                                color: props.app.fontColorWhite
                            }}>{item.name}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

        </TouchableOpacity>
    );


    return (
        <View>
            <View style={{
                marginBottom: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{fontSize: textSizeRender(5), fontWeight: 'bold'}}>
                    Paquetes pensados para vos
                </Text>
            </View>
            <Carousel
                layout={"default"}
                layoutCardOffset={10}
                ref={carouselRef}
                data={data}
                //autoplay={true}
                //loop={true}
                renderItem={renderItem}
                lockScrollWhileSnapping={true} // Prevent the user from swiping again while the carousel is snapping to a position.
                sliderWidth={SCREEN_WIDTH}
                sliderHeight={SCREEN_WIDTH * 1.5}
                itemWidth={SCREEN_WIDTH - (100)}
                activeSlideOffset={50}
                enableSnap
                removeClippedSubviews={false}
                firstItem={0}
                //onSnapToItem={(i) => alert(i)}
                onScrollIndexChanged={(i)=>{setSlide(i)}}
            />
            <Pagination
                containerStyle={containerStyle}
                dotStyle={[styles.dots, {backgroundColor: props.app.primaryColor}]}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeDotIndex={slide}
                dotsLength={length}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    dots: {
        width: ITEM_HEIGHT * .05,
        height: ITEM_HEIGHT * .05,
        borderRadius: ITEM_HEIGHT * .05,
    },
    itemContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: ITEM_HEIGHT * .15,
        padding: 10,
    },
});

export default CarouselPackageForYou;
