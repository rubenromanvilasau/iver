
import axios from 'axios'; const apiUrl = 'http://localhost:4000/api';

export default class ItemService {

    getAllItems = () => {
        return axios.get( apiUrl +'/items' )
            .then( response => response.data )
            .catch( err => { console.error( err ) } );
    }
    
    getItem = ( id ) => {
        return axios.get( apiUrl + `/items/${ id }` )
            .then( response => response.data )
            .catch( err => { console.error( err ) } );
    }
    
    createItem = ( item ) => {
        return axios.post( apiUrl + '/items/create', item )
           .catch( err => { console.error( err ) } );
    }
    
    getItemsStatuses = () => {
        return axios.get( apiUrl + '/items/statuses' )
            .then( response => response.data )
            .catch( err => { console.error( err ) } );
    }
    
    getItemsCategories = () => {
        return axios.get( apiUrl + '/items/categories' )
            .then( response => response.data )
            .catch( err => { console.error( err ) } );
    }
    
    createOffer = ( id, itemOffer ) => {
        return axios.post( apiUrl + `/items/offer/${ id }`, itemOffer )
           .catch( err => { console.error( err ) } );
    }

}

