import axios from 'axios';
export default class UserService {

    constructor() {
        this.url = `http://localhost:4000/api/users`;
    }
    
    login( email, password ) {
        return axios.post( this.url + '/login', { email, password } );
    }
    
    register( data ) {
        console.log('data', data)
        return axios.post( this.url + '/register', data );
    }
}
