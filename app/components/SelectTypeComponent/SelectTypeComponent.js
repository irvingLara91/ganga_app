import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Select} from "native-base";

import {SCREEN_WIDTH, textSizeRender} from "../../utils/utils";


const SelectTypeComponent = ({update,arrayFactors, ...props}) => {
    const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [arrayFactorsSelected, setArrayFactorsSelected] = useState([])
    useEffect(() => {
        setArrayFactorsSelected(arrayFactors)
    }, [update, arrayFactors]);

    return (
        arrayFactorsSelected.map((service, index) => {
                    return (
                        <View key={index} style={{
                            flexDirection: 'row',
                            height: SCREEN_WIDTH * .15,
                            borderColor: '#9d9a9a',
                            marginBottom: SCREEN_WIDTH * .05,
                            borderRadius: SCREEN_WIDTH * .02,
                            margin: 2, borderWidth: 1, alignItems: 'center', padding: 15
                        }}>
                            <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 10}}>
                                {service.icon}
                                <Text style={{marginLeft:10}}>{service.name}</Text>
                            </View>
                            <View style={{flex: 0, justifyContent: 'center'}}>
                                {
                                    service.type === "select" ?
                                        <Select
                                            minWidth={SCREEN_WIDTH * .19}
                                            //borderColor={props.app.primaryColor}
                                            style={{fontSize: textSizeRender(3)}}
                                            color={'black'}
                                            accessibilityLabel="0"
                                            placeholder="0"
                                            selectedValue={service.value ? service.value : 0}
                                            onValueChange={(itemValue) => props.addResponse(itemValue, index)}>
                                            {
                                                numbers.map((item, index) => {
                                                    return (
                                                        <Select.Item
                                                            key={index}
                                                            _pressed={{
                                                                fontSize: textSizeRender(4.3),
                                                                bg: "red.100",
                                                            }}
                                                            label={item + ""} value={item}/>)
                                                })
                                            }
                                        </Select>
                                        :
                                        <TouchableOpacity
                                            style={{flex:1,justifyContent:'center'}}
                                            onPress={() => props.addResponse(service.value !== undefined ? service.value === true ? false : true : true, index)}>
                                            <View>
                                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: SCREEN_WIDTH * .06,
                                                        height: SCREEN_WIDTH * .06,
                                                        borderRadius: SCREEN_WIDTH * .06,
                                                        borderWidth: SCREEN_WIDTH * .006,
                                                        borderColor: service.value ? props.app.primaryColor : 'gray'
                                                    }}>
                                                        <View style={{
                                                            width: SCREEN_WIDTH * .03,
                                                            height: SCREEN_WIDTH * .03,
                                                            borderRadius: SCREEN_WIDTH * .03,
                                                            backgroundColor: service.value ? props.app.primaryColor : 'transparent'
                                                        }}/>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    )
                })


    )
}
export default SelectTypeComponent;
