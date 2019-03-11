import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
        console.log(axios.defaults.headers.common['Authorization']);
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;