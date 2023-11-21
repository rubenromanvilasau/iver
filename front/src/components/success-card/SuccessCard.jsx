import { useNavigate } from 'react-router-dom';
import './success-card.scss';
import PropTypes from 'prop-types';

export const SuccessCard = ({ title, message, link, buttonText }) => {

    const navigate = useNavigate();

    const onClickButton = () => {
        navigate( link );    
    }

    return (
        <div className='success-container'>
            <div className="top">
                <img src="icons/check.svg" alt="check icon" />
                <h1>{ title }</h1>

            </div>
            <div className="bottom">
                <p>{ message }</p>
                <button
                    onClick={ onClickButton }
                >
                    { buttonText }
                </button>
            </div>
        </div>
    )
};

SuccessCard.PropTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};
