import { useContext, useRef, useState } from 'react';
import './login-page.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const LoginPage = () => {

    const { handleLogin } = useContext( UserContext );
    const [isLoginSelected, setIsLoginSelected] = useState( true );
    const passwordRef = useRef( null );
    const emailRef = useRef( null );

    const onChangeSignIn = ( val ) => {
        setIsLoginSelected( val );
    }

    const handleLoginClick = () => {
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        handleLogin( email, password );
    }

    return (
        <div className="container">
            <div className="card">
                <section className="switch">
                    <button
                        onClick={ () => { onChangeSignIn( true ) } }
                        className={ `${ isLoginSelected && 'selected'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={ () => { onChangeSignIn( false ) } }
                        className={ `${ !isLoginSelected && 'selected'}`}
                        style={{ marginLeft: '-6px'}}
                    >
                        Sign up
                    </button>
                </section>
                {
                    isLoginSelected 
                    ? (
                        <>
                        <section className='inputs'>
                            <input 
                                type="email" 
                                placeholder='Email'
                                ref={ emailRef }
                            />
                            <div className="input-wrapper">
                                <input 
                                    type="password" 
                                    className="input" 
                                    placeholder="Password" 
                                    data-lpignore="true"
                                    ref={ passwordRef }
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="input-icon password" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <Link>Forgot password?</Link>
                        </section>
                        <button 
                            className='btn-login'
                            onClick={ handleLoginClick }
                        >Login</button>
                        </>
                    )
                    :
                    <>
                        <section className='inputs'>
                            <input 
                                type="text" 
                                placeholder='Email'
                                ref={ emailRef }
                            />
                            <div className="input-wrapper">
                                <input 
                                    type="password" 
                                    className="input" 
                                    placeholder="Password" 
                                    data-lpignore="true"
                                    ref={ passwordRef }
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="input-icon password" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </section>
                        <button 
                            className='btn-login'
                        >Register</button>
                    </>
                }
            </div>
        </div>
    )
}