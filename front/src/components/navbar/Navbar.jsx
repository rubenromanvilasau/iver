import { Link } from 'react-router-dom';
import './navbar.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { SearchBox } from '../index';
import { Avatar, Dropdown } from 'flowbite-react';

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
                    <div className='nav-btn'>
                    <Dropdown
                        label={<Avatar alt="User settings" placeholderInitials='RR' rounded />}
                        arrowIcon={false}
                        inline
                    >
                        <Dropdown.Header>
                        <span className="block text-sm text-gray">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            <Link to={'my-orders'} className='text-black'>My orders</Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>                        {/* <img src="/icons/notification.svg" alt="notification icon" /> */}
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
