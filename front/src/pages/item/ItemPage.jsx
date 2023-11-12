import './item-page.scss';
import { mockItems } from "../../mock-data/items";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ItemPage = () => {

    const [item, setItem] = useState({});
    const [currentImageSrc, setCurrentImageSrc] = useState({});
    const { id } = useParams();

    const handleImageClick = ( imageSrc ) => {
        setCurrentImageSrc( imageSrc );
    }

    useEffect( () => {
        const item = mockItems.find( item => item.id == id );
        setCurrentImageSrc( mockItems[0].imgSrc )
        setItem( item );
    }, []);

    return (
        <div className='item-container'>
            <div className="card">
                <div className="images">
                    <img className='main-img' src={ currentImageSrc } alt={`${item.name}-image`} />
                    <div className="carousel">
                        {
                            mockItems.slice(0,3).map( item => (
                                <img 
                                    onClick={ () => { handleImageClick( item.imgSrc) } }
                                    className={`small-img ${ currentImageSrc === item.imgSrc && 'selected' }`}
                                    // className='small-img' 
                                    key={ item.id } 
                                    src={ item.imgSrc } 
                                    alt={ `${item.name} image`}
                                />
                            ))
                        }
                    </div>
                </div>
                <section className="details">
                    <div>
                        <div className="title">
                            <h1>{ item.name }</h1>
                            <div className="people-watching">
                                <img className='icon' src="/icons/eye.svg" alt="eye icon" />
                                <span>{ 365 } persons watching this right now</span>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim corporis laborum corrupti quibusdam. Possimus maiores dolorum odit. Facere eius necessitatibus, animi dolorum velit minima alias, dolorem repellat fugiat dignissimos consequatur!</p>
                        <div className='detail'>
                            <img className='price-icon' src="/icons/status.svg" alt="price icon" />
                            <span style={{ fontWeight: '600'}}>Status: </span>
                            <span>{ item.status }</span>
                        </div>
                        <div className='detail'>
                            <img className='truck-icon' src="/icons/truck.svg" alt="truck icon" />
                            <span style={{ fontWeight: '600'}}>Delivery mode: </span>
                            <span>pickup</span>
                        </div>

                    </div>
                    <section>
                        <div className='detail'>
                            <img className='icon' src="/icons/price.svg" alt="price icon" />
                            <span className='price'>Price: </span>
                            <span className='price'>${ item.price }</span>
                        </div>
                        <div className='detail'>
                            <img className='icon' src="/icons/offer.svg" alt="offer icon" />
                            <span className='price'>Current offer: </span>
                            <span className='price'>${ 1650 }</span>
                        </div>
                    </section>
                    <button className='offer'>Offer</button>
                </section>
            </div>
        </div>
    )
}