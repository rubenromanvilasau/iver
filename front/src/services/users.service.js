import axios from 'axios';
const apiUrl = 'http://localhost:4000/api';

export const login = ( email, password ) => {
    return axios.post( apiUrl + '/users/login', { email, password } );
};

export const register = ( data ) => {
    console.log('data', data)
    return axios.get( apiUrl + '/users/register', data );
};