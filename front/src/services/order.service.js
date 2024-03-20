import axios from 'axios';

export default class OrderService {
    
    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/orders/`;
    }

    getAll() {
        return axios.get( this.apiUrl )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

    getById( id ) {
        return axios.get( this.apiUrl + id )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

    update( id, data ) {
        return axios.put( this.apiUrl + id, data )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

}

