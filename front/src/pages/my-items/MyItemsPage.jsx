import { useContext, useEffect, useState } from 'react';
import { UserService } from '../../services';
import { ItemsTable } from './components/ItemsTable';
import { UserContext } from '../../context/UserContext';

const userService = new UserService();

export const MyItemsPage = () => {

    const { user } = useContext(UserContext);

    const [items, setItems] = useState([]);


    //TODO UPDATE THIS TO BRING USER ITEMS
    useEffect( () => {
        userService.getItems('20594941-0')
            .then( response => {
                console.log('response', response.data)
                setItems( response.data );
            } )
            .catch( err => console.log( err.data ) );
    },[]);

    return (
        <div className="flex flex-col p-8 box-border w-full">
            <h1 className='text-4xl text-slate-600'>My items, {user.username}</h1>
            <ItemsTable
                items={items}
            />
        </div>
    )
}