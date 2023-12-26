import axios from 'axios';

const apiUrl = 'http://localhost:4000/api';

export default class StatusService {

    getAll = () => {
        return axios.get( apiUrl + '/statuses' )
            .then( response => response.data )
            .catch( err => { throw err } );
    }

}