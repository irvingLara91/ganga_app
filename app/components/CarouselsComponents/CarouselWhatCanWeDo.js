import React, {useRef, useState} from "react";
import RNCarousel, {Pagination} from "react-native-snap-carousel";
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


const CarouselWhatCanWeDo= ({title="",data = [], containerStyle = {}, ...props}) => {

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
                    imageStyle={{borderTopRightRadius: SCREEN_WIDTH * .04,borderTopLeftRadius: SCREEN_WIDTH * .04}}
                    style={{width: '100%', height: SCREEN_WIDTH / 1.6}}
                    source={{uri: item.image}}/>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginTop:15,paddingHorizontal:8}}>

                        <View style={{flex: 1}}>
                            <Text style={{fontSize:textSizeRender(5.5),fontWeight:'bold'}}>{item.title}</Text>
                        </View>
                    </View>
                </View>

            </View>

        </TouchableOpacity>
    );


    return (
        <View>
            <View style={{
                paddingLeft: SCREEN_WIDTH * .09,
                marginBottom: 5,
            }}>
                <Text style={{fontSize: textSizeRender(5), fontWeight: 'bold'}}>
                    {title}
                </Text>
            </View>
            <RNCarousel
                layout={"default"}
                layoutCardOffset={10}
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                lockScrollWhileSnapping={true}
                sliderWidth={SCREEN_WIDTH}
                sliderHeight={SCREEN_WIDTH * 1.5}
                itemWidth={SCREEN_WIDTH - (100)}
                activeSlideOffset={50}
                enableSnap
                removeClippedSubviews={false}
                firstItem={0}
                onSnapToItem={(i) => setSlide(i)}
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

export default CarouselWhatCanWeDo;
