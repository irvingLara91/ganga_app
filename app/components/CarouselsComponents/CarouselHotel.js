import React, {useState,useRef} from "react";
import {ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {Carousel,Pagination} from "react-native-snap-carousel-v4";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.2);

const CarouselHotel = ({containerStyle = {}, ...props}) => {
    const [activeSlide, setActiveSlide] = useState(0)
    /***
     * Carouse
     ***/
    const carouselRef = useRef();
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = props.images.length;
    const [slide, setSlide] = useState(0);


    const _renderItem = ({item, index}) => {

        return (<View>
            {props.images ?
                <ImageBackground
                    style={{
                        width: '100%',
                        height: SCREEN_WIDTH *.6,
                    }}
                    source={{
                        uri: item.image
                    }}>
                    <LinearGradient
                        colors={['rgba(3,3,3,0.14)', 'rgba(19,19,19,0.01)', 'rgba(52,52,52,0.5)', 'rgba(19,19,19,0.11)', 'rgba(0,0,0,.0)']}
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: SCREEN_WIDTH *.6,
                            paddingHorizontal: 8,
                            paddingVertical: 16,
                        }}/>
                    <View style={{flex: 1}}>
                        <View style={{
                            marginTop:'5%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '16%',
                            height: '18%',
                            backgroundColor: props.app.primaryColor,
                            borderTopRightRadius: SCREEN_WIDTH,
                            borderBottomRightRadius: SCREEN_WIDTH
                        }}>
                            <Text style={{
                                fontWeight:'bold',
                                fontSize: textSizeRender(5),
                                color: props.app.fontColorWhite}}>
                                10%
                            </Text>
                        </View>
                    </View>
                </ImageBackground> :
                <ActivityIndicator size="small" color="#888888"/>
            }
        </View>)

    }

    return (<View>
        {props.images.length > 0 ?
            <View>
                <Carousel
                    layout={"default"}
                    layoutCardOffset={10}
                    ref={carouselRef}
                    data={props.images}
                    renderItem={_renderItem}
                    lockScrollWhileSnapping={true}
                    sliderWidth={SCREEN_WIDTH}
                    sliderHeight={SCREEN_WIDTH}
                    itemWidth={SCREEN_WIDTH}
                    activeSlideOffset={50}
                    enableSnap
                    removeClippedSubviews={false}
                    firstItem={0}
                    //onSnapToItem={(i) => alert(i)}
                    onScrollIndexChanged={(i)=>{setSlide(i)}}/>
                <Pagination
                    containerStyle={containerStyle}
                    dotStyle={[styles.dots, {
                        top: - SLIDER_WIDTH*.13,
                        backgroundColor: props.app.primaryColor
                    }]}
                    inactiveDotOpacity={0.3}
                    inactiveDotScale={0.9}
                    activeDotIndex={slide}
                    dotsLength={length}
                />
            </View>
            :
            <ImageBackground
                style={props.style}
                source={{
                    uri: props.images[0].image
                }}>
                <LinearGradient
                    colors={['rgba(0,0,0,.8)', 'rgba(0,0,0,.7)', 'rgba(0,0,0,.50)', 'rgba(0,0,0,.33)', 'rgba(0,0,0,.0)']}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: 30,
                        paddingHorizontal: 8,
                        paddingVertical: 16,
                        borderRadius: 7
                    }}/>
            </ImageBackground>
        }
    </View>)
}
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
export default CarouselHotel;
