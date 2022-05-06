import React, {useEffect, useState} from 'react'
import {
    View, StyleSheet, Platform, Modal, Text, TouchableOpacity
} from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker";

export const isAndroid = () => Platform.OS === 'android';
const DateTimePickerCustom = (props) => {
    const [privateDate, setPrivateDate] = useState(null);
    useEffect(() => {
        setPrivateDate(props.date)
    }, [props.date])
    return (
        (isAndroid() === true && props.visible === true) ?
            <DateTimePicker
                testID={'dateTimePicker'}
                style={{width: '100%', height: 150}}
                value={props.date}
                mode={props.mode}
                is24Hour={true}
                display={'default'}
                locale={'es-ES'}
                onChange={(e, v) => {
                    if (e.type === 'set') {
                        props.setVisible(false)
                        props.onChange(v)

                    } else if (e.type === 'dismissed') {
                        props.setVisible(false)
                    }
                }}
                minimumDate={props.minimumDate}
            />
            :
            (isAndroid() === false && props.visible === true) &&

            <Modal
                animationType={'slide'}
                transparent={true}
                visible={props.visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalTitle, {color: props.app.primaryColor}]}>{props.title}</Text>
                        <DateTimePicker
                            testID={'dateTimePicker'}
                            style={{width: '100%', height: 150}}
                            textColor={'black'}
                            value={props.date}
                            mode={props.mode}
                            is24Hour={true}
                            display={'spinner'}
                            locale={'es-ES'}
                            onChange={props.onChange}
                            onChange={(e, v) => {
                                props.onChange(v)
                            }}
                            minimumDate={props.minimumDate}
                        />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            <View style={{fle: 1, alignItems: 'center', width: '40%', marginRight: 10}}>
                                <TouchableOpacity
                                    style={{
                                        width: '100%', padding: 5,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        backgroundColor: 'red'
                                    }}
                                    onPress={() => {
                                        props.setVisible(false)
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                            width: '100%',
                                        }}
                                    >Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{fle: 1, alignItems: 'center', width: '40%', marginLeft: 10}}>
                                <TouchableOpacity
                                    style={{
                                        width: '100%', padding: 5,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        backgroundColor: 'green'
                                    }}
                                    onPress={() => {
                                        props.onChange(privateDate)
                                        props.setVisible(false)
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                            width: '100%',
                                        }}
                                    >Accept</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </View>

            </Modal>

    )
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        height: 'auto',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    openButton: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    textStyle: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    }
})
export default DateTimePickerCustom;
