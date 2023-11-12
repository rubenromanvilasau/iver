import { useEffect, useState } from "react";
import { getAllItems } from "../services/items.service";

export const useFetchItems = () => {
    
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState( true );
    const [error, setError] = useState( null );

    const fetchItems = () => {
        getAllItems()
            .then( data => {
                setItems( data );
                setIsLoading( false );
            })
            .catch( err => {
                setError( err );
                setIsLoading( false );
            });
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return {
        items,
        isLoading,
        error
    };
};