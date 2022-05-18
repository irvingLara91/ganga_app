import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {View} from "react-native";
import ContainerHome from "../components/ScreenContainers/ContainerHome";
import ApiApp from "../api/ApiApp";
import ListRecommendedHotels from "../components/ListRecommendedHotels/ListRecommendedHotels";
import {logOutAction} from "../redux/authDuck";

const HomeScreen = (props) => {
    const [hotels, setHotels] = useState([]);

    const getHotels = () => {
        ApiApp.getHotels().then(response => {
            if (response && response.data && response.data.length > 0) {
                response.data.is_favorite = false
                setHotels(response.data)
            }
        }).catch(e => {
            console.log(e)
        })
    }
    useEffect(() => {
        getHotels();
        return () => {
            setHotels([]);
        };
    }, [])

    return (<ContainerHome app={props.app} logOut={props.logOutAction} auth={props.auth}>
            <View style={{width: '100%'}}>
                <ListRecommendedHotels auth={props.auth} data={hotels.slice(0, 4)} callApi={getHotels} app={props.app}/>
            </View>
        </ContainerHome>
    );

};
const mapState = (state) => {
    return {
        auth: state.auth,
        app: state.app,
        name: state.app.name,
        primaryColor: state.app.primaryColor,
        secondaryColor: state.app.secondaryColor,
        tertiaryColor: state.app.tertiaryColor,
    }
}
export default connect(mapState, {logOutAction})(HomeScreen);
