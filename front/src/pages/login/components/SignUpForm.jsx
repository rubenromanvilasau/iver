import { useContext, useRef, useState } from 'react';
import { UserService } from '../../../services/index';  
import { UserContext } from '../../../context/UserContext';
import { Button, TextInput } from 'flowbite-react';
// import { useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed, HiUser, HiPhone } from 'react-icons/hi';

const userService = new UserService();

export const SignUpForm = () => {

    const passwordRef = useRef( null );
    const emailRef = useRef( null );
    const rutRef = useRef( null );
    const cellphoneRef = useRef( null );
    const nameRef = useRef( null );
    const lastNameRef = useRef( null );
    const usernameRef = useRef( null );
    const [isPasswordVisible, setIsPasswordVisible] = useState( false );

    // const [registerSuccess, setRegisterSuccess] = useState( null );

    const { handleLogin } = useContext( UserContext );

    // const navigate = useNavigate();

    const handleRegisterClick = async () => {
        event.preventDefault();
        
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const rut = rutRef.current.value;
        const phone = cellphoneRef.current.value;
        const name = nameRef.current.value;
        const last_name = lastNameRef.current.value;
        const username = usernameRef.current.value;
        
        //TODO SHOW ERRORS
        if( !email || !password || !rut || !phone || !name || !last_name || !username ) return;
        
        const response = await userService.register( { email, password, rut, phone, name, last_name, username } );
        if( response.status === 409 ) {
            console.log('response', response);
            // TODO SHOW ERROR
            return;
        }else {
            //TODO HANDLE REGISTER SUCCESS
            handleLogin( email, password );
            // navigate('/login');
        }
    }

    return (
        <form>
            <section className='flex flex-col gap-4'>
                <div className='flex flex-row gap-4'>
                    <TextInput 
                        type="text" 
                        className='w-full h-12 rounded-md box-border pl-1 text-sm'
                        placeholder='Name'
                        ref={ nameRef }
                        required
                    />
                    <TextInput 
                        type="text" 
                        className='w-full h-12 rounded-md box-border pl-1 text-sm'
                        placeholder='Last name'
                        ref={ lastNameRef }
                        required
                    />
                </div>
                <TextInput 
                    ref={ rutRef }
                    type="text"
                    placeholder='RUT'
                    required
                />
                <TextInput 
                    ref={ cellphoneRef }
                    type="tel" 
                    icon={HiPhone} 
                    placeholder='Phone number'
                    required
                />
                <TextInput 
                    ref={ emailRef }
                    type="text"
                    icon={HiMail} 
                    placeholder='Email'
                    required
                />
                <TextInput 
                    ref={ usernameRef }
                    type="text"
                    icon={HiUser}
                    placeholder='Username'
                    required
                />
                <TextInput 
                    ref={passwordRef} 
                    type={ isPasswordVisible ? 'text' : 'password'} 
                    icon={HiLockClosed} 
                    placeholder="Your secret secret password" 
                    required 
                />
            </section>
            <Button 
                className='w-full bg-primary mt-4'
                onClick={ handleRegisterClick }
                type='submit'
            >
                Register
            </Button>
        </form>
    )
};
