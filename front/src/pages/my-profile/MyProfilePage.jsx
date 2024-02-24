import { useContext, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { UserContext } from '../../context/UserContext';
import { UserService } from '../../services/index';
import { BasicInformation } from './components/BasicInformation';
import { Preferences } from './components/Preferences';
import { Addresses } from './components/Addresses';


const userService = new UserService();

const iconsColor = '#00adb5';

//TODO this can be improved, we could attach the component to be rendered.
const tabs = ['Basic information', 'Preferences', 'Addresses'];

export const MyProfilePage = () => {

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    
    const avatarInputRef = useRef(null);
    const { user } = useContext(UserContext);

    const handleAvatarClick = () => {
        console.log('update user avatar');
        avatarInputRef.current.click();
    }

    const handleAvatarChange = (e) => {
        console.log('Avatar changed', e.target.files[0]);
    }

    return (
        <div className='container mx-auto lg:pl-40 pt-8 pb-8 pl-4 pr-4'>
            <h1 className='text-4xl text-slate-600'>{ currentTab }</h1>

            <div>
                <div className='flex flex-col items-center md:items-start md:flex-row md:gap-32'>

                    {/* Avatar */}
                    <div className="flex flex-col gap-4">
                        <div
                            className="relative h-fit w-fit"
                            onClick={ handleAvatarClick }
                            role="button"
                        >
                            <input 
                                type="file" 
                                name='avatar' 
                                className='hidden'
                                ref={avatarInputRef}
                                onChange={handleAvatarChange}
                                accept='.jpg, .jpeg, .png'
                            />
                            <img className='w-56 rounded-full h-auto border-primary border-2 p-2 shadow-md' src="/img/astronaut.png" alt="" />
                            <button 
                                className='absolute bottom-0 right-4 bg-transparent bg-slate-300 rounded-full p-2 shadow-md'
                                type="button"
                            >
                                <MdEdit 
                                    color={iconsColor} 
                                    size={24}
                                />
                            </button>
                        </div>

                        <div className='flex flex-col justify-center gap-2'>
                            {
                                tabs.map( (tab,i) => (
                                    <div 
                                        className={`w-full rounded-lg h-12 flex items-center justify-center cursor-pointer transition-all ease-in duration-200 ${currentTab === tab ? 'bg-primary border-2 border-slate-400' : 'bg-gray-300'}`}
                                        key={i}
                                        onClick={ () => setCurrentTab(tab) }
                                        >
                                        <span className={`text-slate-50 ${currentTab === tab ? 'text-slate-50' : 'text-slate-500'}`}>{ tab }</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                   {
                        currentTab === 'Basic information'
                            && (
                                <BasicInformation/>
                            )
                   }

                   {
                        currentTab === 'Preferences' 
                            && (
                                <Preferences/>
                            )
                   }

                   {
                        currentTab === 'Addresses'
                            && (
                                <Addresses/>
                            )
                   }

                </div>

                
            </div>
        </div>
    )
};