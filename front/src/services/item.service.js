
import axios from 'axios'; 

export default class ItemService {

    constructor() {
        this.apiUrl = `${import.meta.env.VITE_API_URL}/items/`;
    }

    getAllItems( filter ) {
        console.log('apiUrl', this.apiUrl + ( filter ? filter : '' ))
        return axios.get( this.apiUrl + ( filter ? filter : '' ) )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }
    
    getItem( id ) {
        return axios.get( this.apiUrl + id  )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }
    
    createItem( item ) {
        return axios.post( this.apiUrl + 'create', item )
            .catch( err => { throw err.response } );
    }

    createOffer( id, itemOffer ) {
        return axios.post( this.apiUrl + `offer/${ id }`, itemOffer )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }
    
    getOffers( id ) {
        return axios.get( this.apiUrl + `${ id }/offers` )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

    addPhotos( id, formData ) {
        console.log('formData', formData);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        return axios.post( this.apiUrl + id + '/photos', formData, config )
            .then( response => response.data )
            .catch( err => { throw err.response } );
    }

}

