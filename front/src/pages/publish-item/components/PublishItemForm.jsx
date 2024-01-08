import { useEffect, useRef, useState } from 'react';
import { StatusService, CategoryService, ShippingWayService} from '../../../services/';
import { DropZone, Timepicker } from '../../../components';
import { Button, Checkbox, Datepicker, Dropdown, Label, Modal, TextInput, Textarea, Tooltip } from 'flowbite-react';
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
    const termConditionsRef = useRef( null );
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [shippingWays, setShippingWays] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState( null );
    const [selectedStatus, setSelectedStatus] = useState( null );
    const [selectedShippingWay, setSelectedShippingWay] = useState( null );
    const [selectedEndDate, setSelectedEndDate] = useState( new Date() );
    const [isFormValid, setIsFormValid] = useState( false );
    const [showTermsConditions, setShowTermsConditions] = useState( false );

    const onClickPublish = async() => {
        event.preventDefault();
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const time = timeRef.current.value;

        if( !termConditionsRef.current.checked ) {
            showErrorToast( 'You must accept terms and conditions' );
            return;
        }

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

    const onCloseTermConditions = () => {
        setShowTermsConditions( false );
    }

    const onAcceptTermConditions = () => {
        termConditionsRef.current.checked = true;
        setShowTermsConditions( false );
    }
    
    const onDeclineTermConditions = () => {
        termConditionsRef.current.checked = false;
        setShowTermsConditions( false );
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
            
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                    <DropZone/>
                </div>
                <form className="flex flex-col gap-4 w-full md:w-3/4">
                    <div className="w-full max-w-md min-w-42">
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
                            className='h-32'
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
                            min={ 0 }
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
                                className='min-w-16 w-full'
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
                      <Checkbox id="accept" ref={ termConditionsRef } defaultChecked/>
                        <Label htmlFor="accept" className="flex">
                            I agree with the&nbsp;
                            <a onClick={() => setShowTermsConditions( true )} className="text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500">
                                terms and conditions
                            </a>
                        </Label>
                    </div>
                    <Modal show={showTermsConditions} onClose={onCloseTermConditions}>
                        <Modal.Header>Terms of Service</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                                companies around the world are updating their terms of service agreements to comply.
                                </p>
                                {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                                soon as possible of high-risk data breaches that could personally affect them.
                                </p> */}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={onAcceptTermConditions}>I accept</Button>
                            <Button color="gray" onClick={onDeclineTermConditions}>
                                Decline
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Button
                        onClick={ onClickPublish }
                        type='submit'
                        disabled={ !isFormValid }
                    >
                        Publish
                    </Button>
                </form>

            </div>
        </div>
    )
};

PublishItemForm.propTypes = {
    handlePublishItem: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
};

