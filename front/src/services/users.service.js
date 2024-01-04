import axios from 'axios';
export default class UserService {

    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/users`;
    }
    
    login( email, password ) {
        return axios.post( this.apiUrl + '/login', { email, password } );
    }
    
    register( data ) {
        console.log('data', data)
        return axios.post( this.apiUrl + '/register', data );
    }
}
