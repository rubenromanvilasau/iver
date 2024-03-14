import { Button, Dropdown, Label, Modal, TextInput } from "flowbite-react"
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from "react";
import UserService from "../../services/user.service";
import { showErrorToast, showSuccessToast } from "../../utils";
import { UserContext } from "../../context/UserContext";
const userService = new UserService();

export const NewAddressModal = ({ isModalOpen, onClose, isEditing = false, address }) => {

    const { user } = useContext( UserContext );

    const streetRef = useRef( null );
    const numberRef = useRef( null );
    const aditionalInstructionsRef = useRef( null );
    const [city, setCity] = useState(null);
    const [comuna, setComuna] = useState(null);

    const [error, setError] = useState({ status: false, message: ''});

    console.log('isEditing', isEditing);
    console.log('address', address);

    const onSubmit = async() => {
        const street = streetRef.current.value;
        const number = numberRef.current.value;
        const aditionalInstructions = aditionalInstructionsRef.current.value;

        if( !street || !number || !comuna || !city ) {
            setError({ status: true, message: 'Please fill al fields'});
        }

        const data = {
            user_id: user.rut,
            street, 
            number, 
            comuna: comuna, 
            city: city,
            aditional_instructions: aditionalInstructions,
        };

        const res = !isEditing
                        ?  await userService.addAddress( data )
                                .catch( err => {
                                    console.log('[NewAddressModal] addAddress ERROR ', err);
                                    showErrorToast(`We couldn't add you address, please try again`);
                                })
                        : await userService.updateAddress( address.id, data )
                                .catch( err => {
                                    console.log('[NewAddressModal] updateAddress ERROR ', err);
                                    showErrorToast(`We couldn't update you address, please try again`);
                                });

        if( res ) {
            isEditing 
                ? showSuccessToast('Your address was updated successfully')
                : showSuccessToast('Your address was updated successfully');
            onClose( true );
        }
    }

    useEffect(() => {
        if( isEditing && address && numberRef.current && streetRef.current && aditionalInstructionsRef.current ) {
            console.log('isedeiting', isEditing)
            console.log('address', address);
            aditionalInstructionsRef.current.value = address.aditional_instructions;
            numberRef.current.value = address.number;
            streetRef.current.value = address.street;
            setCity(address.city);
            setComuna(address.comuna);
        }
    },[numberRef, streetRef, aditionalInstructionsRef]);

    return (
        <Modal show={isModalOpen} onClose={() => onClose(false)} size='md' popup dismissible>
            <Modal.Header className="text-2xl font-bold text-slate-500">
                { !isEditing ? 'New address' : 'Edit address'}
            </Modal.Header>
            <Modal.Body>
                <form action=''>
                    <div>
                        <Label
                            className="font-semibold text-slate-600"
                            htmlFor="address"
                        >
                            Street <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                            id="street"
                            placeholder="Ej: Lomas de mirasur"
                            ref={streetRef}
                        />
                    </div>

                    <div className="mt-4">
                        <Label
                            className="font-semibold text-slate-600"
                            htmlFor="number"
                        >
                            Street number <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                            id="number"
                            placeholder="Ej: 19320"
                            ref={numberRef}
                        />
                    </div>

                    <div className="mt-4">
                        <Label
                            className="font-semibold text-slate-600"
                            htmlFor="city"
                        >
                            City <span className="text-red-600">*</span>
                        </Label>
                        <Dropdown
                            id="city"
                            label={city || 'Ej: Santiago'}
                            placeholder="Ej: Santiago"
                            name="city"
                        >
                            <Dropdown.Item 
                                value={city}
                                onClick={() => setCity('Santiago')}
                            >
                                Santiago
                            </Dropdown.Item>
                            <Dropdown.Item 
                                onClick={() => setCity('Concepción')}
                                value={'Concepción'}
                            >
                                Concepción
                            </Dropdown.Item>
                        </Dropdown>
                    </div>

                    <div className="mt-4">
                        <Label
                            className="font-semibold text-slate-600"
                            htmlFor="comuna"
                        >
                            Comuna <span className="text-red-600">*</span>
                        </Label>
                        <Dropdown
                            id="comuna"
                            label={comuna || 'Ej: San Bernardo'}
                            placeholder="Ej: San Bernardo"
                            name="comuna"
                        >
                            <Dropdown.Item 
                                onClick={() => setComuna('San Bernardo')}
                            >
                                San Bernardo
                            </Dropdown.Item>
                            <Dropdown.Item 
                                onClick={() => setCity('Las Condes')}
                            >
                                Las Condes
                            </Dropdown.Item>
                        </Dropdown>
                    </div>

                    <div className="mt-4">
                        <Label
                            className="font-semibold text-slate-600"
                            htmlFor="instructions"
                        >
                            Additional instructions
                        </Label>
                        <TextInput
                            required
                            id="instructions"
                            placeholder="Ej: leave at front door"
                            ref={aditionalInstructionsRef}
                        />
                    </div>
                </form>
                { error.status && <span>{ error.message }</span>}
            </Modal.Body>
            
            <Modal.Footer className="flex justify-end">
                <Button color="gray" className="font-semibold" onClick={() => onClose(false)}>Cancelar</Button>
                <Button onClick={onSubmit} type="button" className="bg-primary font-semibold">{ !isEditing ? 'Agregar' : 'Actualizar'}</Button>
            </Modal.Footer>
        </Modal>
    )
};

NewAddressModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isEditing: PropTypes.bool,
    address: PropTypes.object,
};
