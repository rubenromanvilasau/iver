import axios from 'axios';

export default class ShippingWayService {
    
    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/shipping-ways`;
    }

    getAll(){
        return axios.get( this.apiUrl )
            .then( response => response.data )
            .catch( err => { throw err } );
    }

}