import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';

export const LoginPage = () => {

    const [isLoginSelected, setIsLoginSelected] = useState( true );

    const onChangeSignIn = ( val ) => {
        setIsLoginSelected( val );
    }

    return (
        <div className="container flex justify-center items-center mx-auto mt-4">
            <div className="bg-white flex flex-col justify-between items-center shadow-md gap-8 rounded-md px-8 py-16">
                <section className="flex flex-row justify-center w-full">
                    <button
                        onClick={ () => { onChangeSignIn( true ) } }
                        className={ `w-1/2 px-8 py-4 box-border transition rounded-md text-base ${ isLoginSelected ? 'bg-primary text-white' : 'border-primary border text-primary'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={ () => { onChangeSignIn( false ) } }
                        className={ `w-1/2 px-8 box-border transition rounded-md text-base ${ !isLoginSelected ? 'bg-primary text-white' : 'border-primary border text-primary'}`}
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