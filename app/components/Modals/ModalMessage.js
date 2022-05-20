import React from "react";
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import {SCREEN_HEIGHT, textSizeRender} from "../../utils/utils";
import {MaterialIcons} from "@expo/vector-icons";


const ModalMessage = ({
                          visible,
                          setVisible,
                          titleButton = "Botón",
                          title = '¡Error!',
                          message,
                          isError = false,
                          app
                      }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {backgroundColor: app.primaryColor}]}>
                        {isError &&
                            <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 0}}>

                                <MaterialIcons name="cancel" size={50} color={app.fontColorWhite}/>
                            </View>
                        }
                        <Text style={[styles.modalTitle, {color: app.fontColorWhite}]}>{title}</Text>

                        <Text style={[styles.modalText, {marginBottom: 30, color: app.fontColorWhite}]}>{message}</Text>

                        <TouchableOpacity style={[styles.fbBtn, {backgroundColor: app.tertiaryColor}]} onPress={() => {
                            setVisible(false)
                        }}>
                            <Text style={[styles.fbText, {color: app.fontColorWhite}]}>
                                {titleButton}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.53)',
        justifyContent: "center",
        alignItems: "center",
    },
    fbBtn: {
        width: SCREEN_HEIGHT / 3,
        height: 40,
        borderRadius: 10,
        marginTop: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    fbText: {
        fontWeight: 'bold',
        fontSize: textSizeRender(4),
    },
    modalView: {
        margin: 20,
        width: '80%',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",

    },
    modalTitle: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 20,
    }
});

export default ModalMessage;
