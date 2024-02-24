import { Button, Label, TextInput } from "flowbite-react";
import { MdEdit } from "react-icons/md";
import { UserService } from "../../../services";
import { useContext, useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { UserContext } from "../../../context/UserContext";

const userService = new UserService();

const iconsColor = '#00adb5';


export const BasicInformation = () => {

    const { user } = useContext( UserContext );

    const [inputsStatus, setInputsStatus] = useState({ name: false, lastName: false, email: false, username: false, });
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        lastName: '',
        email: '',
        username: '',
    });
    const [isInfoChanged, setIsInfoChanged] = useState(false);

    const toggleInput = ( inputName ) => {
        setInputsStatus({
            ...inputsStatus, 
            [inputName]: !inputsStatus[inputName]
        });
    }

    const onChangeInput = (e) => {
        setIsInfoChanged( true );
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
        console.log('User edited', updatedUser);
    }

    const cancelUpdatedUser = () => {
        event.preventDefault();
        setIsInfoChanged( false );
        setUpdatedUser({...user});
        setInputsStatus({ 
            name: false, 
            lastName: false, 
            email: false, 
            username: false, 
        });
    }

    const updateUser = async () => {
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

    useEffect(() => {
        if( user ) {
            setUpdatedUser({...user});
        }
    },[user]);

    return (
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
            { isInfoChanged 
                && (
                    <div className="w-full flex justify-start gap-2 mt-8 md:mt-0">
                        <Button 
                            className="bg-primary pl-8 pr-8"
                            onClick={updateUser}
                            type="submit"
                            disabled={!isInfoChanged}
                        >
                            Save
                        </Button> 
                        <Button 
                            className="bg-slate-500 pl-8 pr-8"
                            onClick={cancelUpdatedUser}
                            type="submit"
                        >
                            Cancel
                        </Button> 
                    </div>
                )

            } 
        </form>
    )
};