import React, {useEffect} from "react";
import {View, Text, Image} from "react-native";
import {connect} from "react-redux";
import ContainerProfile from "../components/ScreenContainers/ContainerProfile";
import {SCREEN_WIDTH, services, textSizeRender} from "../utils/utils";
import {Feather, SimpleLineIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import PersonalDataForm from "../components/ProfileForms/PersonalDataForm";
import PhonesForm from "../components/ProfileForms/PhonesForm";
import EmailForm from "../components/ProfileForms/EmailForm";
import PasswordForm from "../components/ProfileForms/PasswordForm";
import userService from "../services/user";

const ProfilesScreen = (props) => {



    const getPersonalData =(personalData)=>{

        userService.updateUser(props.auth.user.email, {profile:personalData}).then(res=>{
        console.log(res)
            console.log(props.auth.user)

        }).catch(e=>{
            console.error(e)
        })
        console.log("personalData",personalData);
    }

    const newPhoneNumber =(phoneNumberData)=>{
        console.log("phoneNumberData",phoneNumberData);
    }
    const newEmail =(emailData)=>{
        console.log("emailData",emailData);
    }

    const changePassword =(passwordData)=>{
        console.log("passwordData",passwordData);
    }

    return (
        <ContainerProfile app={props.app} title={"Perfil"}>
            <View style={{width: '100%', height: '100%'}}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: SCREEN_WIDTH * .1,
                }}>
                    <View>
                        <Image
                            style={{
                                width: SCREEN_WIDTH * .25,
                                height: SCREEN_WIDTH * .25,
                                borderRadius: SCREEN_WIDTH * .25
                            }}
                            source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}}
                        />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: SCREEN_WIDTH * .05,
                        paddingBottom: SCREEN_WIDTH * .1
                    }}>
                        <Text style={{
                            fontSize: textSizeRender(5),
                            fontWeight: 'bold'
                        }}>{props.auth.user.email}</Text>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>
                <View style={{
                        paddingTop: SCREEN_WIDTH * .1,
                        paddingHorizontal:SCREEN_WIDTH * .05,
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Ionicons name="ios-person-circle-outline" size={SCREEN_WIDTH * .12} color="black"/>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: textSizeRender(5),
                                fontWeight: 'bold'
                            }}> Datos Personales</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingBottom: SCREEN_WIDTH * .1
                    }}>
                        <PersonalDataForm app={props.app} send={getPersonalData}/>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>

                {/****PHONES*****/}
                <View style={{
                    paddingTop: SCREEN_WIDTH * .1,
                    paddingHorizontal:SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View style={{borderRadius:100 ,borderWidth:2,padding:5}}>
                                <Feather name="phone" size={SCREEN_WIDTH * .06} color="black" />
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: textSizeRender(5),
                                fontWeight: 'bold'
                            }}> Télefonos</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingBottom: SCREEN_WIDTH * .1
                    }}>
                        <PhonesForm app={props.app} send={newPhoneNumber}/>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>
                {/****END PHONES*****/}

                {/****EMAIL*****/}
                <View style={{
                    paddingTop: SCREEN_WIDTH * .1,
                    paddingHorizontal:SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View style={{borderRadius:100 ,borderWidth:2,padding:5}}>
                                <MaterialCommunityIcons name="email-outline" size={SCREEN_WIDTH * .06} color="black" />
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: textSizeRender(5),
                                fontWeight: 'bold'
                            }}> Emails</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingBottom: SCREEN_WIDTH * .1
                    }}>
                        <EmailForm app={props.app} email={props.auth.user.email} send={newEmail}/>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>
                {/****END EMAIL*****/}

                {/****CHANGE PASSWORD*****/}
                <View style={{
                    paddingTop: SCREEN_WIDTH * .1,
                    paddingHorizontal:SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View style={{borderRadius:100 ,borderWidth:2,padding:5}}>
                                <SimpleLineIcons name="lock" size={SCREEN_WIDTH * .06} color="black" />
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: textSizeRender(5),
                                fontWeight: 'bold'
                            }}> Contraseña</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingBottom: SCREEN_WIDTH * .1
                    }}>
                        <PasswordForm app={props.app}  send={changePassword}/>
                    </View>
                </View>
                {/****END CHANGE PASSWORD*****/}
            </View>
        </ContainerProfile>
    )
};
const mapState = (state) => {
    return {
        auth: state.auth,
        app: state.app
    }
}
export default connect(mapState)(ProfilesScreen);
