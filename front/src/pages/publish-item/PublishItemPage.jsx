import './publish-item-page.scss';
// import { mockCategories } from '../../mock-data/categories';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Loading, SuccessCard } from '../../components';
import { ErrorCard } from '../../components/error-card/ErrorCard';
import ItemService from "../../services/items.service";
const itemService = new ItemService();
import { ToastContainer } from 'react-toastify';
import { PublishItemForm } from './components/PublishItemForm';

export const PublishItemPage = () => {

    const { user } = useContext( UserContext );

    const [isLoading, setIsLoading] = useState( false );
    const [publishSuccess, setPublishSuccess] = useState( null )

    const handlePublishItem = async( { name, price, description, categoryId, statusId, shippingWay } ) => {

        const item = {
            name,
            price,
            description,
            categoryId: 1,
            sellerId: user.rut,
            statusId: 1,
            shippingWay: 1,
        };

        setIsLoading( true );
        const response = await itemService.createItem( item )
                            .catch( err => {
                                console.log( 'ERROR',err );
                                setIsLoading( false );
                                setPublishSuccess( 'error' );
                                return;
                            });
        
        if( response.status === 201 ) {
            setIsLoading( false );
            setPublishSuccess( 'success' );
        }

    }

    return (
       <div className='container mx-auto flex justify-center mt-4'>
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