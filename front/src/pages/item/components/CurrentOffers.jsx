import { Card } from "flowbite-react";
import PropTypes from 'prop-types';
import { convertToCurrency } from "../../../utils";
import { ItemService } from "../../../services";
import { useEffect, useState } from "react";
import { dateToText } from "../../../utils";
import { socket } from "../../../socket";

const itemService = new ItemService();

export const CurrentOffers = ({ item }) => {

    const [offers, setOffers] = useState([]);

    const fetchOffers = async() => {
        const data = await itemService.getOffers( item.item_id )
                        .catch( err => console.log('offers', err) )
        console.log('offers', data)
        setOffers( data );
    }

    useEffect( () => {

    },[item.offers])


    useEffect( () => {
        socket.connect();
        return () => {
            socket.disconnect();
        }
    }, []);
    
    useEffect( () => {
        fetchOffers();

        socket.on('connect', () => {
            socket.emit('join-auction', item.item_id );
        });

        socket.on('newOffer', ( offer ) => {
            console.log('newoffer CURRENTOFFER', offer)
            setOffers( offers => [offer, ...offers] );
        });
        
        return () => {
            socket.off('newOffer');
        }
    },[])

    return (
        <div className=" bg-white flex flex-col shadow-md border border-gray-200 rounded-lg p-4 overflow-auto w-full h-fit max-h-80">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest offers</h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    { offers.map( offer => (
                        <li className="py-3 sm:py-2" key={offer.offer_id}>
                            <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                    <img
                                        alt={ offer.user.username + ' avatar'}
                                        height="32"
                                        src={ offer.user.avatar_url || '/img/default-avatar.jpeg'}
                                        width="32"
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white" title={offer.user.username}>{ offer.user.username }</p>
                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400" title={dateToText(offer.created_at)}>{ dateToText( offer.created_at ) }</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    { convertToCurrency( offer.amount ) }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
};

CurrentOffers.propTypes = {
    item: PropTypes.object.isRequired
}
