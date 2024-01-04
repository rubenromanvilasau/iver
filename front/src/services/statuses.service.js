import axios from 'axios';

export default class StatusService {

    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/statuses/`;
    }

    getAll = () => {
        return axios.get( this.apiUrl )
            .then( response => response.data )
            .catch( err => { throw err } );
    }

}