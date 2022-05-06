import {View} from "react-native";
import {statusBarHeight} from "../../utils/utils";
import ToolbarRegister from "../Toolbars/ToolbarRegister";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import React from "react";

const ContainerProfile = ({title = "", ...props}) => {
    return (
        <View style={{
            flex: .89,
            paddingTop: statusBarHeight + 50,
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
export default ContainerProfile;
