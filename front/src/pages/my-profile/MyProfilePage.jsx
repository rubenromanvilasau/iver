import { Button, Checkbox, Label, TextInput, ToggleSwitch } from 'flowbite-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { UserContext } from '../../context/UserContext';
import { UserService } from '../../services/index';
import { showErrorToast, showSuccessToast } from '../../utils/toasts';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';


const userService = new UserService();

const iconsColor = '#00adb5';

const tabs = ['Basic information', 'Preferences'];
const cryptocurrencies = [
    {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: <FaBitcoin title="BTC" className="text-orange-400 text-xl"/>
    },
    {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        icon: <FaEthereum title="ETH" className="text-slate-500 text-xl"/>
    }
];

export const MyProfilePage = () => {

    const [inputsStatus, setInputsStatus] = useState({ name: false, lastName: false, email: false, username: false, });
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        lastName: '',
        email: '',
        username: '',
    });
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    
    const avatarInputRef = useRef(null);
    
    const { user } = useContext(UserContext);

    const toggleInput = ( inputName ) => {
        setInputsStatus({
            ...inputsStatus, 
            [inputName]: !inputsStatus[inputName]
        });
    }

    const onChangeInput = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
        console.log('User edited', updatedUser);
    }

    const updateUser = async (e) => {
        // e.preventDefault();
        await userService.update( user.rut, updatedUser )
            .then( res => {
                console.log('Updated user', res);
                showSuccessToast('Your information has been updated succesfully!');
            })
            .catch( err => {
                console.log('Error updating user', err);
                showErrorToast('Error updating your information :(');
                return;
            });
    }

    //Update user accepts crypto payment preference
    const updateAcceptsCrypto = async (e) => {
        const acceptsCrypto = e;
        await userService.updateUserPreferences( user.rut, { accepts_crypto_payments: acceptsCrypto } )
            .then( res => {
                console.log('Updated user', res);
                showSuccessToast('Your preferences has been updated succesfully!');
            
            })
            .catch( err => {
                console.log('Error updating user', err);
                showErrorToast('Error updating your preferences :(');
                return;
            })
    }

    const handleAvatarClick = () => {
        avatarInputRef.current.click();
    }

    const handleAvatarChange = (e) => {
        console.log('Avatar changed', e.target.files[0]);
    }

    useEffect(() => {
        if( user ) {
            setUpdatedUser({...user});
        }
    },[user]);

    return (
        <div className='container mx-auto lg:pl-40 pt-8 pb-8'>
            <h1 className='text-4xl'>{ currentTab }</h1>

            <div>
                <div className='flex flex-col  md:flex-row md:gap-32 mt-8'>

                    {/* Avatar */}
                    <div className="flex flex-col gap-4">
                        <div
                            className="relative h-fit"
                            onClick={ handleAvatarClick }
                            role="button"
                        >
                            <input 
                                type="file" 
                                name='avatar' 
                                className='hidden'
                                ref={avatarInputRef}
                                onChange={handleAvatarChange}  
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
                                        <span className={`text-slate-500 ${currentTab === tab ? 'text-slate-50' : 'text-slate-500'}`}>{ tab }</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                   {
                        currentTab === 'Basic information'

                        && (
                            <form className='grid grid-cols-1 mt-8 md:grid-cols-2 gap-8 md:gap-16'>
                                
                                {/* Name */}
                                <div className='h-fit'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Your name" />
                                    </div>
                                    <div className='flex items-center gap-2 '>
                                        <TextInput 
                                            shadow
                                            id="name" 
                                            type="text" 
                                            placeholder="Ej: John"
                                            name="name"
                                            value={updatedUser.name}
                                            disabled={!inputsStatus.name}
                                            onChange={onChangeInput}
                                        />
                                        <button 
                                            className='bg-transparent'
                                            type="button"
                                        >
                                            <MdEdit 
                                                color={iconsColor} 
                                                size={24}
                                                onClick={() => toggleInput('name')}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Last name */}
                                <div  className='h-fit'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="last-name" value="Your last name" />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <TextInput 
                                            shadow
                                            id="last-name" 
                                            type="text" 
                                            placeholder="Ej: Doe"
                                            name="last-name"
                                            value={updatedUser.last_name} 
                                            disabled={!inputsStatus.lastName}
                                            onChange={onChangeInput}
                                        />
                                        <button 
                                            className='bg-transparent'
                                            type="button"
                                        >
                                            <MdEdit 
                                                color={iconsColor} 
                                                size={24}
                                                onClick={() => toggleInput('lastName')}
                                            />
                                        </button>
                                    </div>
                                </div>   

                                {/* Email */}
                                <div className='h-fit'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Your email" />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <TextInput 
                                            shadow
                                            id="email" 
                                            type="email" 
                                            placeholder="Ej: name@iver.cl"
                                            name="email"
                                            value={updatedUser.email}
                                            disabled={!inputsStatus.email}
                                            onChange={onChangeInput}
                                        />
                                        <button 
                                            className='bg-transparent'
                                            type="button"
                                        >
                                            <MdEdit 
                                                color={iconsColor} 
                                                size={24}
                                                onClick={() => toggleInput('email')}
                                            />
                                        </button>
                                    </div>
                                </div>   

                                {/* Username */}
                                <div className='h-fit'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="Your username" />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <TextInput 
                                            shadow
                                            id="username" 
                                            type="text" 
                                            placeholder="Ej: johndoe" 
                                            value={updatedUser.username}
                                            disabled={!inputsStatus.username}
                                            onChange={onChangeInput}
                                        />
                                        <button 
                                            className='bg-transparent'
                                            type="button"
                                        >
                                            <MdEdit 
                                                color={iconsColor} 
                                                size={24}
                                                onClick={() => toggleInput('username')}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className='h-fit'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="Your Phone" />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <TextInput 
                                            shadow
                                            id="phone" 
                                            type="phone" 
                                            placeholder="Ej: 912345678" 
                                            value={updatedUser.phone}
                                            disabled={!inputsStatus.phone}
                                            onChange={onChangeInput}
                                        />
                                        <button 
                                            className='bg-transparent'
                                            type="button"
                                        >
                                            <MdEdit 
                                                color={iconsColor} 
                                                size={24}
                                                onClick={() => toggleInput('phone')}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className='h-fit'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="Your Password" />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <TextInput 
                                            shadow
                                            id="password" 
                                            type="password" 
                                            placeholder="Ej *********" 
                                            // value={'aaaaaaaa'}
                                            disabled={!inputsStatus.password}
                                            onChange={onChangeInput}
                                        />
                                        <button 
                                            className='bg-transparent'
                                            type="button"
                                        >
                                            <MdEdit 
                                                color={iconsColor} 
                                                size={24}
                                                onClick={() => toggleInput('password')}
                                            />
                                        </button>
                                    </div>
                                </div>   
                                <div className="flex justify-center mt-8 md:mt-4">
                                    <Button 
                                        className="bg-primary pl-8 pr-8"
                                        onClick={updateUser}
                                        type="submit"
                                    >
                                        Save
                                    </Button> 
                                </div>

                            </form>
                        )

                   }

                   {
                        currentTab === 'Preferences' 
                            && (
                                <div>
                                    <ToggleSwitch
                                        label='I do accept crypto as payments'
                                        checked={updatedUser.accepts_crypto_payment}
                                        onChange={updateAcceptsCrypto}
                                    />
                                    <div className='mb-2 block'>
                                        <Label
                                            htmlFor="currency"
                                            value="Currency"
                                        />
                                    </div>
                                    {    updatedUser.acceptsCrypto && (
                                        <div className='rounded-md bg-slate-200 border-2 border-slate-300 p-4'>
                                            { cryptocurrencies.map( (currency, i) => (
                                                    <div 
                                                        className="flex flex-row items-center gap-2" 
                                                        key={i}
                                                    >
                                                        <Checkbox/>
                                                        <span>{ currency.symbol }</span>  
                                                        { currency.icon }
                                                    </div>

                                                ))
                                            }
                                        </div>
                                    )}
                                    {/* <Select
                                        id='currencies'
                                        onChange={(e) => console.log('Currency', e.target.value)}
                                    >
                                        {
                                            cryptocurrencies.map( (crypto, i) => (
                                                <option 
                                                    value={crypto}
                                                    key={i}
                                                >
                                                    {crypto}
                                                </option>
                                            ))
                                        }
                                    </Select> */}
                                </div>
                            )
                   }

                </div>

                
            </div>
        </div>
    )
};