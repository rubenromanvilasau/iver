import { Link } from 'react-router-dom';
import './navbar.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { SearchBox } from '../index';

export const Navbar = () => {

    const{ user, handleLogout } = useContext( UserContext );
    const [profileMenuVisible, setProfileMenuVisible] = useState( false );

    const toggleMenu = () => {
        setProfileMenuVisible(!profileMenuVisible);
      };
    
      const hideMenu = () => {
        setProfileMenuVisible(false);
      };

    return (
        <nav>
            <div className='start'>
                <Link to={'/'}>
                    <img id='logo' src="/img/astronaut.png" alt="" />
                </Link>
            </div>
            <SearchBox/>
            {
                user.token
                ?<div className='buttons'> 
                    <div className='nav-btn'>
                        <img src="/icons/notification.svg" alt="notification icon" />
                    </div>
                    <div>
                        <div className='nav-btn' onClick={ toggleMenu }>
                            <img  src="/icons/account.svg" alt="" />
                        </div>
                        <ul className={profileMenuVisible ? 'show' : ''} onMouseLeave={hideMenu}>
                            <li className="sub-item">
                                <p>                                
                                    <Link to={'/my-orders'}>
                                        My Orders
                                    </Link>
                                </p>
                            </li>
                            <li onClick={ handleLogout } className="sub-item">
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                  </div>
                : <Link to={'/login'}>
                    <div className='nav-btn row'>
                        <img  src="/icons/account.svg" alt="" />
                        Sign in
                    </div>
                  </Link>
            }

        </nav>
    )
};
