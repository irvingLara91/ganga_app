import React, {useRef, useState} from "react";
import {Carousel,Pagination} from "react-native-snap-carousel-v4";
import {Dimensions, Image, StyleSheet, Text, View,TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.2);
const dataCarousel = [
    {
        type: "Visa",
        term: 9,
        logo: <Image style={{
            width: SCREEN_WIDTH * .2,
            height: SCREEN_WIDTH * .2,
            resizeMode: 'contain'
        }} source={require('../../../assets/logo_mastercard.png')}/>,
        initDate: '30/9',
        endDate: '20/10',
    },
    {
        type: "mastercard",
        term: 6,
        logo: <Image style={{
            width: SCREEN_WIDTH * .2,
            height: SCREEN_WIDTH * .2,
            resizeMode: 'contain'
        }} source={require('../../../assets/logo_mastercard.png')}/>,
        initDate: '30/9',
        endDate: '20/10',
    },
    {
        type: "mastercard",
        term: 6,
        logo: <Image style={{
            width: SCREEN_WIDTH * .2,
            height: SCREEN_WIDTH * .2,
            resizeMode: 'contain'
        }} source={require('../../../assets/logo_mastercard.png')}/>,
        initDate: '30/9',
        endDate: '20/10',
    },
];
const CarouselPromo = ({data = [], containerStyle = {}, ...props}) => {

    /***
     * Carouse
     ***/
    const carouselRef = useRef();
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = dataCarousel.length;
    const [slide, setSlide] = useState(0);


    const renderItem = ({item, index}) => {
        return (
            <View key={index} style={{
                borderRadius: ITEM_HEIGHT * .05,
                width: SLIDER_WIDTH - (ITEM_HEIGHT * .15),
                marginHorizontal: (ITEM_HEIGHT * .075),
                height: SLIDER_WIDTH - (ITEM_HEIGHT * .45),
                backgroundColor: props.app.primaryColor,
            }}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: SCREEN_WIDTH * .05,
                }}>
                    <View>
                        {item.logo}
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: textSizeRender(8),
                            color: props.app.fontColorWhite
                        }}> {item.type}.</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flex: .6,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            lineHeight:textSizeRender(35),
                            fontSize: textSizeRender(35),
                            fontWeight: 'bold',
                            color: props.app.tertiaryColor
                        }}>
                            {item.term}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        marginTop:textSizeRender(3)
                    }}>
                        <Text
                            style={{
                                fontSize: textSizeRender(4.2),
                                fontWeight: 'bold',
                                color: props.app.tertiaryColor
                            }}
                        >
                            HASTA
                        </Text>
                        <Text
                            style={{
                                fontSize: textSizeRender(8),
                                fontWeight: 'bold',
                                color: props.app.tertiaryColor
                            }}
                        >
                            Cuotas
                        </Text>
                        <Text
                            style={{
                                fontSize: textSizeRender(8),
                                fontWeight: 'bold',
                                color: props.app.tertiaryColor
                            }}>
                            sin interés
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: SCREEN_WIDTH * .05,
                }}>
                    <View style={{flex:1,alignItems: 'center'}}>
                        <Text
                        style={{
                            fontSize:textSizeRender(4),
                            color:props.app.fontColorWhite,
                        }}
                        >del {item.initDate} al {item.endDate}{'\nEn alojamientos'}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{
                            borderRadius:50,
                            paddingVertical:10,
                            borderWidth:1.5,
                            borderColor:props.app.fontColorWhite
                        }}>
                            <Text
                                style={{
                                    fontWeight:'bold',
                                    fontSize:textSizeRender(4),
                                    textAlign:'center',
                                   color:props.app.fontColorWhite
                                }}
                            >Ver más</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
        );
    };
    /***
     * FIN Carouse
     ***/

    return (
        <View style={{marginTop:20}}>
            <Carousel
                layout={"default"}
                layoutCardOffset={10}
                ref={carouselRef}
                data={dataCarousel}
                autoplay={true}
                loop={true}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
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
export default CarouselPromo;
