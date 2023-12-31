
import axios from 'axios'; 

export default class ItemService {

    constructor() {
        this.url = `http://localhost:4000/api/items/`;
    }

    getAllItems( filter ) {
        console.log('url', this.url + ( filter ? filter : '' ))
        return axios.get( this.url + ( filter ? filter : '' ) )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }
    
    getItem( id ) {
        return axios.get( this.url + id  )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }
    
    createItem( item ) {
        return axios.post( this.url + 'create', item )
            .catch( err => { throw err.response } );
    }

    createOffer( id, itemOffer ) {
        return axios.post( this.url + `offer/${ id }`, itemOffer )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }
    
    getOffers( id ) {
        return axios.get( this.url + `${ id }/offers` )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

}

