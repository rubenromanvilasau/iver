import './error-card.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ErrorCard = ({ title, message, link, buttonText }) => {

    const navigate = useNavigate();

    const onClickButton = () => {
        navigate( link );    
    }

    return (
        <div className='success-container'>
            <div className="top">
                <img src="icons/red-cross.svg" alt="sucess icon" />
                <h1>{ title }</h1>

            </div>
            <div className="bottom">
                <p>{ message }</p>
                { buttonText 
                    &&
                    <button
                        onClick={ onClickButton }
                    >
                        { buttonText }
                    </button> 
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
