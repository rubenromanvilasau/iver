import { useEffect, useState } from "react";
import ItemService from "../services/items.service";
const itemService = new ItemService();

export const useFetchItem = ( id ) => {
    
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState( true );
    const [error, setError] = useState( null );

    const fetchItem = async() => {
        const newItem = await itemService.getItem( id )
                            .catch( err => {
                                setError( err );
                                setIsLoading( false );
                            });
        setItem( newItem );
        setIsLoading( false );
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