import { useState } from 'react';
import './login-page.scss';
import { LoginForm } from './components/login-form/LoginForm';
import { SignUpForm } from './components/sign-up-form/SignUpForm';

export const LoginPage = () => {

    const [isLoginSelected, setIsLoginSelected] = useState( true );

    const onChangeSignIn = ( val ) => {
        setIsLoginSelected( val );
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
                    ? 
                        <LoginForm/>
                    :
                        <SignUpForm/>
                }
            </div>
        </div>
    )
}