import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useFetchItem } from '../../hooks';
import { Carousel, Loading, Tabs } from '../../components';
import { socket } from '../../socket';
import { showErrorToast } from '../../utils/toasts';
import { UserContext } from '../../context/UserContext';
import { SellerInfoCard, NewOfferForm, CurrentOffers, ItemDetails, ItemHeader } from './components/';

const tabs = ['Description'];

export const ItemPage = () => {
    const { id } = useParams();

    const { user } = useContext( UserContext );

    const [currentImage, setCurrentImage] = useState({});
    const [viewersAmount, setViewersAmount] = useState( 0 );
    const [openModal, setOpenModal] = useState( false );
    const [lastOffer, setLastOffer] = useState( { amount: 0 } );
    const { item, isLoading } = useFetchItem( id );
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    
    const handleImageClick = ( image ) => {
        setCurrentImage( image );
    }

    useEffect( () => {
        if( !isLoading && item ) {
            console.log('item', item);
            setLastOffer( item.offers?.length > 0 ? item.offers[0] : { amount: 0} );
            setCurrentImage( item.images?.length > 0 ? item.images[0] : {} );
            
            socket.connect();

            socket.on('connect', () => {
                // showInfoToast('Connected to server');
                socket.emit('join-auction', item.item_id );
    
                socket.on('viewersAmount', ( viewers ) => {
                    // console.log('current viewers', viewers);
                    setViewersAmount( viewers );
                });
        
                socket.on('newOffer', ( offer ) => {
                    // console.log('new offer', offer);
                    console.log('item.offers', ...item.offers);
                    item.offers = [offer, ...item.offers];
                    setLastOffer( offer );
                    // showInfoToast(`New offer: ${convertToCurrency( offer.amount )}`);
                });
            });
        }

        return () => {
            socket.off('connect');
            socket.off('viewersAmount');
            socket.off('newOffer');
            socket.disconnect();
        }
    }, [item]);

    const onClickNewOffer = () => {
        if( !user || !user.token ) {
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
        <div className='container flex flex-col md:flex-row justify-center p-4 py-4 mx-auto gap-2 mt-4'>
            {   isLoading
                ? <Loading/> 
                : <>
                    <div className="flex flex-col md:flex-row gap-8 h-fit lg:p-4  rounded-md">
                        <div className="flex flex-col md:w-1/2 overflow-y-hidden">
                            <img className='max-h-sm min-h-sm rounded-md mb-2' src={ `http://localhost:4000/${item.images[0].image_url}` || '/img/no-image.png' } alt={`${item.name}-image`} />
                            {item.images.length > 0 && <Carousel images={item.images} currentImage={currentImage} handleImageClick={handleImageClick}/> }
                            <Tabs
                                tabs={tabs}
                                onClickTab={setCurrentTab}
                                currentTab={currentTab}
                            />
                            <p className='mt-4 text-slate-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quasi optio placeat quaerat? Eveniet numquam doloremque nostrum unde laborum maiores saepe fugiat, aspernatur provident fugit nihil ullam error quis? Eligendi, veniam. Dolorum repudiandae laboriosam error eum corporis ut, numquam beatae ab veniam ea assumenda, alias possimus dolorem aliquid natus vel, rerum eligendi nam.</p>
                        </div>
                        <section className="md:w-1/3 flex flex-col gap-12">
                            <ItemHeader item={item} viewersAmount={viewersAmount}/>
                            <ItemDetails 
                                item={item}
                                onClickNewOffer={onClickNewOffer}
                                lastOffer={lastOffer}
                            />
                        </section>

                        <div className='flex flex-col items-center gap-2'>
                            <SellerInfoCard seller={item.seller}/>
                            <CurrentOffers item={item}/> 
                        </div>

                    </div>
                </>
            }
            {/* Modal */}
            <NewOfferForm 
                openModal={openModal} 
                onClose={onClosemodal}
                itemId={item.item_id}
                minAmount={ item?.offers[0]?.amount || item.price }
            />
        </div>
    )
}