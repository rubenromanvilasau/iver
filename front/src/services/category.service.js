import axios from "axios";


export default class CategoryService {

    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/categories/`;
    }

    async getAll() {
        return axios.get( this.apiUrl )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
}