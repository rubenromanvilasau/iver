import { useContext, useRef, useState } from 'react';
import '../login-page.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { Button } from 'flowbite-react';

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
            <section className='flex flex-col gap-4 w-3/5'>
                <input 
                    type="email" 
                    className='w-full h-12 rounded-md box-border pl-1 text-sm'
                    placeholder='Email'
                    ref={ emailRef }
                />  
                <div className="input-wrapper">
                    <input 
                        type={ isPasswordVisible ? 'text' : 'password'} 
                        className="w-full h-12 rounded-md box-border pl-1 text-sm" 
                        placeholder="Password" 
                        data-lpignore="true"
                        ref={ passwordRef }
                    />
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="input-icon password" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        onClick={ toggleShowPassword }
                    >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <Link>Forgot password?</Link>
            </section>
            <Button 
                onClick={ handleLoginClick }
            >
                Login
            </Button>
        </>
    )
};