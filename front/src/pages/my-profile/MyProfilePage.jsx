import { Button, Label, TextInput } from 'flowbite-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { UserContext } from '../../context/UserContext';
import { UserService } from '../../services/index';
import { showErrorToast, showSuccessToast } from '../../utils/toasts';


const userService = new UserService();

const iconsColor = '#00adb5';

export const MyProfilePage = () => {

    const [inputsStatus, setInputsStatus] = useState({ name: false, lastName: false, email: false, username: false, });
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        lastName: '',
        email: '',
        username: '',
    });
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

    const save = async (e) => {
        e.preventDefault();
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
        <div className='container mx-auto md:pl-40 pt-8 pb-8'>
            <h1 className='text-4xl'>My profile</h1>

            <form action="">
                <div className='flex flex-col items-center md:flex-row md:gap-32 mt-8'>

                    {/* Avatar */}
                    <div
                        className="relative"
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

                    <div className='grid grid-cols-1 mt-8 md:grid-cols-2 gap-8 md:gap-16'>
                        
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

                    </div>

                    </div>

                    <div className="flex justify-center mt-8 md:mt-16">
                        <Button 
                            className="bg-primary pl-8 pr-8"
                            onClick={save}
                            type="submit"
                        >
                            Save
                        </Button> 
                    </div>
            </form>
        </div>
    )
};