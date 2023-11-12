import { Link } from 'react-router-dom';
import './banner.scss';

export const Banner = () => {
    return (
        <section id="banner">
            <div className="title">
                <h1 className='title-text'>Sell whatever, whenever you want</h1>
            </div>
            <Link to={ '/publish' }>
                <button className='btn'>Start now</button>
            </Link>
        </section>
    )
};
