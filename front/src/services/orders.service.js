import axios from 'axios';

export default class OrderService {
    
    constructor() {
        this.url = 'http://localhost:4000/api/orders/';
    }

    getAll() {
        return axios.get( this.url )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

    getById( id ) {
        return axios.get( this.url + id )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

}

