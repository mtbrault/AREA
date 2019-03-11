import { combineReducers } from 'redux';
import authReducer from './auth/reducer.js';

export default combineReducers({
    auth: authReducer
});