
const apiUrl = 'http://localhost:4000/api';

export const getAllItems = () => {
    return fetch( apiUrl +'/items' )
        .then( response => response.json() )
        .then( data => data );
}

export const getItem = ( id ) => {
    return fetch( apiUrl + `/items/${ id }` )
        .then( response => response.json() )
        .then( data => data[0] );
}

export const createItem = ( item ) => {
    return fetch( apiUrl + '/items/create', {
        method: 'POST',
        body: JSON.stringify( item ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then( response => response.json() )
        .then( data => data );
}

export const getItemsStatuses = () => {
    return fetch( apiUrl + '/items/statuses' )
        .then( response => response.json() )
        .then( data => data );
}

export const getItemsCategories = () => {
    return fetch( apiUrl + '/items/categories' )
        .then( response => response.json() )
        .then( data => data);
}

export const createItemOffer = ( id, itemOffer ) => {
    return fetch( apiUrl + `/items/offer/${ id }`, {
        method: 'POST',
        body: JSON.stringify( itemOffer ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then( response => response.json() )
        .then( data => data[0] );
}