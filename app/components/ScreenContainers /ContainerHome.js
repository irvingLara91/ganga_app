import React from "react";
import {TouchableOpacity, Text, StatusBar, View, Dimensions} from "react-native";
import {SCREEN_HEIGHT, statusBarHeight} from "../../utils/utils";
import ToolbarHome from "../Toolbars/ToolbarHome";


const ContainerHome = ({...props}) => {

    return (
        <View style={{
            flex:.89,
            paddingTop: statusBarHeight + 50,
            backgroundColor:props.app.secondaryColor,
        }}>
            <ToolbarHome app={props.app} logOut={props.logOut} auth={props.auth}/>
            <View style={{width:'100%',height:'100%',alignItems:'center'}}>
                    {props.children}
            </View>
        </View>
    );
};
export default ContainerHome;
