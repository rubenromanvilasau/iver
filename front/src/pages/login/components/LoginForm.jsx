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
    const [emailError, setEmailError] = useState({ status: false, message: ''});
    const [passwordError, setPasswordError] = useState({ status: false, message: ''});


    const handleLoginClick = async() => {
        event.preventDefault();
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        
        if( !email  ) {
            setEmailError({ status: true, message: 'Please fill your email'});
            return;
        }

        if( !password ) {
            setPasswordError({ status: true, message: 'Please fill your password'});
            return;
        }
        
        handleLogin( email, password )
            .catch( err => {
                console.log('error LOGIN', err.message);
                if( err.status === 404 ) {
                    setEmailError({ status: true, message: 'There is no account with that email' });
                }else {
                    setPasswordError({ status: true, message: 'Incorrect password. Please try again' });
                }
            });
    }

    const onChangePassword = () => {
        setPasswordError({ status: false, message: ''});
    }

    const onChangeEmail = () => {
        setEmailError({ status: false, message: ''});
    }

    const toggleShowPassword = () => {
        setIsPasswordVisible( !isPasswordVisible );
    }

    return (
        <form>
            <section className='flex flex-col gap-4'>
                <div className="max-w-md">
                    <TextInput 
                        ref={emailRef}
                        type="email" 
                        icon={HiMail} 
                        placeholder="name@iver.com" 
                        onChange={ onChangeEmail }
                        required 
                    />
                    { emailError.status && <span className='text-red-600 text-xs'>{ emailError.message }</span> }
                </div>
                <div className="max-w-md">
                    <TextInput 
                        ref={passwordRef} 
                        type={ isPasswordVisible ? 'text' : 'password'} 
                        icon={HiLockClosed} 
                        placeholder="Your secret secret password" 
                        onChange={ onChangePassword }
                        required
                    />
                    { passwordError.status && <span className='text-red-600 text-xs'>{ passwordError.message }</span> }
                </div>
               
                <Link className={`text-text-secondary underline underline-offset-2 ${ passwordError.status && 'animate-bounce' }`}>Forgot password?</Link>
            </section>
            <Button 
                className='w-full bg-primary'
                onClick={ handleLoginClick }
                type='submit'
            >
                Login
            </Button>
        </form>
    )
};