import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import ItemService from '../../../services/items.service';
import { UserContext } from '../../../context/UserContext';
import { showErrorToast, showSuccessToast } from '../../../utils/toasts';
const itemService = new ItemService();

export const NewOfferForm = ({ openModal, onClose, itemId }) => {
    
    const { user } = useContext( UserContext );
    const [amount, setAmount] = useState('');
    const [currentStep, setCurrentStep] = useState( 0 );
    const [isLoading, setIsLoading] = useState( false );

    const createOffer = () => {
        setIsLoading( true );
        if( !user.token ) {
            showErrorToast('You must be logged in to make an offer');
            return;
        }

        if( amount > 0 ) {
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
        }
    };

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
                                placeholder="$1.500"
                                value={amount}
                                onChange={(event) => setAmount( Number( event.target.value ) )}
                                disabled={isLoading}
                                required
                            />
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