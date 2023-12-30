import { useEffect, useRef, useState } from 'react';
import { StatusService, CategoryService, ShippingWayService} from '../../../services/';
import { DropZone, Timepicker } from '../../../components';
import { Button, Checkbox, Datepicker, Dropdown, Label, TextInput, Textarea, Tooltip } from 'flowbite-react';
import { showErrorToast } from '../../../utils/toasts';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import PropTypes from 'prop-types';

const statusService = new StatusService();
const categoryService = new CategoryService();
const shippingWayService = new ShippingWayService();

export const PublishItemForm = ({ handlePublishItem, setIsLoading }) => {

    const nameRef = useRef( null );
    const priceRef = useRef( null );
    const descriptionRef = useRef( null );
    const timeRef = useRef( null );
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [shippingWays, setShippingWays] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState( null );
    const [selectedStatus, setSelectedStatus] = useState( null );
    const [selectedShippingWay, setSelectedShippingWay] = useState( null );
    const [selectedEndDate, setSelectedEndDate] = useState( new Date() );
    const [isFormValid, setIsFormValid] = useState( false );

    const onClickPublish = async() => {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const time = timeRef.current.value;

        if( !name || !price || !description || !selectedCategory || !selectedStatus || !selectedShippingWay ) {
            showErrorToast( 'All fields are required' );
            return;
        }

        console.log('timeRef', timeRef.current.value, typeof timeRef.current.value);


        const [ hour, minutes ] = time.split(':');
        selectedEndDate.setHours( parseInt( hour ), parseInt( minutes ), 0, 0 );

        const item = {
            name,
            price: Number( price ),
            description,
            categoryId: selectedCategory.category_id,
            statusId: selectedStatus.status_id,
            shippingWayId: selectedShippingWay.shipping_way_id,
            endsAt: selectedEndDate,
        };

        handlePublishItem( item );

    }

    useEffect(() => {
        if( nameRef.current.value && Number( priceRef.current.value ) && descriptionRef.current.value && selectedCategory ) {
            setIsFormValid( true );
        }
    },[nameRef, priceRef, descriptionRef, selectedCategory, selectedStatus])

    useEffect(() => {

        const fetchParameters = async() => {
            try {
                const categories = await categoryService.getAll();
                setCategories( categories );
                
                const statuses = await statusService.getAll();
                setStatuses( statuses );
    
                const shippingWays = await shippingWayService.getAll();
                setShippingWays( shippingWays );
                
                setIsLoading( false );
            }catch( err ) {
                console.log( '[useEffect] fetchParameters ERROR', err );

                //TODO REDIRECCIONAR A PÁGINA DE ERROR
                setIsLoading( false );
            }
        }

        fetchParameters();

        return () => {
            setCategories([]);
            setCategories([]);
            setShippingWays([]);
        }
    }, [])


    return (
        <div className="bg-white flex flex-col gap-4 p-8 rounded-md shadow-md w-3/4">
            <h1 className='text-text-primary text-3xl'>Publish your item</h1>
            <hr/>
            
            <div className='flex flex-row gap-4'>
                <div className="flex flex-col gap-4 w-3/4">
                    <div className="max-w-md min-w-42">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Item name" />
                        </div>
                        <TextInput
                            ref={ nameRef} 
                            name='name' 
                            type="text" 
                            placeholder='Item name'
                        />
                    </div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <Textarea 
                            ref={ descriptionRef }
                            name='description' 
                            type="text" 
                            placeholder='Description'
                        />
                    </div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput
                            ref={ priceRef } 
                            name='price' 
                            type="number" 
                            placeholder='Price'
                        />
                    </div>
                    <div className="max-w-md">
                        <div className='mb-2 flex gap-2'>
                            <Label htmlFor="date" value="Expiration date" />
                            <Tooltip content="Limit date-time for users to offer">
                                <BsFillQuestionCircleFill className='text-gray-500 cursor-pointer' size={ 20 }/>
                            </Tooltip>
                        </div>   
                        <div className='flex row items-center gap-2'>
                            <Datepicker
                                className='min-w-16'
                                minDate={ new Date() }
                                name='date'
                                autoHide={ false }
                                onSelectedDateChanged={ (newDate) => { setSelectedEndDate( newDate ) }}
                            />
                            <Timepicker
                                timeRef={ timeRef }
                            />
                        </div>   
                    </div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="category" value="Category" />
                        </div>
                        <Dropdown label='Category' name='category'>
                            { categories.map( category => (
                                <Dropdown.Item
                                    key={ category.category_id }
                                    value={ category.category_id }
                                    onClick={ () => setSelectedCategory( category ) }
                                >
                                    { category.name }
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                    </div>
                    <div className='max-w-md'>
                        <div className="flex flex-row gap-2">
                            <Label htmlFor="comment" value="Status" />
                            <Tooltip content='Indicate the status of your item, is it new?, you bought it and used it just once?'>
                                <BsFillQuestionCircleFill className='text-gray-500 cursor-pointer' size={ 20 }/>
                            </Tooltip>
                        </div>
                    </div>
                    <Dropdown label='Status'>
                        { statuses.map( status => (
                            <Dropdown.Item
                                key={ status.status_id }
                                value={ status.status_id }
                                onClick={ () => setSelectedStatus( status ) }
                            >
                                { status.name }
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                    <div className="flex flex-col h-16">
                        <div className='mb-2 flex gap-2'>
                            <Label htmlFor="comment" value="Shipping way" />
                            <Tooltip content="How are you going to deliver your item to it's buyer?">
                                <BsFillQuestionCircleFill className='text-gray-500 cursor-pointer' size={ 20 }/>
                            </Tooltip>
                        </div>                
                        <Dropdown label='Shipping way'>
                            { shippingWays.map( shippingWay => (
                                <Dropdown.Item
                                    key={ shippingWay.shipping_way_id }
                                    value={ shippingWay.shipping_way_id }
                                    onClick={ () => setSelectedShippingWay( shippingWay ) }
                                >
                                    { shippingWay.name }
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="accept" defaultChecked />
                        <Label htmlFor="accept" className="flex">
                            I agree with the&nbsp;
                            <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                terms and conditions
                            </a>
                        </Label>
                    </div>
                    <Button
                        onClick={ onClickPublish }
                        disabled={ !isFormValid }
                    >
                        Publish
                    </Button>
                </div>
                <DropZone/>

            </div>
        </div>
    )
};

PublishItemForm.propTypes = {
    handlePublishItem: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
};

