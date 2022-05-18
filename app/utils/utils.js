import React from 'react';
import {Dimensions, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const barHeightFactor = Dimensions.get('window').height * .2 - 125;
export const statusBarHeight = barHeightFactor > 22 ? barHeightFactor : 22;
const {width, height} = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;


export const setData = async (name, data) => {
    try {
        await AsyncStorage.setItem(
            '@' + name,
            JSON.stringify(data)
        );
    } catch (e) {
        console.log(e)
    }
}

export const getData = async (name) => {
    try {
        let storage = await AsyncStorage.getItem("@" + name);
        storage = JSON.parse(storage)
        return storage
    } catch (e) {
        console.log(e)
    }
}
export const removeData = async (name) => {
    try {
        await AsyncStorage.removeItem("@" + name);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    } catch (e) {
        console.log(e)
    }
}

export const textSizeRender = (size) => {
    let resolution = size / 100
    return resolution * width
};
export const array_packages = [
    {
        id: 1,
        price: 15000,
        image: 'https://www.clarin.com/img/2019/11/06/uno-de-los-vinedos-de___a8GQ9c_x_1200x630__1.jpg',
        name: 'Mendoza',
        favorite: false,
        description: ''
    },
    {
        id: 2,
        price: 15000,
        image: 'https://www.lugaresturisticos.pro/wp-content/uploads/2019/06/image2-1024x790.png',
        name: 'Buenos Aires',
        favorite: false,
        description: ''
    },
    {
        id: 3,
        price: 15000,
        image: 'https://www.clarin.com/img/2019/11/06/uno-de-los-vinedos-de___a8GQ9c_x_1200x630__1.jpg',
        name: 'Mendoza',
        favorite: false,
        description: ''
    },
    {
        id: 4,
        price: 15000,
        image: 'https://www.lugaresturisticos.pro/wp-content/uploads/2019/06/image2-1024x790.png',
        name: 'Buenos Aires',
        favorite: false,
        description: ''
    },

];


export const array_WhatCanWeDo =[
    {
        id: 1,
        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/f6/f0/29.jpg',
        title: 'Tour en bicicleta por los lugares turisticos de la ciudad.'
    },
    {
        id: 2, image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6b/8b/af.jpg',
        title: 'Recorrido por la ciudad de Buenos Aires y paseo en barco con almuerzo'
    },
    {
        id: 3,
        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/f6/f0/29.jpg',
        title: 'Tour en bicicleta por los lugares turisticos de la ciudad.'
    },
];
export const array_MoreThanHotels = [
    {
        id: 1, image: 'https://www.clarin.com/img/2019/11/06/uno-de-los-vinedos-de___a8GQ9c_x_1200x630__1.jpg',
        name: 'Pasajes',
        icon: 'pasaje',
        description: 'Aereos y buses para ir a todos los Ganga Hoteles.'
    },
    {
        id: 2, image: 'https://ak.picdn.net/shutterstock/videos/1011317279/thumb/1.jpg',
        name: 'Experiencias',
        icon: 'exp',
        description: 'Hacé de tu viaje una expreciencia inolvidable'
    },
    {
        id: 3, image: 'https://www.clarin.com/img/2019/11/06/uno-de-los-vinedos-de___a8GQ9c_x_1200x630__1.jpg',
        name: 'Pasajes',
        icon: 'pasaje',
        description: 'Aereos y buses para ir a todos los Ganga Hoteles.'
    },
    {
        id: 4,  image: 'https://ak.picdn.net/shutterstock/videos/1011317279/thumb/1.jpg',
        name: 'Experiencias',
        icon: 'exp',
        description: 'Hacé de tu viaje una expreciencia inolvidable'
    },
];
export const dataCarousel = [
    {

        img: <Image style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            resizeMode: 'contain'
        }} source={require('./../../assets/img_app.png')}/>,
        msg: "Encontrá las mejores ofertas y disfrutá de un Concerje para vos con todo lo que necesites en tu estadía.",
    },
    {
        img: <Image style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            resizeMode: 'contain'
        }} source={require('./../../assets/img_app.png')}/>,
        msg: "Encontrá las mejores ofertas y disfrutá de un Concerje para vos con todo lo que necesites en tu estadía.",
    },
    {
        img: <Image style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            resizeMode: 'contain'
        }} source={require('./../../assets/img_app.png')}/>,
        msg: "Encontrá las mejores ofertas y disfrutá de un Concerje para vos con todo lo que necesites en tu estadía.",
    },
];


export const validEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let value = {
            error:false,
            message:""
        }
    if (val.length === 0) {
         value.message = ('Ingresá tu mail');
         value.error = true
    } else if (reg.test(val) === false) {
        value.message = ('Ingresá un mail valido');
        value.error = true
    } else if (reg.test(val) === true) {
        value.message = ('');
        value.error = false
    }

    return value;
};

export const checkPasswordValidity = (value) => {
    let dataPass= {
       caracteres:false,
       mayuscula:false,
       minuscula:false,
       numero:false,
    }


    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
        dataPass.mayuscula=false;
    }else {
        dataPass.mayuscula=true;
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
        dataPass.minuscula=false;
    }else {
        dataPass.minuscula=true;
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
        dataPass.numero= false;
    }else {
        dataPass.numero= true;
    }


    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
        dataPass.caracteres= false
    }else {
        dataPass.caracteres= true
    }

    return dataPass;
}



