const apiUrl = 'http://localhost:4000/api';

export const login = ( email, password ) => {
    return fetch( apiUrl + '/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
};

export const register = ( data ) => {
    console.log('data', data)
    return fetch( apiUrl + '/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
    });
};