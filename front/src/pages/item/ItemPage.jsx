import './item-page.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useFetchItem } from '../../hooks';
import { Loading } from '../../components';
import { socket } from '../../socket';
import { showErrorToast, showInfoToast } from '../../utils/toasts';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { NewOfferForm } from './components/NewOfferForm';
import { CurrentOffers } from './components/CurrentOffers';

export const ItemPage = () => {
    const { id } = useParams();

    const { user } = useContext( UserContext );

    const [currentImage, setCurrentImage] = useState({});
    const [viewersAmount, setViewersAmount] = useState( 0 );
    const [openModal, setOpenModal] = useState( false );
    const [lastOffer, setLastOffer] = useState( { amount: 0} );
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
        });

        socket.on('viewersAmount', ( viewers ) => {
            setViewersAmount( viewers );
        });

        socket.on('newOffer', ( offer ) => {
            setLastOffer( offer );
            // const itemUpdated = { ...item };
            // itemUpdated.offers.unshift( offer );
            showInfoToast(`New offer: ${offer.amount.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'})}`);
        });
        
        return () => {
            socket.off('connect');
            socket.off('viewersAmount');
            socket.off('newOffer');
        }
    }, []);

    useEffect( () => {
        if( item && item.images ) {
            console.log('item', item);
            setLastOffer( item.offers.length > 0 ? item.offers[0] : { amount: 0} );
            setCurrentImage( item.images.length > 0 ? item.images[0] : {} );
        }
    }, [item]);


    const openPutOfferModal = () => {
        if( !user.token ) {
            showErrorToast('You must be logged in to make an offer');
            return;
        }
        setOpenModal( true );
    }

    const onClosemodal = () => {
        setOpenModal( false );
        console.log('modal closed');
    }

    return (
        <div className='item-container gap-2'>
            {   isLoading
                ? <Loading/> 
                : <>
                    <div className="card">
                        <div className="images">
                            <img className='main-img' src={ currentImage.image_url } alt={`${item.name}-image`} />
                            <div className="carousel">
                                {
                                    item.images.length > 0 && item.images.map( image => (
                                        <img 
                                            onClick={ () => { handleImageClick( image) } }
                                            className={`small-img ${ currentImage.item_image_id === image.item_image_id && 'selected' }`}
                                            key={ image.item_image_id } 
                                            src={ image.image_url } 
                                            alt={ `${item.name} image ${item.images.indexOf( image )}`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <section className="details">
                            <div className='flex flex-col gap-2 justify-between'>
                                <div className="title">
                                    <h1 className='text-3xl'>{ item.name }</h1>
                                    <div className="people-watching">
                                        <img className='icon' src="/icons/eye.svg" alt="eye icon" />
                                        <span>{ viewersAmount } people watching this right now</span>
                                    </div>
                                </div>
                                <p className='my-2'>{ item.description }</p>
                            </div>
                            <div className="">
                                <div className='detail my-2'>
                                    <img className='price-icon' src="/icons/status.svg" alt="price icon" />
                                    <span style={{ fontWeight: '600'}}>Sold by: </span>
                                    <span>{ item.seller.name }</span>
                                </div>
                                <div className='detail my-2'>
                                    <img className='price-icon' src="/icons/status.svg" alt="price icon" />
                                    <span style={{ fontWeight: '600'}}>Status: </span>
                                    <span>{ item.status }</span>
                                </div>
                                <div className='detail'>
                                    <img className='truck-icon' src="/icons/truck.svg" alt="truck icon" />
                                    <span style={{ fontWeight: '600'}}>Delivery mode: </span>
                                    <span>{ item.shipping_way }</span>
                                </div>
                            </div>
                            <section>
                                <div className='detail'>
                                    <img className='icon' src="/icons/price.svg" alt="price icon" />
                                    <span className='price'>Price: </span>
                                    <span className='price'>{ item.price.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'}) }</span>
                                </div>
                                <div className='detail'>
                                    <img className='icon' src="/icons/offer.svg" alt="offer icon" />
                                    <span className='price'>Current offer: </span>
                                    <span className='price'>{ lastOffer.amount.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'}) }</span>
                                </div>
                                <div className='detail'>
                                    <img className='icon' src="/icons/offer.svg" alt="offer icon" />
                                    <span className='price'>Time left: </span>
                                    <span className='price'>{}</span>
                                </div>
                                <button
                                    className='offer'
                                    onClick={ openPutOfferModal }
                                >
                                    Offer
                                </button>
                            </section>
                        </section>
                        <NewOfferForm 
                            openModal={openModal} 
                            onClose={onClosemodal}
                            itemId={item.item_id}
                        />
                    </div>
                    <CurrentOffers item={item}/>
                </>
            }
            <ToastContainer/>
        </div>
    )
}