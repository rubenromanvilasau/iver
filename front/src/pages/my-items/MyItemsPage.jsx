import { useEffect, useState } from 'react';
import { UserService } from '../../services';
import { ItemsTable } from './components/ItemsTable';

const userService = new UserService();

export const MyItemsPage = () => {

    const [items, setItems] = useState([]);

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
            <h1 className='text-4xl text-slate-500'>My items</h1>
            <ItemsTable
                items={items}
            />
        </div>
    )
}