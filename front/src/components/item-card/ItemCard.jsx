import { Link } from 'react-router-dom';
import './item-cards.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
            <div id="card" className='p-6'>
                <span className='item-name'>{ name }</span>
                <section id='body'>
                        <img src={ images[0] ? images[0].image_url : '/img/funko.jpg' } alt="item image"/>
                    <div className="details my-2">
                        <div >
                            <span>Min price: </span>
                            <span className='property'> { price.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'}) }</span>
                        </div>
                        <div>
                            <span>Current offer: </span>
                            <span className='property'> { offers.length > 0 ? offers[0].amount.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'}) : 0 }</span>
                        </div>                                     
                        <div>
                            <span>Time left:</span>
                            <span className='property'> {`${hours}h:${minutes}m:${seconds}s`}</span>
                        </div>
                    </div>
                </section>
                <button>
                  Make an offer
                </button>
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