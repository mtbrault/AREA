import axios from 'axios';
import { SET_ERROR_LOGIN, SET_CURRENT_USER, SET_VALIDATE_LOGIN } from './types';
import API_URL from '../../config/uri';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const setErrorLogin = (err) => {
    return {
        type: SET_ERROR_LOGIN,
        payload: err
    }
}

export const setValidateLogin = (validate) => {
    return {
        type: SET_VALIDATE_LOGIN,
        payload: validate
    }
}

export const registerUser = (user) => dispatch => {
    axios.post(`${API_URL}/user/register`, user)
        .then(res => {
            console.log("Error while login", res);
            dispatch(setValidateLogin(true))
        })
        .catch(err => {
            console.log("Error while login", err);
            dispatch(setErrorLogin("Bad register user is already existing."))
        });
}

export const loginUser = (user, history) => dispatch => {
    axios.post(`${API_URL}/user/login`, user)
        .then(res => {
            const token = res.data.token;
            const decoded = jwt_decode(token);
            localStorage.setItem('areaToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(decoded));
            if (history !== undefined)
                history.push('/services')
        })
        .catch(err => {
            console.log("Error while login" + err);
            dispatch(setErrorLogin("Bad email or password."))
        });
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('areaToken');
    dispatch(setCurrentUser({}));
    if (history !== undefined)
        history.push('/auth/login');
}
