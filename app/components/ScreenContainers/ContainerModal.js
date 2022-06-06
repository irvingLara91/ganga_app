import {View} from "react-native";
import {statusBarHeight} from "../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import React from "react";
import ToolbarGeneric from "../Toolbars/ToolbarGeneric";
import ToolbarModal from "../Toolbars/ToolbarModal";

const ContainerModal = ({title = "",isForm=true,closeAction, ...props}) => {
    return (
        <View style={{
            backgroundColor:props.app.secondaryColor,
            flex: 1,
            paddingTop: statusBarHeight + 50,
        }}>
            <ToolbarModal app={props.app} closeAction={closeAction} title={title}/>
            {
                isForm ?
                    <KeyboardAwareScrollView
                        enableResetScrollToCoords={false}
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
export default ContainerModal;
