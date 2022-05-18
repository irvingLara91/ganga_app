import ApiApp from "../api/ApiApp";
// constants
const initialData = {
    fetching: true,
    error_msg: ''
};

//Types
const LOAD_HOTELS_DATA = 'LOAD_HOTELS_DATA';
const LOAD_HOTELS_DATA_SUCCESS = 'LOAD_HOTELS_DATA_SUCCESS';
const LOAD_HOTELS_DATA_ERROR = 'LOAD_HOTELS_DATA_ERROR';

const hotelsReducer = (state = initialData, action) => {
    switch (action.type) {
        case LOAD_HOTELS_DATA:
            return {...state, fetching: true, error_msg: ''}
        case LOAD_HOTELS_DATA_SUCCESS:
            let newState = {...state, ...action.payload, fetching: false, error_msg: ''}
            return newState
        case LOAD_HOTELS_DATA_ERROR:
            return {...state, error_msg: action.payload, fetching: false}
        default:
            return state
    }
}
export default hotelsReducer;


export const searchHotelsAction = () =>  async (dispatch, getState) => {
    dispatch({type: LOAD_HOTELS_DATA})
    try {
        const response = await ApiApp.getHotelsFilter();
        if (response && response.data && response.data.length > 0) {
            response.data.is_favorite = false
            dispatch({type: LOAD_HOTELS_DATA_SUCCESS, payload: {hotels: response.data}})
        } else {
            dispatch({type: LOAD_HOTELS_DATA_SUCCESS, payload: {hotels: []}})
        }
    } catch (err) {
        dispatch({type: LOAD_HOTELS_DATA_ERROR, payload: err})
    }
}
