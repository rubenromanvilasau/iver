import { useEffect, useState } from "react";
import ItemService from "../services/items.service";
const itemService = new ItemService();

export const useFetchItem = ( id ) => {
    
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState( true );
    const [error, setError] = useState( null );

    const fetchItem = () => {
        itemService.getItem( id )
            .then( data => {
                setItem( data[0] );
                setIsLoading( false );
            })
            .catch( err => {
                console.log('error', err );
                setError( err );
                setIsLoading( false );
            });
    }

    useEffect(() => {
        fetchItem();
    }, []);

    return {
        item,
        isLoading,
        error
    };
};