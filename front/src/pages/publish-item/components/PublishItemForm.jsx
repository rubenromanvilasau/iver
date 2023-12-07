import { useEffect, useRef, useState } from 'react';
import ItemService from '../../../services/items.service';
import { DropZone } from '../../../components';
import { Button, Datepicker, Dropdown, Tooltip } from 'flowbite-react';
import { showErrorToast } from '../../../utils/toasts';
import { BsFillQuestionCircleFill } from "react-icons/bs";

const itemService = new ItemService();

export const PublishItemForm = ({ handlePublishItem, setIsLoading }) => {

    const nameRef = useRef( null );
    const priceRef = useRef( null );
    const descriptionRef = useRef( null );
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [category, setCategory] = useState( null );
    const [status, setStatus] = useState( null );

    const onClickPublish = async() => {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;

        if( !name || !price || !description || !category ) {
            console.log(showErrorToast)
            showErrorToast( 'All fields are required' );
            return;
        }

        const item = {
            name,
            price,
            description,
            categoryId: category.category_id,
            statusId: status.status_id,
            shippingWay: 1,
        };

        handlePublishItem( item );

    }

    useEffect(() => {
        setIsLoading( true );
        itemService.getItemsCategories().then( (res ) => {
            setCategories( res );
            itemService.getItemsStatuses().then( (res) => {
                setStatuses( res );
                setIsLoading( false );
            })
        });
        return () => {
            setCategories([]);
        }
    }, [])


    return (
        <div className="bg-white flex flex-col gap-4 p-8 rounded-md shadow-md">
            <h1 className='text-black'>Publish your item</h1>
            <hr/>
            <div className="flex flex-col h-16">
                <label className='text-black' htmlFor="name">Name</label>
                <input
                    className='w-full h-12 rounded-md box-border pl-1 text-sm border-2 border-gray-300' 
                    ref={ nameRef} 
                    name='name' 
                    type="text" 
                    placeholder='Item name'
                />
            </div>
            <div className="flex flex-col h-16">
                <label className='text-black' htmlFor="price">Price</label>
                <input
                    className='w-full h-12 rounded-md box-border pl-1 text-sm border-2 border-gray-300' 
                    ref={ priceRef } 
                    name='price' 
                    type="number" 
                    placeholder='Price'
                />
            </div>
            <div className="flex flex-col h-16">
                <label className='text-black' htmlFor="price">Expiration date</label>
                <Datepicker
                    minDate={ new Date() }
                    name='date'
                />
            </div>
            <div className="flex flex-col h-24 ">
                <label className='text-black' htmlFor="name">Description</label>
                <textarea 
                    ref={ descriptionRef }
                    className='h-full resize-none border-2 border-gray-300 rounded-md text-black box-border p-4 text-sm'
                    name='description' 
                    type="text" 
                    placeholder='Description'
                />
            </div>
            <div className="flex flex-col h-16">
                <label className='text-black' htmlFor="category">Category</label>
                <Dropdown label='Category'>
                    { categories.map( category => (
                        <Dropdown.Item
                            key={ category.category_id }
                            value={ category.category_id }
                            onClick={ () => setCategory( category ) }
                        >
                            { category.name }
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-col h-16">
                <div className='flex flex-row items-center gap-1'>
                    <label className='text-black' htmlFor="category">Item status</label>
                    <Tooltip content='Indicate the status of your item, is it new?, you bought it and used it just once?'>
                        <BsFillQuestionCircleFill className='text-gray-500 cursor-pointer' size={ 20 }/>
                    </Tooltip>
                </div>
                <Dropdown label='Status'>
                    { statuses.map( status => (
                        <Dropdown.Item
                            key={ status.status_id }
                            value={ status.status_id }
                            onClick={ () => setStatus( status ) }
                        >
                            { status.name }
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
            <div className="flex flex-col h-16">
                <div className='flex flex-row items-center gap-1'>
                    <label className='text-black' htmlFor="category">Shipping way</label>
                    <Tooltip content="How are you going to deliver your item to it's buyer?">
                        <BsFillQuestionCircleFill className='text-gray-500 cursor-pointer' size={ 20 }/>
                    </Tooltip>
                </div>                <Dropdown label='Category'>
                    { categories.map( category => (
                        <Dropdown.Item
                            key={ category.category_id }
                            value={ category.category_id }
                            onClick={ () => setCategory( category ) }
                        >
                            { category.name }
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

