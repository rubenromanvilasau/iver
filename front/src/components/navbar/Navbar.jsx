import { Link } from 'react-router-dom';
import './navbar.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Notifications, SearchBox } from '../index';
import { Avatar, Dropdown } from 'flowbite-react';

export const Navbar = () => {

    const{ user, handleLogout } = useContext( UserContext );

    return (
        <nav className='bg-black w-full flex items-center justify-between p-3 box-border'>
            <div className='flex flex-row items-center'>
                <Link to={'/'}>
                    <img className='w-12 h-12 hover:rotate-180 transition duration-1000 ' src="/img/astronaut.png" alt="" />
                </Link>
            </div>
            <SearchBox/>
            {
                user.token
                ?<div className='flex flex-row'> 
                    <Notifications/>
                    <div className='items-center p-2 rounded-md cursor-pointer transition duration-500'>
                        <Dropdown
                            label={<Avatar alt="User settings" placeholderInitials='RR' rounded />}
                            arrowIcon={false}
                            inline
                        >
                            <Dropdown.Header>
                            <span className="block text-sm text-gray">{ user.name }</span>
                            <span className="block truncate text-sm font-medium">{ user.email }</span>
                            </Dropdown.Header>
                            <Link to={'my-orders'} className='text-black'>
                                <Dropdown.Item>
                                    My orders
                                </Dropdown.Item>
                            </Link>
                            <Link to={'my-orders'} className='text-black'>
                                <Dropdown.Item>
                                    My items
                                </Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                  </div>
                : <Link to={'/login'}>
                    <div className='flex flex-row items-center p-2 rounded-md cursor-pointer transition duration-500 gap-2'>
                        <img className='w-8' src="/icons/account.svg" alt="" />
                        Sign in
                    </div>
                  </Link>
            }

        </nav>
    )
};
