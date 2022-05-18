
const initialData = {
    fetching: true,
    error_msg: '',
    isMicro: null,
    city: null,
    dateInit: null,
    dateEnd: null,
    hours: null,
    rooms: null,
    persons:null,
};


//Types
const LOAD_SEARCH_DATA = 'LOAD_SEARCH_DATA';
const LOAD_SEARCH_COLLECTION_DATA = 'LOAD_SEARCH_COLLECTION_DATA';
const LOAD_SEARCH_DATA_SUCCESS = 'LOAD_SEARCH_DATA_SUCCESS';
const LOAD_SEARCH_DATA_ERROR = 'LOAD_SEARCH_DATA_ERROR';


const searchReducer = (state = initialData, action) => {
    switch (action.type) {
        case LOAD_SEARCH_DATA:
            return {...state, fetching: true, error_msg: ''}
        case LOAD_SEARCH_COLLECTION_DATA:
            let dataCollection = {...state, ...action.payload, fetching: false, error_msg: ''}
            return dataCollection;
        case LOAD_SEARCH_DATA_SUCCESS:
            let newState = {...state, ...action.payload, fetching: false, error_msg: ''}
            return newState
        case LOAD_SEARCH_DATA_ERROR:
            return {...state, error_msg: action.payload, fetching: false}
        default:
            return state
    }
}
export default searchReducer;



// An example of checking state after a dispatch
export const  setSearchParamsAction = (params) => {
    return  async (dispatch, getState) => {
       // let store_search  = store.getState().search
       /// console.log("SeaRchduck","------->",params)
        dispatch({type: LOAD_SEARCH_COLLECTION_DATA, payload: params})
    }
}

