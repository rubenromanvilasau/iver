import { Button, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';

export const RecoverPasswordModal = ({ isModalOpen, onClose}) => {
    return (
        <Modal show={isModalOpen} onClose={onClose} dismissible>
            <Modal.Header><h1 className='text-slate-600'>Do you want to recover your password? No problem!</h1></Modal.Header>
            <Modal.Body>
                <p className='text-slate-400'>We&apos;ll send you an email with instructions to create a new password</p>
                <div className='mt-4'>
                    <Label htmlFor='email'>Your email</Label>
                    <TextInput id='email' type="email" placeholder="Enter your email" />
                </div>
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>
                <Button color='gray' onClick={onClose}>Cancel</Button>
                <Button className='bg-primary' onClick={onClose}>Send me the email</Button>
            </Modal.Footer>
        </Modal>
    )
};

RecoverPasswordModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}