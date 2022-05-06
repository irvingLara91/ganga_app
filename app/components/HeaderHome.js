import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {textSizeRender} from "../utils/utils";
import {useNavigation} from "@react-navigation/native";

const HeaderHome = ({app, ...props}) => {
    const navigation = useNavigation()

    const goSearch =()=>{
        navigation.navigate("SearchScreen");
    }

    return (<View style={{paddingVertical: 15}}>
        <View style={{flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <TouchableOpacity
                    onPress={()=>goSearch()}
                    style={{
                    borderRadius: 5,
                    borderColor: '#bbbbbb',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    padding: 14
                }}>
                    <Text style={{color: '#696969', fontSize: textSizeRender(4.5)}}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0,marginLeft:10}}>
                <TouchableOpacity
                    onPress={()=>goSearch()}
                    style={{backgroundColor: app.primaryColor, padding: 12, borderRadius: 50}}>
                    <AntDesign name="search1" size={24} color={"white"}/>
                </TouchableOpacity>
            </View>

        </View>
    </View>);
}
export default HeaderHome;
