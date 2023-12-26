import axios from 'axios';

export default class ShippingWayService {
    
    constructor() {
        this.url = 'http://localhost:4000/api/shipping-ways';
    }

    getAll(){
        return axios.get( this.url )
            .then( response => response.data )
            .catch( err => { throw err } );
    }

}