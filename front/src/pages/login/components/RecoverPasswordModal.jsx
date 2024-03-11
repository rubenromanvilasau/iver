import { Button, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { UserService } from '../../../services';
import { showErrorToast, showSuccessToast } from '../../../utils';
const userService = new UserService();

export const RecoverPasswordModal = ({ isModalOpen, onClose, }) => {
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef(null);

    const onClickAccept = () => {
        setIsLoading( true );
        const email = emailRef.current.value;

        userService.recoverPassword(email)
            .then( () => {
                onClose();
                setIsLoading( false  );
                showSuccessToast('We have sent you an email with instructions to recover your password');
            })
            .catch( err => {
                setIsLoading( false  );
                showErrorToast('There was an error sending the email. Please try again later');
                console.log('[RECOVER-PASSWORD MODAL] ERROR, ', err.response.data);
            });
    }

    return (
        <Modal show={isModalOpen} onClose={onClose} dismissible>
            <Modal.Header><h1 className='text-slate-600'>Do you want to recover your password? No problem!</h1></Modal.Header>
            <Modal.Body>
                <p className='text-slate-400'>We&apos;ll send you an email with instructions to create a new password</p>
                <div className='mt-4'>
                    <Label htmlFor='email'>Your email</Label>
                    <TextInput ref={emailRef} id='email' type="email" placeholder="Enter your email" />
                </div>
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>
                <Button color='gray' onClick={onClose}>Cancel</Button>
                <Button isProcessing={isLoading} className='bg-primary' onClick={onClickAccept}>Send me the email</Button>
            </Modal.Footer>
        </Modal>
    )
};

RecoverPasswordModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}