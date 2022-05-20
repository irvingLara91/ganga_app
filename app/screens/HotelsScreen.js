import React, {useEffect, useState} from "react";
import {TouchableOpacity, View, Text, Image} from "react-native";
import {connect} from "react-redux";
import ContainerGeneric from "../components/ScreenContainers/ContainerGeneric";
import {SCREEN_WIDTH, textSizeRender} from "../utils/utils";
import {AntDesign, EvilIcons, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useRoute} from "@react-navigation/native";
import moment from "moment";
import 'moment/locale/es';
import ListHotels from "../components/ListHotels/ListHotels";
import ModalFilter from "../components/Modals/ModalFilter";
import {setSearchParamsAction} from "../redux/searchDuck";

const TitleResult = ({data, ...props}) => {


   /// console.log("...", data)

    return (
        <View
            style={{position: 'relative', top: 0, height: SCREEN_WIDTH * .19, width: '100%', backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', height: '100%', alignItems: 'center', paddingHorizontal: 20}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 0}}>
                            <Ionicons name="ios-earth-outline" size={textSizeRender(7.5)}
                                      color={props.app.primaryColor}/>
                        </View>
                        <View style={{flex: 1, marginLeft: SCREEN_WIDTH * .02}}>

                            <Text style={{
                                fontSize: textSizeRender(3.5),
                                fontWeight: 'bold',
                            }}
                            >{data.city}</Text>
                        </View>

                    </View>
                    <View style={{justifyContent: 'center'}}>
                        {
                            data.isMicro ?
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{flex: 0}}>
                                        <EvilIcons name="calendar" size={textSizeRender(8)}
                                                   color={props.app.primaryColor}/>
                                    </View>
                                    <View style={{flex: 0, marginLeft: SCREEN_WIDTH * .05, marginRight: 30}}>
                                        <Text style={{
                                            fontSize: textSizeRender(3.2),
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize'
                                        }}>{moment(data.dateInit, 'DD/MM/YYYY').format('ddd DD MMM')} |
                                            Horas: {data.hours}</Text>

                                    </View>
                                </View>
                                :
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{flex: 0}}>
                                        <EvilIcons name="calendar" size={textSizeRender(8)}
                                                   color={props.app.primaryColor}/>
                                    </View>
                                    <View style={{flex: 0, marginLeft: SCREEN_WIDTH * .02, marginRight: 10}}>
                                        <Text style={{
                                            fontSize: textSizeRender(3.2),
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize'
                                        }}>{moment(data.dateInit, 'DD/MM/YYYY').format('ddd DD MMM')} | {moment(data.dateEnd, 'DD/MM/YYYY').format(' ddd D MMM')}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{flex: 0}}>
                                            <MaterialIcons name="emoji-people" size={textSizeRender(6)}
                                                           color={props.app.primaryColor}/>
                                        </View>
                                        <View style={{flex: 0, marginLeft: SCREEN_WIDTH * .02}}>
                                            <Text style={{
                                                fontSize: textSizeRender(3.5),
                                                fontWeight: 'bold',
                                            }}>{data.persons}</Text>
                                        </View>
                                    </View>
                                </View>

                        }

                    </View>
                </View>
                <View style={{flex: 0}}>
                    <TouchableOpacity
                        style={{backgroundColor: props.app.primaryColor, padding: 12, borderRadius: 50}}>
                        <AntDesign name="search1" size={24} color={"white"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}
const HotelsScreen = (props) => {
    const {formSearch} = useRoute().params ?? {};
const [visibleFilter,setVisibleFilter] = useState(false);

    return (
        <ContainerGeneric app={props.app} title={"Hoteles"} isForm={false}>
            <TitleResult app={props.app} data={formSearch}/>
            <View>
               {
                    <ListHotels search={formSearch} hotels={props.hotels.hotels} app={props.app}/>
               }
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                height: SCREEN_WIDTH * .22,
                width: '100%',
                backgroundColor: props.app.primaryColor
            }}>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

                    <TouchableOpacity style={{flex:.2,alignItems:'center'}}>
                        <Image style={{
                            tintColor:'white',
                            width:textSizeRender(7),
                            height:textSizeRender(7),
                            marginBottom:5
                        }} source={require('../../assets/icon_signaling.png')}/>
                        <Text style={{
                            fontSize: textSizeRender(3.5),
                            fontWeight: 'bold',
                            color:'white'
                        }}
                        >{"mapa"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:.2,alignItems:'center'}}>

                        <Image style={{
                            tintColor:'white',
                            width:textSizeRender(7),
                            height:textSizeRender(7),
                            marginBottom:5
                        }} source={require('../../assets/icon_reorder.png')}/>
                        <Text style={{
                            fontSize: textSizeRender(3.5),
                            fontWeight: 'bold',
                            color:'white'
                        }}
                        >{"Ordenar"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            setVisibleFilter(true)
                        }}
                        style={{flex:.2,alignItems:'center'}}>
                        <Image style={{
                            tintColor:'white',
                            width:textSizeRender(7),
                            height:textSizeRender(7),
                            marginBottom:5
                        }} source={require('../../assets/icon_filter.png')}/>
                        <Text style={{
                            fontSize: textSizeRender(3.5),
                            fontWeight: 'bold',
                            color:'white'
                        }}
                        >{"Filtrar"}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            {
                visibleFilter &&
                <ModalFilter visible={visibleFilter} title={"Filtrar"} actionAccept={()=>{
                    setVisibleFilter(false)
                }
                } actionClose={()=>setVisibleFilter(false)} />
            }
        </ContainerGeneric>
    )
};
const mapState = (state) => {
    return {
        auth: state.auth,
        app: state.app,
        hotels: state.hotels,
        search: state.search
    }
}
export default connect(mapState,{setSearchParamsAction})(HotelsScreen);
