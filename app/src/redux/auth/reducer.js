import { SET_CURRENT_USER, SET_ERROR_LOGIN, SET_VALIDATE_LOGIN } from './types';
import isEmpty from '../isEmpty';


const initialState = {
    user: {},
    isLogged: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isLogged: !isEmpty(action.payload)
            }
        case SET_ERROR_LOGIN:
            return {
                ...state,
                user: {},
                isLogged: false,
                error: action.payload
            }
        case SET_VALIDATE_LOGIN:
            return {
                ...state,
                user: {},
                isLogged: false,
                error: action.payload,
                validate: true
            }
        default:
            return state;
    }
}