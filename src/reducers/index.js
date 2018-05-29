import { combineReducers } from 'redux'
import { DataReducer } from './Search/index'
export const rootReducer = combineReducers({
    data: DataReducer
});
