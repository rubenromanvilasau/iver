import { Card } from "flowbite-react";
import PropTypes from 'prop-types';

export const CurrentOffers = ({ item }) => {
    return (
        <Card className="snap-y max-h-96 overflow-y-scroll">
            <h2 className="text-center text-lg font-bold" style={{ color: '#04364A'}}>Current offers</h2>
            { item.offers.length > 0 
                ? item.offers.map( offer => (
                    <div className="flex flex-col border-2 rounded-md p-2" key={ offer.id }>
                        <span className="text-xs font-bold">{ item.seller.name }</span>
                        <span>{ offer.amount.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'}) }</span>
                    </div>
                ))
                : <span className="text-center">No offers yet</span>
            }
        </Card>
    )
};

CurrentOffers.propTypes = {
    item: PropTypes.object.isRequired
}
