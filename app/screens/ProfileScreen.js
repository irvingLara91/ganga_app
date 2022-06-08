import React, {useEffect, useState} from "react";
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
import {setProfile} from "../redux/authDuck";
import {verLo} from "../services/auth";

const ProfilesScreen = (props) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPass, setLoadingPass] = useState(false);
    const [resetPass, setResetPass] = useState(false)
    const [resetPhone, setResetPhone] = useState(false);
    const [resetEmail, setResetEmail] = useState(false);

    useEffect(() => {
        //console.log(loading)
        if (props.auth.user && props.auth.user.profile) {
            setProfile(props.auth.user.profile)
        }
    }, [props.auth.user, loading])

    const getPersonalData = (personalData) => {
        setLoading(true)
        userService.updateUser(props.auth.user.email, {profile: personalData}).then(res => {
            setProfile({...props.auth.user, profile: personalData})
            setLoading(false)

        }).catch(e => {
            setLoading(false)
            console.error(e)
        })
    }

    const newPhoneNumber = (phoneNumberData) => {
        let phones = props.auth.user.phones ? props.auth.user.phones : []
        phones.push(phoneNumberData)
        userService.updateUser(props.auth.user.email, {phones: phones}).then(res => {
            setResetPhone(true)
        }).catch(e => {
            console.error(e)
        })
    }
    const newEmail = (emailData) => {
        let emails = props.auth.user.emails ? props.auth.user.emails : []
        emails.push(emailData)
        userService.updateUser(props.auth.user.email, {emails: emails}).then(res => {
            setResetEmail(true)
        }).catch(e => {
            console.error(e)
        })
    }

    const changePassword = (passwordData) => {
        console.log("passwordData", passwordData);
        setLoadingPass(true)
        const {currentPassword, newPassword, confirmationPassword} = passwordData;
        const verified = verLo(props.auth.user.email, currentPassword);
            console.log(verified)

        if (verified) {
            userService.updateUserPassword(newPassword).then(res => {
                console.log("update pass: ", res)
                if (res.error){
                    alert("error")
                }else {
                    alert("Contraseña  actualizada")
                    setResetEmail(true)
                    setLoadingPass(false)
                }

            }).catch(e => {
                console.log("error", e)
                setLoadingPass(false)
            })
        }
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
                    paddingHorizontal: SCREEN_WIDTH * .05,
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
                        <PersonalDataForm
                            profile={profile}
                            app={props.app} send={getPersonalData}/>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>

                {/****PHONES*****/}
                <View style={{
                    paddingTop: SCREEN_WIDTH * .1,
                    paddingHorizontal: SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View style={{borderRadius: 100, borderWidth: 2, padding: 5}}>
                                <Feather name="phone" size={SCREEN_WIDTH * .06} color="black"/>
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
                        <PhonesForm
                            reset={resetPhone}
                            setReset={setResetPhone}
                            app={props.app} send={newPhoneNumber}/>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>
                {/****END PHONES*****/}

                {/****EMAIL*****/}
                <View style={{
                    paddingTop: SCREEN_WIDTH * .1,
                    paddingHorizontal: SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View style={{borderRadius: 100, borderWidth: 2, padding: 5}}>
                                <MaterialCommunityIcons name="email-outline" size={SCREEN_WIDTH * .06} color="black"/>
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
                        <EmailForm
                            reset={resetEmail}
                            setReset={setResetEmail}
                            app={props.app} email={props.auth.user.email} send={newEmail}/>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>
                {/****END EMAIL*****/}

                {/****CHANGE PASSWORD*****/}
                <View style={{
                    paddingTop: SCREEN_WIDTH * .1,
                    paddingHorizontal: SCREEN_WIDTH * .05,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View style={{borderRadius: 100, borderWidth: 2, padding: 5}}>
                                <SimpleLineIcons name="lock" size={SCREEN_WIDTH * .06} color="black"/>
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
                        <PasswordForm
                            reset={resetEmail}
                            setReset={setResetEmail}
                            loading={loadingPass}
                            app={props.app} send={changePassword}/>
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
export default connect(mapState, {setProfile})(ProfilesScreen);
