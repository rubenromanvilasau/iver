import { Link } from 'react-router-dom';
import './navbar.scss';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export const Navbar = () => {

    const{ user } = useContext( UserContext );

    return (
        <nav>
            <div className='start'>
                <Link to={'/'}>
                    <img id='logo' src="/img/astronaut.png" alt="" />
                </Link>
            </div>
            <div className="input-wrapper">
                <input id='search' type="search" placeholder='I want a ...' />
                <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            {
                user.token
                ? <Link to={'/login'}>
                    <div id="account">
                        <img  src="/icons/account.svg" alt="" />
                        Profile
                    </div>
                  </Link>
                : <Link to={'/login'}>
                    <div id="account">
                        <img  src="/icons/account.svg" alt="" />
                        Sign in
                    </div>
                  </Link>
            }
        </nav>
    )
}

Navbar.propTypes = {
};
