import React, {useEffect, useState} from "react";
import {Switch, Text, View} from "react-native";
import {connect} from "react-redux";
import ContainerGeneric from "../components/ScreenContainers /ContainerGeneric";
import {SCREEN_WIDTH, textSizeRender} from "../utils/utils";
import SearchForm from "../components/SearchForm/SearchForm";
import {useNavigation} from "@react-navigation/native";
import {searchHotelsAction} from "../redux/hotelsDuck";
import {setSearchParamsAction} from "../redux/searchDuck";

/**
 * Component SWITCH
 * **/
const SwitchCustom = ({send, ...props}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        send(isEnabled)
    }, [isEnabled]);

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: SCREEN_WIDTH * .07,
            paddingBottom: SCREEN_WIDTH * .07
        }}>
            <View style={{marginRight: SCREEN_WIDTH * .05}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    color: !isEnabled ? props.app.primaryColor : 'gray'
                }}>ESTADIA</Text>
            </View>
            <Switch
                trackColor={{false: props.app.tertiaryColor, true: props.app.tertiaryColor}}
                thumbColor={props.app.primaryColor}
                ios_backgroundColor={props.app.tertiaryColor}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <View style={{marginLeft: SCREEN_WIDTH * .05}}>
                <Text style={{
                    fontSize: textSizeRender(4),
                    fontWeight: 'bold',
                    color: isEnabled ? props.app.primaryColor : 'gray'
                }}>MICROESTADÍA</Text>
            </View>
        </View>
    );
};

/**
 * END Component SWITCH
 * **/
const SearchScreen = (props) => {
    const navigation = useNavigation();
    const [isMicro, setIsMicro] = useState(null)

    const getSwitch = (response) => {
        setIsMicro(response)
    }


    const handleSearch = (search_) => {
        search_.isMicro = isMicro;
        if (isMicro) {
            search_.dateEnd = null;
            search_.rooms = null;
            search_.persons = null;
        } else {
            search_.hours = null;
        }
        props.setSearchParamsAction({...props.search, ...search_})
        props.searchHotelsAction();
        navigation.navigate("HotelsScreen", {formSearch: search_});
    }


    return (
        <ContainerGeneric app={props.app} title={"Encuestra tu hotel"}>
            <View style={{width: '100%', height: '100%'}}>
                <SwitchCustom app={props.app} send={getSwitch}/>
                <View style={{backgroundColor: 'rgba(185,185,185,0.94)', height: (SCREEN_WIDTH * .004)}}/>
                <View style={{
                    paddingTop: SCREEN_WIDTH * .05,
                    paddingHorizontal: SCREEN_WIDTH * .05,
                    paddingBottom: SCREEN_WIDTH * .1
                }}>
                    <SearchForm isMicro={isMicro} app={props.app} send={handleSearch}/>
                </View>
            </View>

        </ContainerGeneric>
    )


};
const mapState = (state) => {
    return {
        auth: state.auth,
        app: state.app,
        search: state.search,
    }
}
export default connect(mapState, {setSearchParamsAction, searchHotelsAction})(SearchScreen);
