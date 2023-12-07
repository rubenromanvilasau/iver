import { Link } from 'react-router-dom';
import './item-cards.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { convertToCurrency } from '../../utils/convert-to-price';

export const ItemCard = ({ item_id, name, images, price, offers }) => {

  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(54);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(interval);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);

    return (
        <Link to={ `/item/${item_id}` }>
            <div className='rounded-md cursor-pointer text-center transition duration-500 bg-white shadow-md p-6 hover:scale-105'>
                <span className='text-black text-xl'>{ name }</span>
                <section className='mt-1'>
                        <img className='h-36 rounded-md w-full' src={ images[0] ? images[0].image_url : '/img/funko.jpg' } alt="item image"/>
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
                            <span className='font-light text-black'> {`${hours}h:${minutes}m:${seconds}s`}</span>
                        </div>
                    </div>
                </section>
                <Button>
                  Make an offer
                </Button>
            </div>
        </Link>        
    )
};

ItemCard.propTypes = {
    name: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.number,
    item_id: PropTypes.number,
    offers: PropTypes.array,
    user: PropTypes.object,
};