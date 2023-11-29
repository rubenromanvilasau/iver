import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import ItemService from '../../../services/items.service';
import { UserContext } from '../../../context/UserContext';
import { showErrorToast, showSuccessToast } from '../../../utils/toasts';
const itemService = new ItemService();

export const NewOfferForm = ({ openModal, onClose, itemId }) => {
    
    const { user } = useContext( UserContext );
    const [amount, setAmount] = useState(null);

    const createOffer = () => {
        if( !user.token ) {
            showErrorToast('You must be logged in to make an offer');
            return;
        }

        if( amount > 0 ) {
            itemService.createOffer( itemId, { amount: amount, userId: user.rut  } )
                .then( response => {
                    console.log('offer created', response);
                    showSuccessToast(`You offered ${ amount } successfully`);
                    onClose();
                })
                .catch( err => {
                    console.log('error creating offer', err);
                });
        }
    };


    return (
        <Modal show={openModal} onClose={onClose} size='md' popup>
            <Modal.Header/>
            <Modal.Body>
                <div className='space-y-6'>
                    <div>
                        <h3 className='text-xl font-medium text-gray-900'>Offer an amount for item</h3>
                    </div>
                    <div className="mb-1 block">
                        <Label htmlFor="amount" value="Amount" />
                    </div>
                    <TextInput
                        id="amount"
                        type='number'
                        placeholder="$1.500"
                        value={amount}
                        onChange={(event) => setAmount( Number( event.target.value ) )}
                        required
                    />
                    <Button onClick={createOffer}>
                        Offer
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
};