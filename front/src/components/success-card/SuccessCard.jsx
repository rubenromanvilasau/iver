import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

export const SuccessCard = ({ title, message, link, buttonText }) => {

    const navigate = useNavigate();

    const onClickButton = () => {
        navigate( link );    
    }

    return (
        <div className="flex flex-col items-center rounded-md shadow-md">
            <div className="flex flex-col items-center bg-green-500 w-full rounded-t-lg p-4">
                <img className="w-36" src="icons/check.svg" alt="check icon" />
                <h1 className="text-white">{ title }</h1>

            </div>
            <div className="bg-white w-full p-4 rounded-b-lg flex flex-col content-center items-center">
                <p className="text-black">{ message }</p>
                <Button
                    className='mt-4'
                    onClick={ onClickButton }
                >
                    { buttonText }
                </Button>
            </div>
        </div>
    )
};

SuccessCard.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};
