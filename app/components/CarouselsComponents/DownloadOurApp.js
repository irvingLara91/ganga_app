import React, {useRef, useState} from "react";
import {View, Text, Image, Dimensions, StyleSheet} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import {Carousel,Pagination} from "react-native-snap-carousel-v4";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.2);

const styles = StyleSheet.create({
    dots: {
        width: ITEM_HEIGHT * .05,
        height: ITEM_HEIGHT * .05,
        borderRadius: ITEM_HEIGHT * .05,
        backgroundColor: "black",
    },
    itemContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: ITEM_HEIGHT * .15,
        padding: 10,
    },
});
const DownloadOurApp = ({data = [], containerStyle = {}, ...props}) => {


    /***
     * Carouse
     ***/
    const carouselRef = useRef();
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = data.length;
    const [slide, setSlide] = useState(0);


    const renderItem = ({item, index}) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View stayle={{flex: 1, justifyContent: "center", alignSelf: 'center'}}>
                    {item.img}
                </View>
                <View style={{
                    flex: .5, alignItems: "center",
                    justifyContent: 'center',
                    paddingHorizontal:SCREEN_WIDTH*.1,
                    marginTop:10
                }}>

                    <View style={{}}>
                        <Text style={{
                            textAlign: 'center',
                            color: "black",
                            fontSize: textSizeRender(3.5),
                        }}>
                            {item.msg}</Text>
                    </View>
                </View>
            </View>
        );
    };
    /***
     * FIN Carouse
     ***/


    return (<View style={{alignItems: 'center'}}>
            <Text style={{fontSize: textSizeRender(5), fontWeight: 'bold'}}>Descargá nuestra app</Text>
            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                <View>
                    <Image style={{
                        width: SCREEN_WIDTH * .5,
                        height: SCREEN_WIDTH * .2,
                        resizeMode: 'contain',
                    }}
                           source={require("../../../assets/googleplay_icon.png")}/>

                </View>
                <View>
                    <Image style={{
                        width: SCREEN_WIDTH * .45,
                        height: SCREEN_WIDTH * .2,
                        resizeMode: 'contain',
                    }} source={require("../../../assets/appStore-icon.png")}/>

                </View>
            </View>
            <Carousel
                layout={"default"}
                layoutCardOffset={3}
                ref={carouselRef}
                data={data}
                autoplay={true}
                loop={true}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(i) => setSlide(i)}
            />
            <Pagination
                containerStyle={containerStyle}
                dotStyle={styles.dots}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeDotIndex={slide}
                dotsLength={length}
            />
            <View>
            </View>
        </View>
    )
};

export default DownloadOurApp;
