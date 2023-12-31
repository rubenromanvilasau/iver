import { Link } from 'react-router-dom';
import './item-cards.scss';
import PropTypes from 'prop-types';
import { convertToCurrency } from '../../utils/convert-to-price';
import { CountdownTimer } from '../countdown-timer/CountdownTimer';

export const ItemCard = ({ item_id, name, images, price, offers, ends_at }) => {

    return (
        <Link to={ `/item/${item_id}` }>
            <div className='rounded-md box-sizing w-18 cursor-pointer text-center transition duration-500 bg-white shadow-md p-6 hover:scale-105'>
                <span className='text-black text-xl'>{ name }</span>
                <section className='mt-1'>
                        <img className='h-36 rounded-md w-full' src={ images.length > 0 ? images[0].image_url : '/img/funko.jpg' } alt="item image"/>
                    <div className="text-left my-2">
                        <div >
                            <span className='text-black'>Min price: </span>
                            <span className='font-light text-black'> { convertToCurrency( price ) }</span>
                        </div>
                        <div>
                            <span className='text-black'>Current offer: </span>
                            <span className='font-light text-black'> { offers.length > 0 ? convertToCurrency( offers[0].amount ) : 0 }</span>
                        </div>                                     
                        <div>
                            <span className='text-black'>Time left:</span>
                            <CountdownTimer endDate={ ends_at }/>
                        </div>
                    </div>
                </section>
            </div>
        </Link>        
    )
};

ItemCard.propTypes = {
    name: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    item_id: PropTypes.number.isRequired,
    offers: PropTypes.array.isRequired,
    ends_at: PropTypes.string.isRequired,
};