import React from 'react';
import {Dimensions, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome5} from "@expo/vector-icons";
const barHeightFactor = Dimensions.get('window').height * .2 - 125;
export const statusBarHeight = barHeightFactor > 22 ? barHeightFactor : 22;
const {width, height} = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;


export const initialResponse = { success: false, error: false, message: "" }


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
        //navigation.reset({
        //    index: 0,
        //    routes: [{ name: 'Home' }],
       // })
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
        description: 'Hac?? de tu viaje una expreciencia inolvidable'
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
        description: 'Hac?? de tu viaje una expreciencia inolvidable'
    },
];
export const dataCarousel = [
    {

        img: <Image style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            resizeMode: 'contain'
        }} source={require('./../../assets/img_app.png')}/>,
        msg: "Encontr?? las mejores ofertas y disfrut?? de un Concerje para vos con todo lo que necesites en tu estad??a.",
    },
    {
        img: <Image style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            resizeMode: 'contain'
        }} source={require('./../../assets/img_app.png')}/>,
        msg: "Encontr?? las mejores ofertas y disfrut?? de un Concerje para vos con todo lo que necesites en tu estad??a.",
    },
    {
        img: <Image style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            resizeMode: 'contain'
        }} source={require('./../../assets/img_app.png')}/>,
        msg: "Encontr?? las mejores ofertas y disfrut?? de un Concerje para vos con todo lo que necesites en tu estad??a.",
    },
];


export const validEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let value = {
            error:false,
            message:""
        }
    if (val ==="" || val.trim() ===""|| val.length === 0) {
         value.message = ('Ingres?? tu mail');
         value.error = true
    } else if (reg.test(val) === false) {
        value.message = ('Ingres?? un mail valido');
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


export const errorMessage = (codeError) => {
    let error = codeError

    for(let i in errorsMessages) {
        if (codeError ===i){
            error = errorsMessages[i]
            break
        }
    }

    return error
};

const errorsMessages={
    "auth/wrong-password": "La contrase??a no es v??lida o el usuario no tiene contrase??a.",
    "auth/claims-too-large": "La carga de reclamos proporcionada a setCustomUserClaims() excede el tama??o m??ximo permitido de 1000 bytes",
    "auth/email-already-exists": "El correo electr??nico proporcionado ya est?? en uso por un usuario existente. Cada usuario debe tener un correo electr??nico ??nico.",
    "auth/id-token-expired": "El token de ID de Firebase proporcionado est?? vencido",
    "auth/id-token-revoked": "El token de ID de Firebase ha sido revocado",
    "auth/insufficient-permission": "La credencial utilizada para inicializar el SDK de administrador no tiene permiso suficiente para acceder al recurso de autenticaci??n solicitado. Consulte Configurar un proyecto de Firebase para obtener documentaci??n sobre c??mo generar una credencial con los permisos apropiados y usarla para autenticar los SDK de administrador.",
    "auth/invalid-argument": "Se proporcion?? un argumento no v??lido para un m??todo de autenticaci??n. El mensaje de error debe contener informaci??n adicional",
    "auth/invalid-claims": "Los atributos de notificaci??n personalizados proporcionados a setCustomUserClaims() no son v??lidos",
    "auth/invalid-creation-time": "La hora de creaci??n debe ser una cadena de fecha UTC v??lida.",
    "auth/invalid-disabled-field": "El valor proporcionado para la propiedad de usuario deshabilitado no es v??lido. Debe ser un valor booleano.",
    "auth/invalid-display-name": "El valor proporcionado para la propiedad de usuario displayName no es v??lido. Debe ser una cadena no vac??a.",
    "auth/invalid-email-verified": "El valor proporcionado para la propiedad de usuario emailVerified no es v??lido. Debe ser un valor booleano.",
    "auth/invalid-hash-algorithm": "El algoritmo hash debe coincidir con una de las cadenas en la lista de algoritmos admitidos.",
    "auth/invalid-hash-block-size": "El tama??o del bloque hash debe ser un n??mero v??lido.",
    "auth/invalid-hash-derived-key-length": "La longitud de la clave derivada del hash debe ser un n??mero v??lido.",
    "auth/invalid-hash-key": "La clave hash debe ser un b??fer de bytes v??lido.",
    "auth/invalid-hash-memory-cost": "El costo de la memoria hash debe ser un n??mero v??lido",
    "auth/invalid-hash-parallelization": "La paralelizaci??n hash debe ser un n??mero v??lido.",
    "auth/invalid-hash-rounds": "Las rondas hash deben ser un n??mero v??lido",
    "auth/invalid-hash-salt-separator": "El campo separador de sal del algoritmo hash debe ser un b??fer de bytes v??lido.",
    "auth/invalid-id-token": "El token de ID proporcionado no es un token de ID de Firebase v??lido.",
    "auth/invalid-last-sign-in-time": "La ??ltima hora de inicio de sesi??n debe ser una cadena de fecha UTC v??lida.",
    "auth/invalid-page-token": "El token de p??gina siguiente provisto en listUsers() no es v??lido. Debe ser una cadena v??lida no vac??a",
    "auth/invalid-password": "El valor proporcionado para la propiedad de usuario de la contrase??a no es v??lido. Debe ser una cadena con al menos seis caracteres.",
    "auth/invalid-password-hash": "El hash de la contrase??a debe ser un b??fer de bytes v??lido.",
    "auth/invalid-password-salt": "La contrase??a salt debe ser un b??fer de bytes v??lido",
    "auth/invalid-photo-url": "El valor proporcionado para la propiedad de usuario photoURL no es v??lido. Debe ser una URL de cadena.",
    "auth/invalid-provider-data": "ProviderData debe ser una matriz v??lida de objetos UserInfo",
    "auth/invalid-oauth-responsetype": "Solo exactamente un tipo de respuesta de OAuth debe establecerse como verdadero",
    "auth/invalid-session-cookie-duration": "La duraci??n de la cookie de sesi??n debe ser un n??mero v??lido en milisegundos entre 5 minutos y 2 semanas.",
    "auth/invalid-uid": "El uid proporcionado debe ser una cadena no vac??a con un m??ximo de 128 caracteres",
    "auth/invalid-user-import": "El registro de usuario para importar no es v??lido.",
    "auth/maximum-user-count-exceeded": "Se excedi?? el n??mero m??ximo permitido de usuarios para importar.",
    "auth/missing-hash-algorithm": "Importar usuarios con hash de contrase??a requiere que se proporcione el algoritmo hash y sus par??metros.",
    "auth/missing-uid": "Se requiere un identificador de uid para la operaci??n actual.",
    "auth/missing-oauth-client-secret": "Se requiere el secreto del cliente de configuraci??n de OAuth para habilitar el flujo de c??digo OIDC.",
    "auth/phone-number-already-exists": "El n??mero de tel??fono proporcionado ya est?? en uso por un usuario existente. Cada usuario debe tener un n??mero de tel??fono ??nico.",
    "auth/project-not-found": "No se encontr?? ning??n proyecto de Firebase para la credencial utilizada para inicializar los SDK de administrador. Consulte Configurar un proyecto de Firebase para obtener documentaci??n sobre c??mo generar una credencial para su proyecto y usarla para autenticar el SDK de administrador.",
    "auth/reserved-claims": "Uno o m??s reclamos de usuario personalizados proporcionados a setCustomUserClaims() est??n reservados. Por ejemplo, los reclamos espec??ficos de OIDC como (sub, iat, iss, exp, aud, auth_time, etc.) no deben usarse como claves para reclamos personalizados.",
    "auth/session-cookie-expired": "La cookie de sesi??n de Firebase proporcionada ha caducado.",
    "auth/session-cookie-revoked": "La cookie de sesi??n de Firebase ha sido revocada.",
    "auth/uid-already-exists": "El uid proporcionado ya est?? en uso por un usuario existente. Cada usuario debe tener un uid ??nico",
    "auth/admin-restricted-operation": "Esta operaci??n est?? restringida solo a los administradores.",
    "auth/app-not-authorized": "Esta aplicaci??n, identificada por el dominio donde est?? alojada, no est?? autorizada para usar Firebase Authentication con la clave de API provista. Revisa la configuraci??n de tu clave en la consola de API de Google.",
    "auth/app-not-installed": "La aplicaci??n m??vil solicitada correspondiente al identificador (nombre del paquete de Android o ID del paquete de iOS) proporcionado no est?? instalada en este dispositivo",
    "auth/captcha-check-failed": "El token de respuesta reCAPTCHA proporcionado no es v??lido, venci??, ya se us?? o el dominio asociado no coincide con la lista de dominios incluidos en la lista blanca",
    "auth/code-expired": "El c??digo SMS ha caducado. Vuelve a enviar el c??digo de verificaci??n para intentarlo de nuevo",
    "auth/cordova-not-ready": "El marco de trabajo de Cordova no est?? listo",
    "auth/cors-unsupported": "Este navegador no es compatible.",
    "auth/credential-already-in-use": "Esta credencial ya est?? asociada con una cuenta de usuario diferente",
    "auth/custom-token-mismatch": "El token personalizado corresponde a una audiencia diferente",
    "auth/requires-recent-login": "Esta operaci??n es confidencial y requiere autenticaci??n reciente. Vuelva a iniciar sesi??n antes de volver a intentar esta solicitud.",
    "auth/dependent-sdk-initialized-before-auth": "Se inicializ?? otro SDK de Firebase y est?? tratando de usar Auth antes de que se inicialice Auth. Aseg??rese de llamar a `initializeAuth` o `getAuth` antes de iniciar cualquier otro SDK de Firebase. ",
    "auth/dynamic-link-not-activated": "Active Dynamic Links en Firebase Console y acepte los t??rminos y condiciones.",
    "auth/email-change-needs-verification": "Los usuarios multifactor siempre deben tener un correo electr??nico verificado.",
    "auth/email-already-in-use": "Otra cuenta ya est?? utilizando la direcci??n de correo electr??nico",
    "auth/emulator-config-failed": "La instancia de autenticaci??n ya se us?? para realizar una llamada de red. Auth ya no se puede configurar para usar el emulador. Intenta llamar a 'connectAuthEmulator()' antes",
    "auth/expired-action-code": "El c??digo de acci??n ha caducado.",
    "auth/cancelled-popup-request": "Esta operaci??n se cancel?? debido a que se abri?? otra ventana emergente conflictiva",
    "auth/internal-error": "Ha ocurrido un AuthError interno.",
    "auth/invalid-app-credential": "La solicitud de verificaci??n del tel??fono contiene un verificador de aplicaci??n no v??lido. La respuesta del token reCAPTCHA no es v??lida o venci??",
    "auth/invalid-app-id": "El identificador de la aplicaci??n m??vil no est?? registrado para el proyecto actual",
    "auth/invalid-user-token": "La credencial de este usuario no es v??lida para este proyecto. Esto puede suceder si el token del usuario ha sido manipulado o si el usuario no es para el proyecto asociado con esta clave API. ",
    "auth/invalid-auth-event": "Ha ocurrido un AuthError interno.",
    "auth/invalid-verification-code": "El c??digo de verificaci??n de SMS utilizado para crear la credencial de autenticaci??n del tel??fono no es v??lido. Vuelva a enviar el c??digo de verificaci??n por SMS y aseg??rese de usar el c??digo de verificaci??n proporcionado por el usuario.",
    "auth/invalid-continue-uri": "La URL de continuaci??n provista en la solicitud no es v??lida.",
    "auth/invalid-cordova-configuration": "Se deben instalar los siguientes complementos de Cordova para habilitar el inicio de sesi??n de OAuth: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser y cordova-plugin-customurlscheme.",
    "auth/invalid-custom-token": "El formato del token personalizado es incorrecto. Consulte la documentaci??n",
    "auth/invalid-dynamic-link-domain": "El dominio de enlace din??mico proporcionado no est?? configurado ni autorizado para el proyecto actual.",
    "auth/invalid-email": "La direcci??n de correo electr??nico tiene un formato incorrecto.",
    "auth/invalid-emulator-scheme": "La URL del emulador debe comenzar con un esquema v??lido (http:// o https://).",
    "auth/invalid-api-key": "Su clave API no es v??lida, verifique que la haya copiado correctamente",
    "auth/invalid-cert-hash": "El hash del certificado SHA-1 proporcionado no es v??lido.",
    "auth/invalid-credential": "La credencial de autenticaci??n proporcionada tiene un formato incorrecto o ha caducado.",
    "auth/invalid-message-payload": "La plantilla de correo electr??nico correspondiente a esta acci??n contiene caracteres no v??lidos en su mensaje. Corr??jalo yendo a la secci??n Plantillas de correo electr??nico de autenticaci??n en Firebase Console",
    "auth/invalid-multi-factor-session": "La solicitud no contiene una prueba v??lida del inicio de sesi??n exitoso del primer factor",
    "auth/invalid-oauth-provider": "EmailAuthProvider no es compatible con esta operaci??n. Esta operaci??n solo admite proveedores de OAuth.",
    "auth/invalid-oauth-client-id": "El ID de cliente de OAuth proporcionado no es v??lido o no coincide con la clave API especificada.",
    "auth/unauthorized-domain": "Este dominio no est?? autorizado para operaciones de OAuth para su proyecto de Firebase. Edite la lista de dominios autorizados desde la consola de Firebase.",
    "auth/invalid-action-code": "El c??digo de acci??n no es v??lido. Esto puede suceder si el c??digo tiene un formato incorrecto, venci?? o ya se us??",
    "auth/invalid-persistence-type": "El tipo de persistencia especificado no es v??lido. Solo puede ser local, de sesi??n o ninguno",
    "auth/invalid-phone-number": "El formato del n??mero de tel??fono proporcionado es incorrecto. Ingrese el n??mero de tel??fono en un formato que pueda analizarse en formato E.164. Los n??meros de tel??fono E.164 est??n escritos en el formato [ +][c??digo de pa??s][n??mero de abonado, incluido el c??digo de ??rea]",
    "auth/invalid-provider-id": "El ID de proveedor especificado no es v??lido.",
    "auth/invalid-recipient-email": "El correo electr??nico correspondiente a esta acci??n no se pudo enviar porque la direcci??n de correo electr??nico del destinatario proporcionada no es v??lida",
    "auth/invalid-sender": "La plantilla de correo electr??nico correspondiente a esta acci??n contiene un correo electr??nico o un nombre de remitente no v??lido. Corr??jalo yendo a la secci??n Plantillas de correo electr??nico de autenticaci??n en Firebase Console.",
    "auth/invalid-verification-id": "La identificaci??n de verificaci??n utilizada para crear la credencial de autenticaci??n del tel??fono no es v??lida",
    "auth/invalid-tenant-id": "El ID de inquilino de la instancia de autenticaci??n no es v??lido",
    "auth/missing-android-pkg-name": "Se debe proporcionar un nombre de paquete de Android si se requiere instalar la aplicaci??n de Android",
    "auth/auth-domain-config-required": "Aseg??rese de incluir authDomain cuando llame a firebase.initializeApp(), siguiendo las instrucciones en Firebase console.",
    "auth/missing-app-credential": "A la solicitud de verificaci??n del tel??fono le falta una afirmaci??n del verificador de la aplicaci??n. Se debe proporcionar un token de respuesta reCAPTCHA.",
    "auth/missing-verification-code": "La credencial de autenticaci??n del tel??fono se cre?? con un c??digo de verificaci??n de SMS vac??o",
    "auth/missing-continue-uri": "Se debe proporcionar una URL de continuaci??n en la solicitud.",
    "auth/missing-iframe-start": "Ha ocurrido un AuthError interno.",
    "auth/missing-ios-bundle-id": "Se debe proporcionar una ID de paquete de iOS si se proporciona una ID de App Store",
    "auth/missing-or-invalid-nonce": "La solicitud no contiene un nonce v??lido. Esto puede ocurrir si el hash SHA-256 del nonce sin procesar proporcionado no coincide con el nonce hash en la carga del token de ID",
    "auth/missing-multi-factor-info": "No se proporciona ning??n identificador de segundo factor.",
    "auth/missing-multi-factor-session": "A la solicitud le falta la prueba del inicio de sesi??n exitoso del primer factor.",
    "auth/missing-phone-number": "Para enviar c??digos de verificaci??n, proporcione un n??mero de tel??fono para el destinatario.",
    "auth/missing-verification-id": "La credencial de autenticaci??n del tel??fono se cre?? con un ID de verificaci??n vac??o",
    "auth/app-deleted": "Esta instancia de FirebaseApp ha sido eliminada.",
    "auth/multi-factor-info-not-found": "El usuario no tiene un segundo factor que coincida con el identificador proporcionado",
    "auth/multi-factor-auth-required": "Se requiere prueba de propiedad de un segundo factor para completar el inicio de sesi??n.",
    "auth/account-exists-with- different-credential": "Ya existe una cuenta con la misma direcci??n de correo electr??nico pero con diferentes credenciales de inicio de sesi??n. Inicie sesi??n con un proveedor asociado con esta direcci??n de correo electr??nico",
    "auth/network-request-failed": "Ha ocurrido un AuthError de red (como tiempo de espera, conexi??n interrumpida o host inalcanzable)",
    "auth/no-auth-event": "Ha ocurrido un AuthError interno.",
    "auth/no-such-provider": "El usuario no estaba vinculado a una cuenta con el proveedor indicado.",
    "auth/null-user": "Se proporcion?? un objeto de usuario nulo como argumento para una operaci??n que requiere un objeto de usuario no nulo.",
    "auth/operation-not-allowed": "El proveedor de inicio de sesi??n dado est?? deshabilitado para este proyecto de Firebase. Habil??telo en la consola de Firebase, en la pesta??a de m??todo de inicio de sesi??n de la secci??n Auth.",
    "auth/operation-not-supported-in-this-environment": "Esta operaci??n no es compatible con el entorno en el que se ejecuta esta aplicaci??n. 'ubicaci??n.protocolo' debe ser http, https o chrome-extension y el almacenamiento web debe ser activado.",
    "auth/popup-blocked": "No se pudo establecer una conexi??n con la ventana emergente. Es posible que el navegador la haya bloqueado",
    "auth/popup-closed-by-user": "El usuario cerr?? la ventana emergente antes de finalizar la operaci??n.",
    "auth/provider-already-linked": "El usuario solo puede estar vinculado a una identidad para el proveedor dado.",
    "auth/quota-exceeded": "Se excedi?? la cuota del proyecto para esta operaci??n.",
    "auth/redirect-cancelled-by-user": "La operaci??n de redirecci??n ha sido cancelada por el usuario antes de finalizar.",
    "auth/redirect-operation-pending": "Ya est?? pendiente una operaci??n de inicio de sesi??n de redirecci??n.",
    "auth/rejected-credential": "La solicitud contiene credenciales mal formadas o que no coinciden.",
    "auth/second-factor-already-in-use": "El segundo factor ya est?? inscrito en esta cuenta.",
    "auth/maximum-second-factor-count-exceeded": "Se ha excedido el n??mero m??ximo permitido de segundos factores en un usuario.",
    "auth/tenant-id-mismatch": "El ID de arrendatario proporcionado no coincide con el ID de arrendatario de la instancia de autenticaci??n",
    "auth/timeout": "Se agot?? el tiempo de espera de la operaci??n.",
    "auth/user-token-expired": "La credencial del usuario ya no es v??lida. El usuario debe iniciar sesi??n nuevamente",
    "auth/too-many-requests": "Hemos bloqueado todas las solicitudes de este dispositivo debido a actividad inusual. Vuelve a intentarlo m??s tarde",
    "auth/unauthorized-continue-uri": "El dominio de la URL de continuaci??n no est?? en la lista blanca. Incluya el dominio en la lista blanca de Firebase console.",
    "auth/unsupported-first-factor": "Inscribir un segundo factor o iniciar sesi??n con una cuenta multifactor requiere iniciar sesi??n con un primer factor admitido",
    "auth/unsupported-persistence-type": "El entorno actual no admite el tipo de persistencia especificado.",
    "auth/unsupported-tenant-operation": "Esta operaci??n no se admite en un contexto de m??ltiples inquilinos",
    "auth/unverified-email": "La operaci??n requiere un correo electr??nico verificado.",
    "auth/user-cancelled": "El usuario no otorg?? a tu aplicaci??n los permisos que solicit??.",
    "auth/user-not-found": "No hay registro de usuario correspondiente a este identificador. Es posible que el usuario haya sido eliminado.",
    "auth/user-disabled": "La cuenta de usuario ha sido deshabilitada por un administrador.",
    "auth/user-mismatch": "Las credenciales proporcionadas no corresponden al usuario que inici?? sesi??n anteriormente.",
    "auth/weak-password": "La contrase??a debe tener 6 caracteres o m??s.",
    "auth/web-storage-unsupported": "Este navegador no es compatible o las cookies y los datos de terceros pueden estar deshabilitados",
    "auth/already-initialized" : "initializeAuth() ya ha sido llamado con diferentes opciones. Para evitar este error, llame a initializeAuth() con las mismas opciones que cuando era original."
}

const errors = {
        "auth/wrong-password": "The password is invalid or the user does not have a password.",
        "auth/claims-too-large": "The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.",
        "auth/email-already-exists": "The provided email is already in use by an existing user. Each user must have a unique email.",
        "auth/id-token-expired": "The provided Firebase ID token is expired.",
        "auth/id-token-revoked": "The Firebase ID token has been revoked.",
        "auth/insufficient-permission": "The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.",
        "auth/invalid-argument": "An invalid argument was provided to an Authentication method. The error message should contain additional information.",
        "auth/invalid-claims": "The custom claim attributes provided to setCustomUserClaims() are invalid.",
        "auth/invalid-creation-time": "The creation time must be a valid UTC date string.",
        "auth/invalid-disabled-field": "The provided value for the disabled user property is invalid. It must be a boolean.",
        "auth/invalid-display-name": "The provided value for the displayName user property is invalid. It must be a non-empty string.",
        "auth/invalid-email-verified": "The provided value for the emailVerified user property is invalid. It must be a boolean.",
        "auth/invalid-hash-algorithm": "The hash algorithm must match one of the strings in the list of supported algorithms.",
        "auth/invalid-hash-block-size": "The hash block size must be a valid number.",
        "auth/invalid-hash-derived-key-length": "The hash derived key length must be a valid number.",
        "auth/invalid-hash-key": "The hash key must a valid byte buffer.",
        "auth/invalid-hash-memory-cost": "The hash memory cost must be a valid number.",
        "auth/invalid-hash-parallelization": "The hash parallelization must be a valid number.",
        "auth/invalid-hash-rounds": "The hash rounds must be a valid number.",
        "auth/invalid-hash-salt-separator": "The hashing algorithm salt separator field must be a valid byte buffer.",
        "auth/invalid-id-token": "The provided ID token is not a valid Firebase ID token.",
        "auth/invalid-last-sign-in-time": "The last sign-in time must be a valid UTC date string.",
        "auth/invalid-page-token": "The provided next page token in listUsers() is invalid. It must be a valid non-empty string.",
        "auth/invalid-password": "The provided value for the password user property is invalid. It must be a string with at least six characters.",
        "auth/invalid-password-hash": "The password hash must be a valid byte buffer.",
        "auth/invalid-password-salt": "The password salt must be a valid byte buffer",
        "auth/invalid-photo-url": "The provided value for the photoURL user property is invalid. It must be a string URL.",
        "auth/invalid-provider-data": "The providerData must be a valid array of UserInfo objects.",
        "auth/invalid-oauth-responsetype": "Only exactly one OAuth responseType should be set to true.",
        "auth/invalid-session-cookie-duration": "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.",
        "auth/invalid-uid": "The provided uid must be a non-empty string with at most 128 characters.",
        "auth/invalid-user-import": "The user record to import is invalid.",
        "auth/maximum-user-count-exceeded": "The maximum allowed number of users to import has been exceeded.",
        "auth/missing-hash-algorithm": "Importing users with password hashes requires that the hashing algorithm and its parameters be provided.",
        "auth/missing-uid": "A uid identifier is required for the current operation.",
        "auth/missing-oauth-client-secret": "The OAuth configuration client secret is required to enable OIDC code flow.",
        "auth/phone-number-already-exists": "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.",
        "auth/project-not-found": "No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.",
        "auth/reserved-claims": "One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.",
        "auth/session-cookie-expired": "The provided Firebase session cookie is expired.",
        "auth/session-cookie-revoked": "The Firebase session cookie has been revoked.",

        "auth/uid-already-exists": "The provided uid is already in use by an existing user. Each user must have a unique uid.",
        "auth/admin-restricted-operation": "This operation is restricted to administrators only.",
        "auth/app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
        "auth/app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
        "auth/captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
        "auth/code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
        "auth/cordova-not-ready": "Cordova framework is not ready.",
        "auth/cors-unsupported": "This browser is not supported.",
        "auth/credential-already-in-use": "This credential is already associated with a different user account.",
        "auth/custom-token-mismatch": "The custom token corresponds to a different audience.",
        "auth/requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
        "auth/dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
        "auth/dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
        "auth/email-change-needs-verification": "Multi-factor users must always have a verified email.",
        "auth/email-already-in-use": "The email address is already in use by another account.",
        "auth/emulator-config-failed": "Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling 'connectAuthEmulator()' sooner.",
        "auth/expired-action-code": "The action code has expired.",
        "auth/cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
        "auth/internal-error": "An internal AuthError has occurred.",
        "auth/invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
        "auth/invalid-app-id": "The mobile app identifier is not registed for the current project.",
        "auth/invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
        "auth/invalid-auth-event": "An internal AuthError has occurred.",
        "auth/invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
        "auth/invalid-continue-uri": "The continue URL provided in the request is invalid.",
        "auth/invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
        "auth/invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
        "auth/invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
        "auth/invalid-email": "The email address is badly formatted.",

        "auth/invalid-emulator-scheme": "Emulator URL must start with a valid scheme (http:// or https://).",
        "auth/invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
        "auth/invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
        "auth/invalid-credential": "The supplied auth credential is malformed or has expired.",
        "auth/invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
        "auth/invalid-multi-factor-session": "The request does not contain a valid proof of first factor successful sign-in.",
        "auth/invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
        "auth/invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
        "auth/unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
        "auth/invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
        "auth/invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
        "auth/invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
        "auth/invalid-provider-id": "The specified provider ID is invalid.",
        "auth/invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
        "auth/invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
        "auth/invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
        "auth/invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
        "auth/missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
        "auth/auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
        "auth/missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
        "auth/missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
        "auth/missing-continue-uri": "A continue URL must be provided in the request.",

        "auth/missing-iframe-start": "An internal AuthError has occurred.",
        "auth/missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
        "auth/missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
        "auth/missing-multi-factor-info": "No second factor identifier is provided.",
        "auth/missing-multi-factor-session": "The request is missing proof of first factor successful sign-in.",
        "auth/missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
        "auth/missing-verification-id": "The phone auth credential was created with an empty verification ID.",
        "auth/app-deleted": "This instance of FirebaseApp has been deleted.",
        "auth/multi-factor-info-not-found": "The user does not have a second factor matching the identifier provided.",
        "auth/multi-factor-auth-required": "Proof of ownership of a second factor is required to complete sign-in.",
        "auth/account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
        "auth/network-request-failed": "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
        "auth/no-auth-event": "An internal AuthError has occurred.",
        "auth/no-such-provider": "User was not linked to an account with the given provider.",
        "auth/null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
        "auth/operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
        "auth/operation-not-supported-in-this-environment": "This operation is not supported in the environment this application is running on. 'location.protocol' must be http, https or chrome-extension and web storage must be enabled.",
        "auth/popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
        "auth/popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
        "auth/provider-already-linked": "User can only be linked to one identity for the given provider.",
        "auth/quota-exceeded": "The project's quota for this operation has been exceeded.",
        "auth/redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
        "auth/redirect-operation-pending": "A redirect sign-in operation is already pending.",
        "auth/rejected-credential": "The request contains malformed or mismatching credentials.",
        "auth/second-factor-already-in-use": "The second factor is already enrolled on this account.",
        "auth/maximum-second-factor-count-exceeded": "The maximum allowed number of second factors on a user has been exceeded.",
        "auth/tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
        "auth/timeout": "The operation has timed out.",
        "auth/user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
        "auth/too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
        "auth/unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
        "auth/unsupported-first-factor": "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
        "auth/unsupported-persistence-type": "The current environment does not support the specified persistence type.",
        "auth/unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
        "auth/unverified-email": "The operation requires a verified email.",
        "auth/user-cancelled": "The user did not grant your application the permissions it requested.",
        "auth/user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
        "auth/user-disabled": "The user account has been disabled by an administrator.",
        "auth/user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
        "auth/weak-password": "The password must be 6 characters long or more.",
        "auth/web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled.",
        "auth/already-initialized": "initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance."
    }


export const services = [
    {id: 1, name: "Early Check in", type:"check", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 2, name: " Desayuno completo", type:"select", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 3, name: "Lavanderia", type:"select", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 4, name: "Coffee point",type:"select", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 5, name: "Set de ba??o completo", type:"select", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},
    {id: 6, name: "Snack box", type:"select", icon: <FontAwesome5 name="concierge-bell" size={24} color="#e94d4d"/>},

];
