import { useState } from 'react';
import './login-page.scss';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';

export const LoginPage = () => {

    const [isLoginSelected, setIsLoginSelected] = useState( true );

    const onChangeSignIn = ( val ) => {
        setIsLoginSelected( val );
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-around items-center shadow-md gap-4 rounded-md w-auto px-4 py-16">
                <section className="flex flex-row justify-center">
                    <button
                        onClick={ () => { onChangeSignIn( true ) } }
                        className={ `w-1/2 px-8 py-4 box-border transition rounded-md text-base ${ isLoginSelected && 'selected'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={ () => { onChangeSignIn( false ) } }
                        className={ `w-1/2 px-8 box-border transition rounded-md text-base ${ !isLoginSelected && 'selected'}`}
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