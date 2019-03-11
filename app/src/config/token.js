export const AREA_TOKEN_STORAGE_KEY = 'areaToken';

export const setToken = (token, remember) =>
    remember
        ? window.localStorage.setItem(AREA_TOKEN_STORAGE_KEY, token)
        : window.sessionStorage.setItem(AREA_TOKEN_STORAGE_KEY, token);

export const getToken = () =>
    window.localStorage.getItem(AREA_TOKEN_STORAGE_KEY)
    || window.window.sessionStorage.getItem(AREA_TOKEN_STORAGE_KEY);