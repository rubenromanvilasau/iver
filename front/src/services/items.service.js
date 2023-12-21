
import axios from 'axios'; const apiUrl = 'http://localhost:4000/api';

export default class ItemService {

    getAllItems = () => {
        return axios.get( apiUrl +'/items' )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
    
    getItem = ( id ) => {
        return axios.get( apiUrl + `/items/${ id }` )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
    
    createItem = ( item ) => {
        return axios.post( apiUrl + '/items/create', item )
            .catch( err => { throw err } );
    }
    
    getItemsStatuses = () => {
        return axios.get( apiUrl + '/items/statuses' )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
    
    getItemsCategories = () => {
        return axios.get( apiUrl + '/items/categories' )
            .then( response => response.data )
            .catch( err => { throw err } );
    }
    
    createOffer = ( id, itemOffer ) => {
        return axios.post( apiUrl + `/items/offer/${ id }`, itemOffer )
            .catch( err => { throw err } );
    }

}

