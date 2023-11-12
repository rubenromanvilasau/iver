import { Link } from 'react-router-dom';
import './item-cards.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const ItemCard = ({ item_id, name, imgSrc = '/img/funko.jpg', price }) => {

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
        <Link to={ `/${item_id}` }>
            <div id="card">
                <span className='item-name'>{ name }</span>
                <section id='body'>
                        <img src={ imgSrc } alt="item image"/>
                    <div className="details">
                        <div >
                            <span>Min price: </span>
                            <span className='property'> { price.toLocaleString('es-cl', {
                              currency: 'CLP',
                              style: 'currency'
                            }) }</span>
                        </div>
                        <div>
                            <span>Current offer: </span>
                            <span className='property'> ${ 1850 }</span>
                        </div>                                     
                        <div>
                            <span>Time left:</span>
                            <span className='property'> {`${hours}h:${minutes}m:${seconds}s`}</span>
                        </div>
                    </div>
                </section>
                <button>Make an offer</button>
            </div>
        </Link>        
    )
};

ItemCard.propTypes = {
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    price: PropTypes.number,
    item_id: PropTypes.number,
};