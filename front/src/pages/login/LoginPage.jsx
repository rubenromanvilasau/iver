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
        <div className="container flex justify-center items-center mx-auto mt-4">
            <div className="bg-white flex flex-col justify-around items-center shadow-md gap-4 rounded-md px-4 py-16">
                <section className="flex flex-row justify-center">
                    <button
                        onClick={ () => { onChangeSignIn( true ) } }
                        className={ `w-1/2 px-8 py-4 box-border transition rounded-md text-base off ${ isLoginSelected ? 'bg-primary' : 'off'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={ () => { onChangeSignIn( false ) } }
                        className={ `w-1/2 px-8 box-border transition rounded-md text-base ${ !isLoginSelected ? 'bg-primary' : 'off'}`}
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