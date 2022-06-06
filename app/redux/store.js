import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import appReducer from './appDuck'
import authReducer, {sessionAction} from "./authDuck";
import thunk from "redux-thunk"
import preOrderReducer from "./preOrderDuck";
import hotelsReducer from "./hotelsDuck";
import searchReducer from "./searchDuck";

const rootReducer = combineReducers({
    app:appReducer,
    auth:authReducer,
    search:searchReducer,
    hotels:hotelsReducer,
    preOrder:preOrderReducer
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
