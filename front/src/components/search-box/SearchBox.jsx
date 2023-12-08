import { useState } from 'react';
import './search-box.scss';
import { useNavigate } from 'react-router-dom';


export const SearchBox = () => {
    const navigate = useNavigate();
    
    const [words, setWords] = useState( '' );

    const onClickSearch = () => {
        if( !words ) return;
        navigate(`/search/${ words }`);
    }

    const onChangeSearch = ( e ) => {
        setWords( e.target.value );
    }

    return (
        <div className='relative w-1/5 shadow-md '>
            <input 
                onChange={ onChangeSearch }
                className='pl-4 w-full rounded-md shadow-md text-black border-none' 
                type="search" 
                placeholder="I'm looking for..."
            />
            <svg 
                onClick={ onClickSearch }
                className='fill-black absolute w-5 h-5 right-3 left-auto top-1/2 transform -translate-y-1/2 cursor-pointer' 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
            >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>
    )
};