import Constants from "expo-constants";

// constants
const initialData = {
    fetching: true,
    error_msg: '',
    primaryColor:'#e94d4d',
    secondaryColor:'#f5f6f8',
    tertiaryColor:'#ffd201',
    fontColorWhite:'#ffffff',
    fontColorBlack:'#000',
    logo: '',
    baseURL:Constants.manifest.extra.BASE_URL,
    name: Constants.manifest.extra.NAME_APP,
};

//Types
const LOAD_APP_DATA = 'LOAD_APP_DATA';
const LOAD_APP_DATA_SUCCESS = 'LOAD_APP_DATA_SUCCESS';
const LOAD_APP_DATA_ERROR = 'LOAD_APP_DATA_ERROR';

// reducer

const appReducer = (state = initialData, action) => {
    switch(action.type){
        case LOAD_APP_DATA:
            return {...state, fetching: true, error_msg: ''}
        case LOAD_APP_DATA_SUCCESS:
            let newState = {...state, ...action.payload, fetching: false, error_msg: ''}
            return newState
        case LOAD_APP_DATA_ERROR:
            return {...state, error_msg: action.payload, fetching: false}
        default:
            return state
    }
}
export default appReducer;

// Actions

/*
export const getAppDataAction = () => async (dispatch, getState) => {
    dispatch({type: LOAD_APP_DATA})
    try{
        const data = await appApi.getAppData();
        const statusCode = data.data.m.code;
        if(statusCode === '203')
            dispatch({type: LOAD_APP_DATA_SUCCESS, payload: data.data})
        else
            dispatch({type: LOAD_APP_DATA_ERROR, payload: 'Error de servidor'})
    }catch(err){
        dispatch({type: LOAD_APP_DATA_ERROR, payload: err})
    }
}*/

