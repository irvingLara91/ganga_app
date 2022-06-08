// constants
import {getData, removeData, setData} from "../utils/utils";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../dataBase/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import {login} from "../services/auth";

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
export let sessionAction = () => async dispatch => {
    dispatch({type: LOGIN});
    try {
        onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userRef = doc(db, "users", user.email);
                    onSnapshot(userRef, async (doc) => {
                        if (doc.exists()) {
                            setTimeout(() => {
                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: doc.data()
                                })
                                console.log("UserActive --> Redux Auth",doc.data());
                            }, 100);

                        }
                    });
                } else {
                    console.log("User not Active --> Redux Auth");
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({type: LOGIN_ERROR, payload: {}})
    }
};

export let setProfile =(data)=> async dispatch => {
        dispatch({type: LOGIN});
    try {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    }
    catch (e) {

    }

}

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


