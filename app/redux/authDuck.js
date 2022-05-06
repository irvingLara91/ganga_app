// constants
import {getData, removeData, setData} from "../utils/utils";

const initialData = {
    loggedIn: false,
    fetching: false,
    user: null,
    error_msg: null
};

//Types
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOG_OUT = 'LOG_OUT'

const authReducer = (state = initialData, action) => {
    switch(action.type){
        case LOGIN:
            return {...state, fetching: true, error_msg: ''};
        case LOGIN_SUCCESS:
            let newState = {...state, user: action.payload, loggedIn: true, fetching: false, error_msg: null};
            return newState;
        case LOG_OUT:
            return {...state, fetching: false, loggedIn: false, error: action.payload}
        case LOGIN_ERROR:
            return {...state, error_msg: action.payload, fetching: false};
        default:
            return state
    }
}
export default authReducer;


/***Función action para recuperar al usuario del AsyncStorage***/
export let saveSessionAction = () => async dispatch => {
    try {
        let storage = await getData('user');
        storage = JSON.parse(storage);
        if (storage) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: storage
            })
        }
    } catch (error) {
        // Error saving data
    }
};

/***Se guarda la información del usuario en el AsyncStorage***/
export let saveStore = async (storage) => {
    try {
        await setData('user',JSON.stringify(storage));
        // console.log("register", storage)
    } catch (error) {
        // Error saving data
    }
};

/***Se borra el usuario del AsyncStorage***/
export let clearUser = async () => {
    try {
        await removeData('user');
    } catch (error) {
        // Error saving data
    }
}
/***Función action para cerrar sesión***/
export let logOutAction = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: LOG_OUT, payload: {}})
            alert("sesion cerrada")
            await clearUser();
        } catch (err) {
            await clearUser();
            dispatch({type: LOGIN_ERROR, payload: err})
        }
    };
}


/*** Función para iniciar sesión ***/
export let doLoginAction = (credential) => {
    return async (dispatch, getState) => {
        dispatch({type: LOGIN});
        try {
            let data  = {
                email:credential.email,
                password: credential.password
            }
                dispatch({type: LOGIN_SUCCESS, payload: data})
                await saveStore(data)
                return {success:true,message:'Inicio de sesión exitosa',error:false}
        } catch (err) {
            dispatch({type: LOGIN_ERROR, payload: {}})
            return {success:false,message:'Error al iniciar de sesión',error:true}
        }
    };
};
