import { useEffect, useRef, useState } from 'react';
import ItemService from '../../../services/items.service';
import { DropZone } from '../../../components';
import { Button, Datepicker, Dropdown } from 'flowbite-react';
import { showErrorToast } from '../../../utils/toasts';

const itemService = new ItemService();

export const PublishItemForm = ({ handlePublishItem, setIsLoading }) => {

    const nameRef = useRef( null );
    const priceRef = useRef( null );
    const descriptionRef = useRef( null );
    const categoryRef = useRef( null );
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const onChangeCategory = (e ) => {
        console.log( e, categoryRef.current.value );
    }

    const onClickPublish = async() => {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        console.log('category', category)

        if( !name || !price || !description || !category ) {
            console.log(showErrorToast)
            showErrorToast( 'All fields are required' );
            return;
        }

        const item = {
            name,
            price,
            description,
            categoryId: 1,
            statusId: 1,
            shippingWay: 1,
        };

        handlePublishItem( item );

    }

    useEffect(() => {
        setIsLoading( true );
        itemService.getItemsCategories().then( (res ) => {
            console.log('categories', res);
            setCategories( res );
            itemService.getItemsStatuses().then( (res) => {
                setStatuses( res );
                console.log('statuses', res);
                setIsLoading( false );
            })
        });
        return () => {
            setCategories([]);
        }
    }, [])


    return (
        <div className="bg-white w-1/2 flex flex-col items-center gap-4 p-12 rounded-md shadow-md">
            <h1 className='text-black'>Publish your item</h1>
            <hr/>
            <div className="flex flex-col w-4/12 h-16">
                <label className='text-black' htmlFor="name">Name</label>
                <input
                    className='w-full h-12 rounded-md box-border pl-1 text-sm border-2 border-gray-300' 
                    ref={ nameRef} 
                    name='name' 
                    type="text" 
                    placeholder='Item name'
                />
            </div>
            <div className="flex flex-col w-4/12 h-16">
                <label className='text-black' htmlFor="price">Price</label>
                <input
                    className='w-full h-12 rounded-md box-border pl-1 text-sm border-2 border-gray-300' 
                    ref={ priceRef } 
                    name='price' 
                    type="number" 
                    placeholder='Price'
                />
            </div>
            <Datepicker
                minDate={ new Date() }
            />
            <div className="flex flex-col w-4/12 h-24 ">
                <label className='text-black' htmlFor="name">Description</label>
                <textarea 
                    ref={ descriptionRef }
                    className='h-full resize-none border-2 border-gray-300 rounded-md text-black box-border p-4 text-sm'
                    name='description' 
                    type="text" 
                    placeholder='Description'
                />
            </div>
            <div className="flex flex-col w-4/12 h-16">
                <label className='text-black' htmlFor="category">Category</label>
                <Dropdown label='Category'>
                    { categories.map( category => (
                        <Dropdown.Item
                            key={ category.category_id }
                            value={ category.category_id }
                            onClick={ onChangeCategory }
                        >
                            { category.name }
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-col w-4/12 h-16">
                <label className='text-black' htmlFor="category">Item status</label>
                <Dropdown label='Status'>
                    { statuses.map( status => (
                        <Dropdown.Item
                            key={ status.status_id }
                            value={ status.status_id }
                            onClick={ onChangeCategory }
                        >
                            { status.name }
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
            <DropZone/>
            <Button
                onClick={ onClickPublish }
            >
                Publish
            </Button>
        </div>
    )
};

