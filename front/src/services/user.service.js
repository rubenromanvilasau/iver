import axios from 'axios';
export default class UserService {

    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/users`;
    }
    
    login( email, password ) {
        return axios.post( this.apiUrl + '/login', { email, password } );
    }

    getItems( id ) {
        return axios.get( this.apiUrl + `/${id}/items`);
    }
    
    register( data ) {
        return axios.post( this.apiUrl + '/register', data );
    }

    update( id, data ) {
        return axios.put( this.apiUrl + `/update/${id}`, data );
    }

    updateUserPreferences( id, data ) {
        return axios.put( this.apiUrl + `/update/preferences/${id}`, data );
    }

    getAddresses( id ) {
        return axios.get( this.apiUrl + `/${id}/addresses`);
    }

    addAddress( data ) {
        return axios.post( this.apiUrl + `/addresses`, data);
    }

    deleteAddress( id, userId ) {
        return axios.delete( this.apiUrl + `/${userId}/addresses/${id}` );
    }

    updateAddress( id, data ) {
        return axios.put( this.apiUrl + `/address/${id}`, data );
    }
}
