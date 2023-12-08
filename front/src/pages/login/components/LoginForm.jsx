import { useContext, useRef, useState } from 'react';
import '../login-page.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { Button, Label, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';

export const LoginForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState( false );

    const { handleLogin } = useContext( UserContext );
    const passwordRef = useRef( null );
    const emailRef = useRef( null );


    const handleLoginClick = () => {
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        
        if( !email || !password ) return;
        
        handleLogin( email, password );
    }

    const toggleShowPassword = () => {
        setIsPasswordVisible( !isPasswordVisible );
    }

    return (
        <>
            <section className='flex flex-col gap-4'>
                <div className="max-w-md">
                    <TextInput 
                        ref={emailRef}
                        type="email" 
                        icon={HiMail} 
                        placeholder="name@iver.com" 
                        required 
                    />
                </div>
                <div className="max-w-md">
                    <TextInput 
                        ref={passwordRef} 
                        type={ isPasswordVisible ? 'text' : 'password'} 
                        icon={HiLockClosed} 
                        placeholder="Your secret secret password" 
                        required 
                    />
                </div>
               
                <Link className='text-text-secondary underline underline-offset-2'>Forgot password?</Link>
            </section>
            <Button 
                className='w-full bg-primary'
                onClick={ handleLoginClick }
            >
                Login
            </Button>
        </>
    )
};