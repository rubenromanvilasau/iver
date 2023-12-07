import './error-card.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

export const ErrorCard = ({ title, message, link, buttonText }) => {

    const navigate = useNavigate();

    const onClickButton = () => {
        navigate( link );    
    }

    return (
        <div className='flex flex-col items-center rounded-md shadow-md'>
            <div className="flex flex-col items-center bg-red-500 w-full rounded-t-lg p-4">
                <img className='w-36' src="icons/red-cross.svg" alt="sucess icon" />
                <h1 className='text-white'>{ title }</h1>

            </div>
            <div className="bg-white w-full p-4 rounded-b-lg flex flex-col content-center items-center">
                <p className='text-black'>{ message }</p>
                { buttonText 
                    &&
                    <Button
                    className='mt-4'
                        onClick={ onClickButton }
                    >
                        { buttonText }
                    </Button> 
                }
            </div>
        </div>
    )
};

ErrorCard.PropTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
};
