import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Loading, SuccessCard } from '../../components';
import { ErrorCard } from '../../components/error-card/ErrorCard';
import ItemService from "../../services/item.service";
const itemService = new ItemService();
import { ToastContainer } from 'react-toastify';
import { PublishItemForm } from './components/PublishItemForm';

export const PublishItemPage = () => {

    const { user } = useContext( UserContext );

    const [isLoading, setIsLoading] = useState( false );
    const [publishSuccess, setPublishSuccess] = useState( null );

    const handlePublishItem = async( { name, price, description, categoryId, statusId, shippingWayId, endsAt, formData } ) => {

        const item = {
            name,
            price,
            description,
            categoryId,
            // sellerId: user.rut,
            sellerId: '20594941-0',
            statusId,
            shippingWayId,
            endsAt,
        };
        
        console.log('item', item);

        setIsLoading( true );
        // const response = await itemService.createItem( item )
        //                     .catch( err => {
        //                         console.log( 'ERROR',err );
        //                         setPublishSuccess( 'error' );
        //                         setIsLoading( false );
        //                         return;
        //                     });
            
        console.log('formdata', formData.get('photos'), typeof formData.get('photos'));
        await postPhotos( 1, formData );
        // if( response.status === 201 ) {
        //     const itemId = response.data.item_id;
        //     await postPhotos( itemId, formData );
        
        //     setIsLoading( false );
        //     setPublishSuccess( 'success' );
        // }
    }

    const postPhotos = async( id, formData ) => {
        await itemService.addPhotos( id, formData )
            .catch( err => {
                console.log('[PUBLISHITEM - PAGE] postPhotos ERROR ', err )
            });
                        
    }

    return (
       <div className='container mx-auto flex justify-center my-4'>
            {
            isLoading 
                ? <Loading/>
                : publishSuccess === 'success'
                    ? <SuccessCard
                        title='Your item was published!'
                        message='Now you can see it in home page'
                        link='/'
                        buttonText='Go to home'
                        />
                    : publishSuccess === 'error'
                        ? <ErrorCard
                                title='Oh no :('
                                message='There was a problem publishing your item, please try again later'
                                link='/'
                                buttonText='Go to home'
                            />
                        : <PublishItemForm handlePublishItem={handlePublishItem} setIsLoading={setIsLoading}/>
            }
            <ToastContainer/>
       </div>
    )
}