import React from "react";
import {TouchableOpacity, Text, StatusBar, View, Dimensions} from "react-native";
import {SCREEN_HEIGHT, statusBarHeight} from "../../utils/utils";
import ToolbarRegister from "../Toolbars/ToolbarRegister";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const ContainerRegister = ({title = "", ...props}) => {

    return (
        <View style={{
            flex:1,
            paddingTop: statusBarHeight + 50
        }}>
            <ToolbarRegister app={props.app} title={title}/>
            <KeyboardAwareScrollView
                extraScrollHeight={60}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled">
                {props.children}
            </KeyboardAwareScrollView>
        </View>
    );
};
export default ContainerRegister;
