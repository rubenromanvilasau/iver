import { useContext, useRef } from 'react';
import '../login-page.scss';
import { register } from '../../../services/users.service';
import { UserContext } from '../../../context/UserContext';
import { Button } from 'flowbite-react';
// import { useNavigate } from 'react-router-dom';

export const SignUpForm = () => {

    const passwordRef = useRef( null );
    const emailRef = useRef( null );
    const rutRef = useRef( null );
    const cellphoneRef = useRef( null );
    const nameRef = useRef( null );
    const lastNameRef = useRef( null );
    const usernameRef = useRef( null );

    // const [registerSuccess, setRegisterSuccess] = useState( null );

    const { handleLogin } = useContext( UserContext );

    // const navigate = useNavigate();

    const handleRegisterClick = async () => {
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const rut = rutRef.current.value;
        const cellphone = cellphoneRef.current.value;
        const name = nameRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        
        //TODO SHOW ERRORS
        if( !email || !password || !rut || !cellphone || !name || !lastName || !username ) return;
        
        const response = await register( { email, password, rut, cellphone, name, lastName, username } );
        if( response.status === 409 ) {
            console.log('response', response);
            // TODO SHOW ERROR
            return;
        }else {
            //TODO HANDLE REGISTER SUCCESS
            handleLogin( email, password );
            // navigate('/login');
        }
    }

    return (
        <>
            <section className='flex flex-col gap-4 w-3/5'>
                <input 
                    type="text" 
                    className='w-full h-12 rounded-md box-border pl-1 text-sm'
                    placeholder='Name'
                    ref={ nameRef }
                    required
                />
                <input 
                    type="text" 
                    className='w-full h-12 rounded-md box-border pl-1 text-sm'
                    placeholder='Last name'
                    ref={ lastNameRef }
                    required
                />
                <input 
                    type="text"
                    className='w-full h-12 rounded-md box-border pl-1 text-sm' 
                    placeholder='RUT'
                    ref={ rutRef }
                    required
                />
                <input 
                    type="tel" 
                    className='w-full h-12 rounded-md box-border pl-1 text-sm'
                    placeholder='Phone number'
                    ref={ cellphoneRef }
                    required
                />
                <input 
                    type="text"
                    className='w-full h-12 rounded-md box-border pl-1 text-sm' 
                    placeholder='Username'
                    ref={ usernameRef }
                    required
                />
                <input 
                    type="text"
                    className='w-full h-12 rounded-md box-border pl-1 text-sm' 
                    placeholder='Email'
                    ref={ emailRef }
                    required
                />
                <div className="input-wrapper">
                    <input 
                        type="password" 
                        className='w-full h-12 rounded-md box-border pl-1 text-sm'
                        placeholder="Password" 
                        data-lpignore="true"
                        ref={ passwordRef }
                        required
                    />
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="input-icon password" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </section>
            <Button 
                onClick={ handleRegisterClick }
            >
                Register
            </Button>
        </>
    )
};
