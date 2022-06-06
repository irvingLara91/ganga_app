import React, {useState} from "react";
import {ScrollView, View, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addInfoToPreOrder} from "../redux/preOrderDuck";
import ContainerGeneric from "../components/ScreenContainers/ContainerGeneric";
import PaymentMethodForm from "../components/CheckOutForms/PaymentMethodForm";
import HolderForm from "../components/CheckOutForms/HolderForm";
import SendVouchersForm from "../components/CheckOutForms/SendVouchersForm";
import {SCREEN_WIDTH, textSizeRender, validEmail} from "../utils/utils";
import PhonesCheckOutForm from "../components/CheckOutForms/PhonesCheckOutForm";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from '@expo/vector-icons';

const CheckOutScreen = (props) => {

    /**
     * Payment Method
     **/
    const [payment, setPayment] = useState(null);
    const [paymentError, setPaymentError] = useState(false);
    const validateTypePayment = () => {
        let error = false;
        setPaymentError(false)
        if (payment===null){
            setPaymentError(true)
            error =true
        }

        return error;
    }

    const getTypePayment =()=>{
        if (validateTypePayment()){
            return
        }
        console.log("typePayment",payment)
    }

    /**
     *  END Payment Method
     **/


    /**
     * Holder
     **/
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [typeDoc, setTypeDoc] = useState(1);
    const [numDoc, setNumDoc] = useState('');

    const [nameError, setNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [numDocError, setNumDocError] = useState(false);


    const validateHolder = () => {
        let error = false;
        setNameError(false)
        setLastNameError(false)
        setNumDocError(false)
        if (name.trim() ==="") {
            setNameError(true)
            error = true
        }
        if (lastName.trim() ==="") {
            setLastNameError(true)
            error = true
        }

        if (numDoc.trim() ==="") {
            setNumDocError(true)
            error = true
        }

        return error
    }
    const getHolder = () => {
        if (validateHolder()){
            return
        }
        console.log("Form Holder",name, lastName, typeDoc, numDoc)
    }
    /**
     * End  Holder
     **/

    /**
     *  Voucher Holder
     **/
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [checkNotification, setCheckNotification] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [confirmEmailError, setConfirmEmailError] = useState(false);

    const validateEmail = () => {
        let error = false;
        setConfirmEmailError(false)
        setEmailError(false)
        if (validEmail(email).error) {
            setEmailError(true)
            error = true
        }
        if (email !== confirmEmail) {
            setConfirmEmailError(true)
            error = true
        }

        return error
    }

    const getEmailVouchers = () => {
        if (validateEmail()) {
            return
        }

        console.log("Form Voochers",email,confirmEmail,checkNotification)


    }

    /**
     * End  Voucher Holder
     **/


    /**
     * Phones Numbers
     **/
    const [country, setCountry] = useState(null);
    const [isCountryError, setIsCountryError] = useState(false);

    const [area, setArea] = useState(null);
    const [isAreaError, setIsAreaError] = useState(false);

    const [phone, setPhone] = useState(null);
    const [isPhoneError, setIsPhoneError] = useState(false);

    const [checkWhatsapp, setCheckWhatsapp] = useState(false);


    const validatePhone = () => {
        let error = false;
        setIsCountryError(false)
        setIsAreaError(false)
        setIsPhoneError(false)
        if ( country ===null) {
            setIsCountryError(true)
            error = true
        }
        if ( area ===null ) {
            setIsAreaError(true)
            error = true
        }
        if (phone ===null || phone.trim() === "") {
            setIsPhoneError(true)
            error = true
        }

        return error
    }

    const getPhones = () => {
        if (validatePhone()) {
            return
        }

        console.log("Phone completed",country.name,area,phone,checkWhatsapp)


    }

    /**
     * Email Phones Numbers
     **/



    const [term,setTerm] = useState(false);




    const onClick = () => {
        if (!term){
            return
        }
        getTypePayment()
        getHolder();
        getEmailVouchers();
        getPhones();
    }
    return (
        <ContainerGeneric app={props.app} title={"Reservar"} isForm={false}>
            <KeyboardAwareScrollView
                enableResetScrollToCoords={false}
                extraScrollHeight={0}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled">
                <PaymentMethodForm
                    preOrder={props.preOrder}
                    payment={payment}
                    setPayment={setPayment}
                    error={paymentError}
                    app={props.app}/>
                <HolderForm
                    name={name}
                    setName={setName}
                    lastName={lastName}
                    setLastName={setLastName}
                    typeDoc={typeDoc}
                    setTypeDoc={setTypeDoc}
                    numDoc={numDoc}
                    setNumDoc={setNumDoc}
                    nameError={nameError}
                    lastNameError={lastNameError}
                    numDocError={numDocError}
                    app={props.app}/>
                <SendVouchersForm
                    email={email}
                    setEmail={setEmail}
                    confirmEmail={confirmEmail}
                    setConfirmEmail={setConfirmEmail}
                    checkNotification={checkNotification}
                    setCheckNotification={setCheckNotification}
                    emailError={emailError}
                    confirmEmailError={confirmEmailError}
                    app={props.app}/>
                <PhonesCheckOutForm
                    country={country}
                    setCountry={setCountry}
                    area={area}
                    setArea={setArea}
                    phone={phone}
                    setPhone={setPhone}
                    checkWhatsapp={checkWhatsapp}
                    setCheckWhatsapp={setCheckWhatsapp}
                    isCountryError={isCountryError}
                    isAreaError={isAreaError}
                    isPhoneError={isPhoneError}
                    app={props.app}/>
                <View style={{paddingTop: SCREEN_WIDTH * .07, paddingHorizontal: SCREEN_WIDTH * .07}}>

                    <View style={{paddingTop: SCREEN_WIDTH * .01}}>
                        <TouchableOpacity
                            style={{flex: 1}} onPress={() => setTerm(!term)}>
                            <View style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: SCREEN_WIDTH * .09,
                                        height: SCREEN_WIDTH * .09,
                                        borderRadius: SCREEN_WIDTH * .08,
                                        borderWidth: SCREEN_WIDTH * .007,
                                        borderColor: term ? props.app.primaryColor : 'gray'
                                    }}>
                                        <View style={{
                                            width: SCREEN_WIDTH * .05,
                                            height: SCREEN_WIDTH * .05,
                                            borderRadius: SCREEN_WIDTH * .03,
                                            backgroundColor: term ? props.app.primaryColor : 'transparent'
                                        }}/>
                                    </View>
                                    <Text style={{
                                        fontSize: textSizeRender(3.5),
                                        fontWeight: 'bold',
                                        marginLeft: 10, alignSelf: 'center'
                                    }}>{"Leí y acepto las "}<Text style={{
                                        fontSize: textSizeRender(3.5),
                                        fontWeight: 'bold',
                                        color:'red',
                                        marginLeft: 10,
                                    }}>{"condiciones de compra.\nPolíticas de privacidad y políticas de\ncambio y cancelaciones."}
                                    </Text></Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop:SCREEN_WIDTH * .07,
                        marginBottom: SCREEN_WIDTH * .07,
                        width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>

                    <Text style={{fontSize: textSizeRender(5.2), fontWeight: 'bold'}}>Detalle de la compra</Text>
                    <View style={{paddingTop: SCREEN_WIDTH * .07}}>
                        <FontAwesome5 name="hotel" size={24} color="black" />
                        <Text style={{
                            marginTop:10,
                            fontSize: textSizeRender(5.5), fontWeight: 'bold'}}>Hotel {props.preOrder.room.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}} >
                                <Text style={{
                                    marginTop:10,
                                    color:'#5e5e5e',
                                    fontSize: textSizeRender(4),
                                    fontWeight: 'bold'}}>Check In</Text>

                                <Text style={{
                                    marginTop:5,
                                    color:'#050505',
                                    fontSize: textSizeRender(4),
                                    fontWeight: 'bold'}}>10 Oct 2022</Text>

                                <Text style={{
                                    marginTop:5,
                                    color:'#797979',
                                    fontSize: textSizeRender(3)}}>14:00:00</Text>
                            </View>
                            <View>
                                <Text style={{
                                    marginTop:10,
                                    color:'#5e5e5e',
                                    fontSize: textSizeRender(4),
                                    fontWeight: 'bold'}}>Check Out</Text>

                                <Text style={{
                                    marginTop:5,
                                    color:'#050505',
                                    fontSize: textSizeRender(4),
                                    fontWeight: 'bold'}}>15 Oct 2022</Text>

                                <Text style={{
                                    marginTop:5,
                                    color:'#797979',
                                    fontSize: textSizeRender(3)}}>10:00:00</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={{
                    marginTop: SCREEN_WIDTH * .07,
                    width:'100%',height:1,backgroundColor:'#b0b0b0'}}/>
                <View style={{paddingTop: SCREEN_WIDTH * .07, paddingHorizontal: SCREEN_WIDTH * .07}}>
                    <Text style={{fontSize: textSizeRender(5.2), fontWeight: 'bold'}}>Detalle de pago</Text>
                </View>

                <View style={{
                    marginTop: SCREEN_WIDTH * .07,
                    backgroundColor:props.app.primaryColor,
                    height:SCREEN_WIDTH * .2,
                    alignItems:'center',
                    paddingHorizontal:SCREEN_WIDTH * .07,
                    flexDirection:'row'
                }}>

                    <Text style={{flex:1,
                        color:props.app.tertiaryColor,
                        fontSize: textSizeRender(6), fontWeight: 'bold'}}>Total:</Text>
                    <Text style={{
                        color:props.app.tertiaryColor,
                        fontSize: textSizeRender(6), fontWeight: 'bold'}}>${props.preOrder.room.price.toLocaleString("es-AR")}</Text>
                </View>

                <View style={{
                    marginTop: SCREEN_WIDTH * .1,
                    paddingHorizontal: SCREEN_WIDTH * .07,
                    marginBottom: SCREEN_WIDTH * .1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            borderRadius: SCREEN_WIDTH * .1,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: SCREEN_WIDTH * .04,
                            backgroundColor: props.app.primaryColor
                        }}
                        onPress={() => {
                            onClick()
                        }}
                    >
                        <Text style={{
                            fontSize: textSizeRender(4),
                            color: 'white', fontWeight: 'bold'
                        }}>COMPRAR</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        </ContainerGeneric>
    )
}
const mapState = (state) => {
    return {
        app: state.app,
        auth: state.auth,
        preOrder: state.preOrder
    }
}
export default connect(mapState, {addInfoToPreOrder})(CheckOutScreen);
