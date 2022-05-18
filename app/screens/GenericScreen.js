import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import ContainerGeneric from "../components/ScreenContainers/ContainerGeneric";
import {useRoute} from "@react-navigation/native";
const GenericScreen = (props) => {
    const {screen} = useRoute().params ?? {};
    console.log(screen)

    return (
        <ContainerGeneric app={props.app} title={screen.title}>


        </ContainerGeneric>
    );

};

const mapState=(state)=>{
    return{
        app:state.app,
        auth:state.auth
    }
}
export default connect(mapState)(GenericScreen);
