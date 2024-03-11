import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { Button, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed, HiEye } from 'react-icons/hi';
import { RecoverPasswordModal } from './RecoverPasswordModal';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState( false );

    const { handleLogin } = useContext( UserContext );
    const passwordRef = useRef( null );
    const emailRef = useRef( null );
    const [emailError, setEmailError] = useState({ status: false, message: ''});
    const [passwordError, setPasswordError] = useState({ status: false, message: ''});
    const [showRecoverPasswordModal, setShowRecoverPasswordModal] = useState( false );
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = async() => {
        setIsLoading( true );
        event.preventDefault();
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        
        if( !email  ) {
            setEmailError({ status: true, message: 'Please fill your email'});
            setIsLoading( false );
            return;
        }

        if( !password ) {
            setPasswordError({ status: true, message: 'Please fill your password'});
            setIsLoading( false );
            return;
        }
        
        handleLogin( email, password )
            .then( () => {
                navigate('/');
                setIsLoading( false );
            })
            .catch( err => {
                console.log('error LOGIN', err.message);
                setIsLoading( false );
                if( err.status === 404 ) {
                    setEmailError({ status: true, message: 'There is no account with that email' });
                    setIsLoading( false );
                }else {
                    setPasswordError({ status: true, message: 'Incorrect password. Please try again' });
                    setIsLoading( false );
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
        <>
            <form className='w-80'>
                <section className='flex flex-col gap-4'>
                    <div className="w-full">
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
                    <div className="w-full">
                        <TextInput 
                            ref={passwordRef} 
                            type={ isPasswordVisible ? 'text' : 'password'} 
                            icon={HiLockClosed} 
                            placeholder="Your secret secret password" 
                            onChange={ onChangePassword }
                            required
                        ></TextInput>
                        { passwordError.status && <span className='text-red-600 text-xs'>{ passwordError.message }</span> }
                    </div>
                
                    <Link 
                        className={`text-text-secondary underline underline-offset-2 mb-2 ${ passwordError.status && 'animate-bounce' }`}
                        onClick={ () => { setShowRecoverPasswordModal( true ) }}
                    >
                        Forgot password?
                    </Link>
                </section>
                <Button 
                    className='w-full bg-primary'
                    onClick={ handleLoginClick }
                    type='submit'
                    ispRocessing={ isLoading }
                >
                    Login
                </Button>
            </form>
            <RecoverPasswordModal
                isModalOpen={ showRecoverPasswordModal }
                onClose={ () => setShowRecoverPasswordModal( false ) }
            />
        </>
    )
};