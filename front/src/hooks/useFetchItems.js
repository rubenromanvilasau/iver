import { useEffect, useState } from "react";
import ItemService from "../services/item.service";
const itemService = new ItemService();

//TODO HANDLE FILTERS
export const useFetchItems = ({ pageNumber = 1, filter = '' }) => {
    
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState( true );
    const [error, setError] = useState( null );

    const fetchItems = ( filter ) => {
        setIsLoading( true );
        itemService.getAllItems( filter )
            .then( data => {
                console.log('data', data)
                setItems( data );
                setIsLoading( false );
            })
            .catch( err => {
                setError( err );
                setIsLoading( false );
            });
    }

    useEffect( () => {
        console.log('filter changed', filter);
        if( filter ) {
            fetchItems( filter );
        }
    }, [filter]);

    useEffect(() => {
        const pageFilter = `?page=${pageNumber}`;
        fetchItems( pageFilter );
    }, [pageNumber]);

    useEffect(() => {
        fetchItems( filter );
    }, []);

    return {
        items,
        isLoading,
        error
    };
};