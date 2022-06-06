import React, {useEffect, useState} from "react";
import {View, Text, TextInput, ActivityIndicator, TouchableOpacity, Image} from "react-native";
import {connect} from "react-redux";
import ContainerRegister from "../../components/ScreenContainers/ContainerRegister";
import {
    errorMessage,
    SCREEN_WIDTH,
    statusBarHeight,
    textSizeRender,
    validEmail,
} from "../../utils/utils";
import {Feather} from "@expo/vector-icons";
import {login} from "../../services/auth";
import ModalMessage from "../../components/Modals/ModalMessage";

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [visible,setVisible] = useState(false);
    const [message,setMessage] = useState('');


    useEffect(()=>{
        return () => {
            setLoading(false)
        }
    },[])

    const onLogin = () => {
        if (validEmail(email).error) {
            alert(validEmail(email).message);
            return;
        }
        if (password.length === 0) {
            alert("Ingresá la contraseña");
            return;
        }
        setLoading(true)
            login(email, password).then(response=>{
                console.log("response-->",response)
                if (response.status ==="error") {
                    setVisible(true);
                    setMessage(errorMessage(response.message));
                }
                setLoading(false)
            }).catch(e=>{
                console.log("error-->",e)
                setLoading(false)
            });

    };

    return (
        <ContainerRegister title={"Login"} app={props.app}>
            <View style={{width: "100%", paddingBottom: 20}}>
                <View
                    style={{
                        alignItems: "center",
                        paddingHorizontal: SCREEN_WIDTH * 0.12,
                    }}
                >
                    <Image
                        style={{
                            width: textSizeRender(55),
                            height: textSizeRender(55),
                            resizeMode: "contain",
                            tintColor: props.app.primaryColor,
                        }}
                        source={require("../../../assets/gg.png")}
                    />
                </View>

                <View
                    style={{
                        paddingTop: statusBarHeight + 50,
                        paddingHorizontal: SCREEN_WIDTH * 0.12,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                marginBottom: SCREEN_WIDTH * 0.03,
                                fontSize: textSizeRender(4.5),
                            }}
                        >
                            EMAIL
                        </Text>
                        <TextInput
                            autoCapitalize={"none"}
                            placeholder={"Ingresá tu mail"}
                            keyboardType={"email-address"}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            style={{
                                fontSize: textSizeRender(4),
                                borderRadius: SCREEN_WIDTH * 0.011,
                                backgroundColor: props.app.fontColorWhite,
                                padding: SCREEN_WIDTH * 0.025,
                                borderWidth: 1,
                                borderColor: "gray",
                            }}
                        />
                    </View>

                    <View
                        style={{
                            marginTop: SCREEN_WIDTH * 0.08,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                marginBottom: SCREEN_WIDTH * 0.03,
                                fontSize: textSizeRender(4.5),
                            }}
                        >
                            CONTRASEÑA
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                fontSize: textSizeRender(4),
                                borderRadius: SCREEN_WIDTH * 0.011,
                                backgroundColor: props.app.fontColorWhite,
                                padding: SCREEN_WIDTH * 0.025,
                                alignItems:'center',
                                borderWidth: 1,
                                borderColor: "gray",
                            }}
                        >
                            <TextInput
                                placeholder={"Ingresá tu contraseña"}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={{
                                    flex: 1,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword((prevState) => !prevState)}
                                style={{
                                    flex: 0,
                                }}
                            >
                                {showPassword ? (
                                    <Feather
                                        name="eye"
                                        size={textSizeRender(5)}
                                        color={props.app.primaryColor}
                                    />
                                ) : (
                                    <Feather
                                        name="eye-off"
                                        size={textSizeRender(5)}
                                        color={props.app.primaryColor}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            marginTop: SCREEN_WIDTH * 0.08,
                        }}
                    >

                        <TouchableOpacity
                            onPress={() =>
                                loading ?
                                    null
                                    :
                                    onLogin()
                        }
                            style={{
                                fontSize: textSizeRender(4),
                                borderRadius: SCREEN_WIDTH,
                                backgroundColor:loading ? "#b2b2b2" : props.app.primaryColor,
                                padding: SCREEN_WIDTH * 0.04,
                            }}
                        >
                            {
                                loading ?
                                    <ActivityIndicator color={'white'} />
                                    :
                                    <Text
                                        style={{
                                            fontSize: textSizeRender(4),
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            color: props.app.fontColorWhite,
                                        }}
                                    >
                                        INICIAR SESIÓN
                                    </Text>
                            }

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                visible &&
                <ModalMessage visible={visible}
                              setVisible={setVisible}
                              message={message}
                              title={""}
                              titleButton={"Cerrar"}
                              isError={true}
                              app={props.app}
                />
            }
        </ContainerRegister>
    );
};
const mapState = (state) => {
    return {
        app: state.app,
        auth: state.auth,
    };
};

export default connect(mapState)(LoginScreen);
