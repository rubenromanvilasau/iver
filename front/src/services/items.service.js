
import axios from 'axios'; 

export default class ItemService {

    constructor() {
        this.url = `http://localhost:4000/api/items/`;
    }

    getAllItems = ( filter ) => {
        console.log('url', this.url + ( filter ? filter : '' ))
        return axios.get( this.url + ( filter ? filter : '' ) )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
    
    getItem = ( id ) => {
        return axios.get( this.url + id  )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
    
    createItem = ( item ) => {
        return axios.post( this.url + 'create', item )
            .catch( err => { throw err } );
    }

    createOffer = ( id, itemOffer ) => {
        return axios.post( this.url + `offer/${ id }`, itemOffer )
            .catch( err => { throw err } );
    }

}

