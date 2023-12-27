import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Notifications, SearchBox } from '../index';
import { Avatar, Dropdown } from 'flowbite-react';

export const Navbar = () => {

    const{ user, handleLogout } = useContext( UserContext );

    return (
        <nav className='bg-primary w-full flex items-center justify-between p-3 box-border'>
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
                    <div className="relative top-2 -left-4 rounded-full bg-red-800 w-5 h-5 flex items-center justify-center text-xs font-semibold">1</div>
                    <div className='items-center p-2 rounded-md cursor-pointer transition duration-500'>
                        <Dropdown
                            label={<Avatar alt="User settings" placeholderInitials='RR' rounded />}
                            arrowIcon={false}
                            inline
                        >
                            <Link to={'my-profile'} className='text-black'>
                                <Dropdown.Header>
                                    <span className="block text-sm text-gray">{ user.name }</span>
                                    <span className="block truncate text-sm font-medium">{ user.email }</span>
                                </Dropdown.Header>
                            </Link>
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
                    <div className='flex flex-row items-center p-2 rounded-md cursor-pointer transition duration-500 gap-2 text-white'>
                        <img className='w-8' src="/icons/account.svg" alt="" />
                        Sign in
                    </div>
                  </Link>
            }

        </nav>
    )
};
