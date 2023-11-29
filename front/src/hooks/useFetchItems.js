import { useEffect, useState } from "react";
import ItemService from "../services/items.service";
const itemService = new ItemService();

export const useFetchItems = () => {
    
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState( true );
    const [error, setError] = useState( null );

    const fetchItems = () => {
        itemService.getAllItems()
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