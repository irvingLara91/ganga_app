const initialData = {
    fetching: false,
    room:null,
    stay_config:null,
    paymentType: null,
    card:null
}

const ADD_INFO_TO_PRE_ORDER = 'ADD_INFO_TO_PRE_ORDER';

const preOrderReducer = (state = initialData, action) => {
    if (action.type === ADD_INFO_TO_PRE_ORDER) {
        return {...state, ...action.payload}
    } else {
        return state;
    }
}

export default preOrderReducer;


export let addInfoToPreOrder = (json_info) => {
    return async (dispatch) => {
        dispatch({type: ADD_INFO_TO_PRE_ORDER, payload: json_info})
    };
}
