import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ContainerGeneric from "../components/ScreenContainers/ContainerGeneric";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import SelectTypeComponent from "../components/SelectTypeComponent/SelectTypeComponent";
import {SCREEN_WIDTH, services, textSizeRender} from "../utils/utils";
import {addInfoToPreOrder} from "../redux/preOrderDuck";

const ConfigureYourStayScreen = (props) => {
    const [update, setUpdate] = useState(null)
    const [services_, setServices_] = useState([])


    useEffect(()=>{
      ///  console.log("Preorder",props.preOrder)
    },[props.preOrder])

    useEffect(() => {
        let newArray = []
        services.map(item => {
            let newFactor = {}
            newFactor.id = item.id
            newFactor.name = item.name
            newFactor.icon = item.icon
            newFactor.type = item.type
            newFactor.value = null
            newArray.push(newFactor)
        })
        setServices_(newArray)
        return () => {
            setServices_([])
        }
    }, [])


    const addResponse = (response, index) => {
        let array_new_ = services_;
        let array_new_2 = services_;
        array_new_2[index].value = response
        // delete array_new_2[index].icon
        // let selece_ = _.filter(array_new_2, item => item.value !== null && item.value !== undefined );
       // console.log(array_new_2)
        setUpdate(!update)
    }

    return (
        <ContainerGeneric app={props.app} title={"Configurá tu estadía"} isForm={false}>
            <ScrollView>
                <View style={{alignItems: 'center', padding: 40}}>
                    {
                        <SelectTypeComponent
                            addResponse={addResponse}
                            arrayFactors={services_} app={props.app}
                            update={update}/>
                    }
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                               /// console.log(services_)
                                props.addInfoToPreOrder({stay_config: services_})
                                props.navigation.navigate("CheckOutScreen")
                            }}
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor: props.app.primaryColor,
                                height: SCREEN_WIDTH * .12,
                                width: SCREEN_WIDTH * .5,
                                borderRadius: SCREEN_WIDTH * .4
                            }}>
                            <Text style={{fontSize:textSizeRender(4),
                                fontWeight:'bold',
                                color:props.app.fontColorWhite}}>CONFIRMAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{props.navigation.goBack()}}
                            style={{
                                marginTop:SCREEN_WIDTH * .05,
                                justifyContent:'center',
                                alignItems:'center',
                                borderColor: props.app.primaryColor,
                                borderWidth:1,
                                height: SCREEN_WIDTH * .12,
                                width: SCREEN_WIDTH * .5,
                                borderRadius: SCREEN_WIDTH * .4
                            }}>
                            <Text style={{fontSize:textSizeRender(4),
                                fontWeight:'bold',
                                color:props.app.primaryColor}}>CANCELAR</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </ContainerGeneric>)
}
const mapState = (state) => {
    return {
        app: state.app,
        auth: state.auth,
        preOrder : state.preOrder
    }
}
export default connect(mapState,{addInfoToPreOrder})(ConfigureYourStayScreen)
