import React, {useRef, useState} from "react";
import {Carousel,Pagination} from "react-native-snap-carousel-v4";

import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,

} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";


const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.2);
import {Fontisto} from '@expo/vector-icons';


const CarouselMoreThanHotels = ({data = [], containerStyle = {}, ...props}) => {
    const [selectedLike, setSelectedLike] = useState(-1)

    /***
     * Carouse
     ***/
    const carouselRef = useRef();
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = data.length;
    const [slide, setSlide] = useState(0);


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
                    source={{uri: item.image}}/>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginTop:15,paddingHorizontal:8}}>
                        <View style={{flex: 0,marginRight:20}}>
                            <Fontisto name={ item.icon !=="exp" ? "plane-ticket": "sait-boat"} size={textSizeRender(10)} color={props.app.primaryColor}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize:textSizeRender(5.5),fontWeight:'bold'}}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={{marginTop:15,paddingHorizontal:8}}>
                        <Text style={{color:'rgb(105,105,105)',fontSize:textSizeRender(4)}}>{item.description}</Text>
                    </View>

                </View>

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
                    Somos mucho más que hoteles
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

export default CarouselMoreThanHotels;
