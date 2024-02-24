import { Button, Modal } from "flowbite-react";
import { FaExclamation } from "react-icons/fa";
import PropTypes from 'prop-types';

export const CryptoPaymentConfirmModal = ({ isModalOpen ,onClose}) => {
    return (
        <Modal show={isModalOpen} onClose={onClose}>
            <Modal.Header>
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary p-2">
                        <FaExclamation className="text-slate-50" size={20}/>
                    </div>
                    <h1>Crypto payments important information</h1>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    By clicking button <b>I accept</b> this conditions you accept that you are transferring crypto currency throught metamask, and that we as <b>Iver</b> can not get that money back in case that you interfer with the payment to the wallet that seller has set
                    </p>
                </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-end">
                <Button >I accept</Button>
                <Button color="gray" onClick={onClose}>
                    Decline
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

CryptoPaymentConfirmModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};