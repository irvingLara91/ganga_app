import React from "react";
import {Actionsheet, Box, ScrollView} from "native-base";
import {Text} from "react-native";
import {textSizeRender} from "../../utils/utils";

const SelectGenericComponent = ({send, selected, options = [], title = "Seleccione un tipo de documento", ...props}) => {

    const sendData = (item) => {
        send(item)
    }

    return (
        <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
            <Actionsheet.Content bg={'white'}>
                <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: textSizeRender(5)
                    }}>
                        {title}
                    </Text>
                </Box>
                <ScrollView style={{width: '100%'}}>
                    {
                        options.map((item,index) => {
                            return (
                                <Actionsheet.Item

                                    _pressed={{
                                        bg: selected === item.id ? 'red.100' : 'red.100',
                                        _text: {
                                            fontSize: textSizeRender(4.3),
                                        }
                                    }}

                                    bg={selected === item.id ? 'red.100' : 'white'}

                                    key={index} onPress={() => {
                                    sendData(item);
                                }}>{item.name}</Actionsheet.Item>
                            )
                        })
                    }
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
export default SelectGenericComponent;
