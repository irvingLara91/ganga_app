import React, {useEffect, useState} from "react";
import {Modal, View, CheckBox, Text, TouchableOpacity, StyleSheet} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH, textSizeRender} from "../../utils/utils";
import ContainerModal from "../ScreenContainers/ContainerModal";
import RangeSlider, {Slider} from 'react-native-range-slider-expo';
import {AntDesign} from "@expo/vector-icons";
import _ from "lodash";
import {connect} from "react-redux";
import {setSearchParamsAction} from "../../redux/searchDuck";
import {searchHotelsAction} from "../../redux/hotelsDuck";

const MIN = 0;
const MAX = 6000;
const travel_profile = [
    {id: 1, name: "Todo"},
    {id: 2, name: "Familia"},
    {id: 3, name: "Shopping"},
    {id: 4, name: "Solos y solas"},
    {id: 5, name: "Pareja"}
];

const offers = [
    {id: 1, name: "10%"},
    {id: 2, name: "20%"},
    {id: 3, name: "30%"},
    {id: 4, name: "50%"},
    {id: 5, name: "Promo"},
    {id: 6, name: "Paquetes"}
];

const typesPayments = [
    {id: 1, name: "Todas las formas"},
    {id: 2, name: "En cuotas"},
    {id: 3, name: "En una cuota"},
    {id: 4, name: "pago en el  alojamiento"}
]


const ListCheckBox = ({title = "", options = [], setSelected, ...props}) => {
    const [length, setLength] = useState(options.length)
    const [more, setMore] = useState(false)
    const [refresh, setRefresh] = useState(false);

    const select = (id) => {
        for (let item of options) {
            if (item.id === id) {
                item.checked = !item.checked;
            }
        }
        setSelected(options)
        setRefresh(!refresh)
    }

    return (
        <View>
            <Text style={{
                fontWeight: 'bold',
                paddingBottom: SCREEN_WIDTH * .05,
                fontSize: textSizeRender(5)
            }}>{title}</Text>
            {length === 4 ?
                options.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => select(item.id)}
                        style={{
                            marginBottom: SCREEN_WIDTH * .04,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={{
                            alignItems: 'center',
                            backgroundColor: item.checked === true ? props.app.primaryColor : 'white',
                            height: SCREEN_WIDTH * .05, width: SCREEN_WIDTH * .05,
                            borderWidth: 1,
                            borderColor: item.checked === true ? props.app.primaryColor : '#b0b0b0',
                            marginRight: SCREEN_WIDTH * .03,
                        }}>
                            {
                                item.checked === true ?
                                    <AntDesign name="check" size={SCREEN_WIDTH * .045}
                                               color={props.app.fontColorWhite}/>
                                    :
                                    null
                            }
                        </View>
                        <Text
                            key={index}
                            style={{
                            fontWeight: 'bold', fontSize: textSizeRender(3)
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                ))
                :
                options && options.slice(0, more ? length : 4).map((item, index) =>
                    index !== options.slice(0, more ? length : 4).length - (more ? 0 : 1) ? (
                            <TouchableOpacity
                                key={index}
                                onPress={() => select(item.id)}
                                style={{
                                    marginBottom: SCREEN_WIDTH * .04,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <View style={{
                                    alignItems: 'center',
                                    backgroundColor: item.checked === true ? props.app.primaryColor : 'white',
                                    height: SCREEN_WIDTH * .05, width: SCREEN_WIDTH * .05,
                                    borderWidth: 1,
                                    borderColor: item.checked === true ? props.app.primaryColor : '#b0b0b0',
                                    marginRight: SCREEN_WIDTH * .03,
                                }}>
                                    {
                                        item.checked === true ?
                                            <AntDesign name="check" size={SCREEN_WIDTH * .045}
                                                       color={props.app.fontColorWhite}/>
                                            :
                                            null
                                    }
                                </View>
                                <Text style={{
                                    fontWeight: 'bold', fontSize: textSizeRender(3)
                                }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                        :
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setMore(true)
                            }}
                        >
                            <Text
                                style={{
                                    textDecorationLine: 'underline',
                                    fontSize: textSizeRender(3.1),
                                    color: props.app.primaryColor,
                                }}
                            >Ver más</Text>
                        </TouchableOpacity>
                )}

        </View>
    )
}

const ModalFilter = ({visible, title = '', actionClose, actionAccept, ...props}) => {


    /**** Errors states**/
    const [minError, setMinError] = useState(false);
    const [maxError, setMaxError] = useState(false);
    /**** Errors states**/

    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [travelOptions, setTravelOptions] = useState(travel_profile);
    const [offersOptions, setOffersOptions] = useState(offers);
    const [typesPaymentsOptions, setTypesPaymentsOptions] = useState(typesPayments);

    const validateData =()=>{
        setMaxError(false);
        setMinError(false);
        let error = false;
        if (fromValue === 0){
            error= true
            setMinError(true);
        }
        if (toValue === 0){
            error= true
            setMaxError(true);
        }

        return error;
    }

    const sendData = () => {

        if (validateData()){
            return
        }

        let travels_options = _.filter(travelOptions, {checked: true});
        let offers_options = _.filter(offersOptions, {checked: true});
        let typesPayments_options = _.filter(typesPaymentsOptions, {checked: true});
        props.setSearchParamsAction({...props.search, min:fromValue,max:toValue,
            travels_options,offers_options,typesPayments_options},props.searchHotelsAction())
        actionAccept()
    }

    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={visible}
        >
            <ContainerModal isForm={true} app={props.app} title={title} closeAction={actionClose}>
                <View style={styles.container}>
                    <Text style={{
                        fontWeight: 'bold',
                        paddingBottom: SCREEN_WIDTH * .05,
                        fontSize: textSizeRender(5)
                    }}>Precio por noche</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: SCREEN_WIDTH * .03, flex: 1}}>
                            <View style={[styles.textStyle,{borderColor:  minError ? 'red' :  'rgba(98,98,98,0.75)'}]}>
                                <View style={{flex: 1}}>
                                    <Text style={{
                                        color: '#9b9b9b',
                                        paddingTop: 5,
                                        paddingLeft: 8,
                                        fontSize: textSizeRender(3),
                                    }}>Min
                                    </Text>
                                </View>

                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        paddingRight: 10,
                                        fontSize: textSizeRender(4.5),
                                    }}>$ {fromValue.toLocaleString('es-AR')}</Text>
                                </View>
                            </View>
                            {
                                minError &&
                                <Text style={{fontSize:textSizeRender(2.5),color:'red'}}>Requerido</Text>
                            }
                        </View>
                        <View style={{marginLeft: SCREEN_WIDTH * .03, flex: 1}}>
                            <View style={[styles.textStyle,{borderColor:  maxError ? "red" :  'rgba(98,98,98,0.75)'}]}>
                                <View style={{flex: 1}}>
                                    <Text style={{
                                        color: '#9b9b9b',
                                        paddingTop: 5,
                                        paddingLeft: 8,
                                        fontSize: textSizeRender(3),
                                    }}>Max
                                    </Text>
                                </View>

                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        paddingRight: 10,
                                        fontSize: textSizeRender(4.5),
                                    }}>$ {toValue.toLocaleString('es-AR')}</Text>
                                </View>
                            </View>
                            {
                                maxError &&
                                <Text style={{fontSize:textSizeRender(2.5),color:'red'}}>Requerido</Text>
                            }
                        </View>
                    </View>
                    <View>
                        <RangeSlider min={MIN} max={MAX}
                                     showRangeLabels={false}
                                     valueLabelsBackgroundColor={props.app.primaryColor}
                                     inRangeBarColor={'#c5c5c5'}
                                     styleSize={10}
                                     fromKnobColor={props.app.primaryColor}
                                     toKnobColor={props.app.primaryColor}
                                     knobSize={SCREEN_WIDTH * .06}
                                     outOfRangeBarColor={props.app.primaryColor}
                                     fromValueOnChange={value => setFromValue(value)}
                                     toValueOnChange={value => setToValue(value)}
                        />
                    </View>
                    <ListCheckBox
                        title={"Perfil de viaje"}
                        options={travelOptions}
                        setSelected={(opt) => {
                            setTravelOptions(opt)
                        }}
                        app={props.app}

                    />
                    <View style={{paddingTop: SCREEN_WIDTH * .05}}>
                        <ListCheckBox
                            title={"Ofertas"}
                            options={offersOptions}
                            setSelected={(opt) => {
                                setOffersOptions(opt)
                            }}
                            app={props.app}
                        />
                    </View>

                    <View style={{paddingTop: SCREEN_WIDTH * .05, paddingBottom: SCREEN_WIDTH * .05}}>
                        <ListCheckBox
                            title={"Alternativas de pago"}
                            options={typesPaymentsOptions}
                            setSelected={(opt) => {
                                setTypesPaymentsOptions(opt)
                            }}
                            app={props.app}
                        />
                    </View>
                    <View style={{alignItems: 'center', paddingBottom: SCREEN_WIDTH * .1}}>
                        <TouchableOpacity
                            onPress={() => {
                                sendData()
                            }}
                            style={{
                                padding: 10,
                                width: '50%',
                                borderRadius: SCREEN_WIDTH * .05,
                                backgroundColor: props.app.primaryColor
                            }}>
                            <Text style={{
                                color: 'white',
                                fontSize: textSizeRender(4),
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>Aplicar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ContainerModal>

        </Modal>)

}
const styles = StyleSheet.create({
    container: {
        paddingTop: SCREEN_WIDTH * .05,
        paddingHorizontal: SCREEN_WIDTH * .06
    },
    textStyle: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        height: SCREEN_WIDTH * .11,
        fontSize: textSizeRender(4),
        backgroundColor: "white"
    }
});


const mapState = (state) => {
    return {
        app: state.app,
        search: state.search
    }
}
export default connect(mapState,{setSearchParamsAction, searchHotelsAction})(ModalFilter);

