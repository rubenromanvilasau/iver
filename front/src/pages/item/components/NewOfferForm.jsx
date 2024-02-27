import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import ItemService from '../../../services/item.service';
import { UserContext } from '../../../context/UserContext';
import { showErrorToast, showSuccessToast } from '../../../utils/toasts';
import PropTypes from 'prop-types';
import { convertToCurrency } from '../../../utils';
const itemService = new ItemService();

export const NewOfferForm = ({ openModal, onClose, itemId, minAmount = 0}) => {
    
    const { user } = useContext( UserContext );
    const [amount, setAmount] = useState('');
    const [currentStep, setCurrentStep] = useState( 0 );
    const [isLoading, setIsLoading] = useState( false );
    const [error, setError] = useState({ status: false, message: ''});

    const createOffer = () => {
        setIsLoading( true );
        if( !user.token ) {
            showErrorToast('You must be logged in to make an offer');
            return;
        }

        if( amount > minAmount ) {
            itemService.createOffer( itemId, { amount: amount, userId: user.rut  } )
                .then( response => {
                    setIsLoading( false );
                    console.log('offer created', response);
                    showSuccessToast(`You offered ${ amount } successfully`);
                    onClose();
                })
                .catch( err => {
                    console.error('Error creating offer:', err.data.message);
                    setIsLoading( false );
                });
        }else{
            setError({ status: true, message: `Amount must be greater than last offer ${convertToCurrency(minAmount)}.`})
        }
    };
    
    const onChangeAmount = ( event ) => {
        const newAmount = Number( event.target.value );
        setError({ status: false, message: ''});

        if( newAmount <= minAmount ) {
            setError({ status: true, message: `Amount must be greater than last offer ${convertToCurrency(minAmount)}.`})
        }
        
        setAmount( newAmount );
    }

    useEffect(() => {
    
        return () => {
            setAmount('');
            setCurrentStep( 0 );
        }
    },[])

    return (
        <Modal show={openModal} onClose={onClose} size='md' popup>

            { currentStep === 0 &&
                <>
                    <Modal.Header>Terms of Service</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.
                            </p>
                            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                            </p> */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setCurrentStep(1)}>I accept</Button>
                        <Button color="gray" onClick={onClose}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </>
            }

            { currentStep === 1 &&
                <>
                    <Modal.Header/>
                    <Modal.Body>
                        <div className='space-y-6'>
                            <div>
                                <h3 className='text-xl font-medium text-gray-900'>Offer an amount for item</h3>
                            </div>
                            <div className="block">
                                <Label htmlFor="amount" value="Amount" />
                            </div>
                            <TextInput
                                id="amount"
                                type='number'
                                placeholder={convertToCurrency(minAmount)}
                                onChange={onChangeAmount}
                                disabled={isLoading}
                                required
                            />
                            { error.status === true && <span className='text-red-500 text-sm'>{ error.message }</span>}
                            <Button 
                                onClick={createOffer}
                                isProcessing={isLoading}
                            >
                                Offer
                            </Button>
                        </div>
                    </Modal.Body>
                </>
            }
        </Modal>
    )
};

NewOfferForm.propTypes = {
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    itemId: PropTypes.number.isRequired,
    minAmount: PropTypes.number,
}