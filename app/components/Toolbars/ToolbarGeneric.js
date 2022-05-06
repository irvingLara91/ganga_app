import {Text, TouchableOpacity, View} from "react-native";
import {statusBarHeight, textSizeRender} from "../../utils/utils";
import {AntDesign} from "@expo/vector-icons";
import React from "react";


const ToolbarGeneric = (props) => {

    return (
        <View style={{width: '100%', zIndex: 2, position: 'absolute'}}>
            <View
                style={{
                    height: statusBarHeight + 50,
                    backgroundColor: props.app.primaryColor,
                    flexDirection: 'row',
                    paddingTop: statusBarHeight - 5,
                    shadowColor: '#1a1a1a',
                    shadowOffset: {width: 1, height: 1},
                    shadowRadius: 2,
                    shadowOpacity: 0.15,
                    zIndex: 1111,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        flx: 1,
                        paddingLeft: 18,
                        paddingRight: 8,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}>

                    <AntDesign name="left" size={textSizeRender(6)} color="white"/>
                </TouchableOpacity>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: textSizeRender(5),
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    zIndex: 0
                }}>{props.app.name}</Text>
                <View style={{
                    paddingRight: 18
                }}>
                    {
                        <AntDesign name="right" size={textSizeRender(6)} color={props.app.primaryColor}/>
                    }
                </View>
            </View>
        </View>

    )
};
export default ToolbarGeneric;
