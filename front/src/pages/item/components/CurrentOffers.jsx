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
        fetchOffers();
        socket.on('newOffer', ( offer ) => {
            setOffers( offers => [offer, ...offers] );
        });
        
        return () => {
            socket.off('newOffer');
        }
    },[])

    return (
        <Card className="overflow-auto">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest offers</h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    { offers.map( offer => (
                        <li className="py-3 sm:py-4" key={offer.offer_id}>
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
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{ offer.user.username }</p>
                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{ dateToText( offer.created_at ) }</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    { convertToCurrency( offer.amount ) }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>

    )
};

CurrentOffers.propTypes = {
    item: PropTypes.object.isRequired
}
