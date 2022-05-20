import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import appReducer from './appDuck'
import authReducer, {sessionAction} from "./authDuck";
import thunk from "redux-thunk"
import hotelsDuck from "./hotelsDuck";
import searchDuck from "./searchDuck";

const rootReducer = combineReducers({
    app:appReducer,
    auth:authReducer,
    search:searchDuck,
    hotels:hotelsDuck
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {
    // Initial load app data
    sessionAction()(store.dispatch)
    return store
}
