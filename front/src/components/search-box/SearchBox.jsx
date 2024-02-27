import { useState } from 'react';
import './search-box.scss';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";

export const SearchBox = () => {
    const navigate = useNavigate();

    const [words, setWords] = useState( '' );

    const onClickSearch = () => {
        event.preventDefault();
        if( !words ) return;
                
        navigate(`/search/${ words }`);
    }

    const onChangeSearch = ( e ) => {
        setWords( e.target.value );
    }

    return (
        <div className='relative w-full shadow-md '>
            <form action="">
                <input 
                    onChange={ onChangeSearch }
                    className='pl-4 w-full rounded-md shadow-md text-black border-none focus:outline-none focus:shadow-xl placeholder:text-slate-500' 
                    type="search" 
                    placeholder="I'm looking for..."
                />
                <button
                    type='submit'
                    className='bg-transparent absolute right-3 left-auto top-1/2 transform -translate-y-1/2 cursor-pointer'
                    onClick={ onClickSearch }
                >
                    <IoSearchSharp size={ 24 } className='text-slate-500'/>
                </button>
            </form>
        </div>
    )
};