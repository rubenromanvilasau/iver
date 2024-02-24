import { Button, Label, Modal, Select, TextInput } from "flowbite-react"
import PropTypes from 'prop-types';

export const NewAddressModal = ({ isModalOpen, onClose }) => {
    return (
        <Modal show={isModalOpen} onClose={onClose} size='md' popup>
            <Modal.Header>
                <h2 className="text-2xl font-bold text-slate-500">New address</h2>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="address"
                    >
                        Street
                    </Label>
                    <TextInput
                        id="street"
                        placeholder="Ej: Lomas de mirasur"
                    />
                </div>

                <div className="mt-4">
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="number"
                    >
                        Street number
                    </Label>
                    <TextInput
                        id="number"
                        placeholder="Ej: 19320"
                    />
                </div>

                <div className="mt-4">
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="city"
                    >
                        City
                    </Label>
                    <Select
                        id="city"
                        placeholder="Ej: Santiago"
                    >
                        <option value="">Santiago</option>
                        <option value="">Concepción</option>
                    </Select>
                </div>

                <div className="mt-4">
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="comuna"
                    >
                        Comuna
                    </Label>
                    <Select
                        id="comuna"
                        placeholder="Ej: San Bernardo"
                    >
                        <option value="">San Bernardo</option>
                        <option value="">Las Condes</option>
                    </Select>
                </div>

                <div className="mt-4">
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="instructions"
                    >
                        Additional instructions
                    </Label>
                    <TextInput
                        id="instructions"
                        placeholder="Ej: leave at front door"
                    />
                </div>

            </Modal.Body>
            
            <Modal.Footer className="flex justify-end">
                <Button color="gray" className="font-semibold" onClick={onClose}>Cancelar</Button>
                <Button className="bg-primary font-semibold">Agregar</Button>
            </Modal.Footer>
        </Modal>
    )
};

NewAddressModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
