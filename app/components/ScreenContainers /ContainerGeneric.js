import {View} from "react-native";
import {statusBarHeight} from "../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import React from "react";
import ToolbarGeneric from "../Toolbars/ToolbarGeneric";

const ContainerGeneric = ({title = "",isForm=true, ...props}) => {
    return (
        <View style={{
            flex: 1,
            paddingTop: statusBarHeight + 50,
        }}>
            <ToolbarGeneric app={props.app} title={title}/>
            {
                isForm ?
                    <KeyboardAwareScrollView
                        extraScrollHeight={60}
                        enableOnAndroid={true}
                        keyboardShouldPersistTaps="handled">
                        {props.children}
                    </KeyboardAwareScrollView>
                    :
                    <View style={{width:'100%',height:'100%'}}>
                        {props.children}
                    </View>
            }

        </View>
    );
};
export default ContainerGeneric;
