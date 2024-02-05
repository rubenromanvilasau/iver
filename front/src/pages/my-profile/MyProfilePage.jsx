import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { UserContext } from "../../context/UserContext";

const iconsColor = '#00adb5';

export const MyProfilePage = () => {

    const [inputsStatus, setInputsStatus] = useState({ name: false, lastName: false, email: false, username: false, });
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        lastName: '',
        email: '',
        username: '',
    });
    
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

    const editUser = (e) => {
        e.preventDefault();
    }

    return (
        <div className='container mx-auto md:pl-40 pt-8 pb-8'>
            <h1 className='text-4xl'>My profile</h1>

            <form action="">
                <div className='flex flex-col items-center md:flex-row md:gap-32 mt-8'>

                    {/* Avatar */}
                    <div className="relative">
                        <img className='w-56 rounded-full h-auto border-primary border-2 p-2 shadow-md' src="/img/astronaut.png" alt="" />
                        <button className='absolute bottom-0 right-4 bg-transparent bg-slate-50 rounded-full p-2 shadow-md'>
                            <MdEdit 
                                color={iconsColor} 
                                size={24}
                                onClick={() => toggleInput('name')}
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
                                    id="name" 
                                    type="text" 
                                    placeholder="name@flowbite.com"
                                    name="name"
                                    value={user.name}
                                    disabled={!inputsStatus.name}
                                    onChange={onChangeInput}
                                />
                                <button className='bg-transparent'>
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
                                    id="last-name" 
                                    type="text" 
                                    placeholder="name@flowbite.com"
                                    name="last-name"
                                    value={user.last_name} 
                                    disabled={!inputsStatus.lastName}
                                    onChange={onChangeInput}
                                />
                                <button className='bg-transparent'>
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
                                    id="email" 
                                    type="email" 
                                    placeholder="name@flowbite.com"
                                    name="email"
                                    value={user.email}
                                    disabled={!inputsStatus.email}
                                    onChange={onChangeInput}
                                />
                                <button className='bg-transparent'>
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
                                    id="username" 
                                    type="text" 
                                    placeholder="name@flowbite.com" 
                                    value={user.username}
                                    disabled={!inputsStatus.username}
                                    onChange={onChangeInput}
                                />
                                <button className='bg-transparent'>
                                    <MdEdit 
                                        color={iconsColor} 
                                        size={24}
                                        onClick={() => toggleInput('username')}
                                    />
                                </button>
                            </div>
                        </div>     

                    </div>

                    </div>

                    <div className="flex justify-center mt-8 md:mt-16">
                    <Button 
                        className="bg-primary pl-8 pr-8"
                        onClick={editUser}
                        type="submit"
                    >
                        Save
                    </Button> 
                </div>
            </form>
        </div>
    )
};