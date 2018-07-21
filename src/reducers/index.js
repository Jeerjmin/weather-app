import { combineReducers } from 'redux'
import { DataReducer } from './Search/index'
import { routerReducer } from 'react-router-redux'

export const rootReducer = combineReducers({
    data: DataReducer,
    routing: routerReducer
});
