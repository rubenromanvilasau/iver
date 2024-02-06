import './item-page.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useFetchItem } from '../../hooks';
import { Carousel, Loading } from '../../components';
import { socket } from '../../socket';
import { showErrorToast, showInfoToast } from '../../utils/toasts';
import { UserContext } from '../../context/UserContext';
import { NewOfferForm, CurrentOffers, OfferDetails, ItemDetails, ItemHeader } from './components/';
import { convertToCurrency } from '../../utils';

export const ItemPage = () => {
    const { id } = useParams();

    const { user } = useContext( UserContext );

    const [currentImage, setCurrentImage] = useState({});
    const [viewersAmount, setViewersAmount] = useState( 0 );
    const [openModal, setOpenModal] = useState( false );
    const [lastOffer, setLastOffer] = useState( { amount: 0 } );
    const { item, isLoading } = useFetchItem( id );
    
    const handleImageClick = ( image ) => {
        setCurrentImage( image );
    }
    
    useEffect( () => {
        socket.connect();
        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect( () => {
        socket.on('connect', () => {
            showInfoToast('Connected to server');
            socket.emit('join-auction', item.item_id );
        });

        socket.on('viewersAmount', ( viewers ) => {
            setViewersAmount( viewers );
        });

        socket.on('newOffer', ( offer ) => {
            setLastOffer( offer );
            showInfoToast(`New offer: ${convertToCurrency( offer.amount )}`);
        });
        
        return () => {
            socket.off('connect');
            socket.off('viewersAmount');
            socket.off('newOffer');
            socket.disconnect();
        }
    }, []);

    useEffect( () => {
        if( !isLoading && item ) {
            console.log('item', item);
            setLastOffer( item.offers?.length > 0 ? item.offers[0] : { amount: 0} );
            setCurrentImage( item.images?.length > 0 ? item.images[0] : {} );
        }
    }, [item]);

    const onClickNewOffer = () => {
        if( !user.token ) {
            showErrorToast('You must be logged in to make an offer');
            return;
        }
        setOpenModal( true );
    }

    const onClosemodal = () => {
        setOpenModal( false );
    }

    if(isLoading) {
        return <Loading/>
    }

    return (
        <div className='container flex flex-col md:flex-row justify-center pt-4 pb-4 mx-auto gap-2 text-black mt-4 flex-wrap'>
            {   isLoading
                ? <Loading/> 
                : <>
                    <div className="flex flex-col md:flex-row gap-4 bg-white w-1/2 md:w-3/5 box-border h-fit p-8 rounded-md shadow-md">
                        <div className="flex flex-col w-full md:w-1/2 overflow-y-hidden">
                            <img className='max-h-sm min-h-sm rounded-md' src={ currentImage.image_url || '/img/no-image.png' } alt={`${item.name}-image`} />
                            {item.images.length > 0 && <Carousel images={item.images} currentImage={currentImage} handleImageClick={handleImageClick}/> }
                        </div>
                        <section className="w-full md:w-3/6 flex flex-col justify-between gap-12">
                            <ItemHeader item={item} viewersAmount={viewersAmount}/>
                            <ItemDetails item={item}/>
                            <OfferDetails item={item} lastOffer={lastOffer} onClickNewOffer={onClickNewOffer}/>
                        </section>

                        {/* Modal */}
                        <NewOfferForm 
                            openModal={openModal} 
                            onClose={onClosemodal}
                            itemId={item.item_id}
                        />
                    </div>
                    { user.rut === item.seller.rut && <CurrentOffers item={item}/> }
                </>
            }
        </div>
    )
}