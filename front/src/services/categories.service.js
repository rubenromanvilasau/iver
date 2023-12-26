import axios from "axios";


export default class CategoryService {

    constructor() {
        this.url = `http://localhost:4000/api/categories/`;
    }

    async getAll() {
        return axios.get( this.url )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
}