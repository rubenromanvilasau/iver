import { useContext, useRef, useState } from 'react';
import { UserService } from '../../../services/index';  
import { UserContext } from '../../../context/UserContext';
import { Button, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed, HiUser, HiPhone } from 'react-icons/hi';
import { SuccessCard } from '../../../components';

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
    const [error, setError] = useState({ status: false, message: ''});

    const [registerSuccess, setRegisterSuccess] = useState( false );

    const { handleLogin } = useContext( UserContext );

    const navigate = useNavigate();

    const handleRegisterClick = async () => {
        event.preventDefault();
        
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const rut = rutRef.current.value;
        const phone = cellphoneRef.current.value;
        const name = nameRef.current.value;
        const last_name = lastNameRef.current.value;
        const username = usernameRef.current.value;
        
        if( !email || !password || !rut || !phone || !name || !last_name || !username ) {
            setError({ status: true, message: 'Please fill all the fields'});
            return;
        }

        await userService.register( { email, password, rut, phone, name, last_name, username } )
            .then( () => {
                handleLogin( email, password );
                setRegisterSuccess( true );
            })
            .catch( err => {
                if( err.response.status === 409 ) {
                    setError({ status: true, message: 'User already exists, you should try to log in' });
                    console.log('response', err);
                    return;
                }
            });
    }

    return (
        <>
            { !registerSuccess
                ? (
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
                        { error.status && <span className='text-red-600 text-xs'>{ error.message }</span> }
                        <Button 
                            className='w-full bg-primary mt-4'
                            onClick={ handleRegisterClick }
                            type='submit'
                        >
                            Register
                        </Button>
                    </form>
                )
                : (
                    <SuccessCard
                        title='You are registered!'
                        message='Now you can login and start using the app, press continue to see instructions'
                        link='/instructions'
                        buttonText='Take me to instructions'
                    />
                )
            }
        </>
    )
};
