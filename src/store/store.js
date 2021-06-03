import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {passengersReducer} from "../reducers/passenger-reducer";

const rootReducer = combineReducers({
    passengers: passengersReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));