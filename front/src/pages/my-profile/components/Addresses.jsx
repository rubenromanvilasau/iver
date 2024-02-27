import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa"
import { MdDelete, MdEdit } from "react-icons/md"
import { NewAddressModal } from "../../../components";
import UserService from "../../../services/user.service";
import { UserContext } from "../../../context/UserContext";
import { showErrorToast, showSuccessToast } from "../../../utils";
const userService = new UserService();

export const Addresses = () => {
    const { user } = useContext( UserContext );
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [addresses, setAddresses] = useState([]);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [currentEditingAddress, setCurrentEditingAddress] = useState(null);

    const getUserAddresses = async() => {
        const addresses = await userService.getAddresses( user?.rut )
                            .catch( err => console.error( err ));
        console.log('addresses', addresses.data);
        setAddresses( addresses.data );
    }

    const onClickDelete = async( id ) => {
        const res = await userService.deleteAddress( id, user.rut )
                        .catch( err => {
                            console.log('[ADDRESSES PAGE] onClickDelete ERROR ', err);
                            showErrorToast('There has been an error while deleting your address, please try again')
                        });

        
        if( res ) {
            showSuccessToast('Address deleted successfully');
            getUserAddresses();
        }
        
    }

    const onClickEdit = async(address) => {
        setCurrentEditingAddress( address );
        setIsEditingAddress( true );
        setIsModalOpen( true );
    }

    const onCloseModal = ( accepted ) => {
        if( accepted ){
            setIsModalOpen( false );
            setIsEditingAddress( false );
            setCurrentEditingAddress( null );
            getUserAddresses();
        }else{
            setIsModalOpen( false );
            setCurrentEditingAddress( null );
            setIsEditingAddress( false );
        }
    }

    useEffect(() => {
        getUserAddresses();
    },[])
    
    return (
        <div className="rounded-md bg-slate-200 p-4 transition-all ease-in duration-300 mt-4 md:mt-0">
            {   addresses.map( address => (
                <div 
                    key={address.id} 
                    className="border-2 text-slate-400 rounded-md border-slate-400 flex justify-between gap-2 p-4 mt-2"
                >
                    <span className="capitalize">{`${address.street} ${address.number}, ${address.comuna}, ${address.city}`}</span>
                    <div className="flex"> 
                        <MdEdit 
                            size={20} 
                            className="text-primary cursor-pointer hover:scale-105"
                            onClick={() => onClickEdit(address)}    
                        />
                        <MdDelete 
                            size={20} 
                            className="text-red-400 cursor-pointer hover:text-red-600 hover:scale-105"
                            onClick={() => onClickDelete(address.id)}
                            />
                    </div>
                </div>
            ))}

            <div className="flex justify-end">
                <button 
                    className="flex mt-4 items-center gap-1 text-slate-500 cursor-pointer right-0 hover:text-slate-700 hover:underline hover:underline-offset-2"
                    onClick={() => setIsModalOpen( true )}
                >
                    <span>New Address</span>
                    <FaPlus/>
                </button>
            </div>

        <NewAddressModal
            isModalOpen={isModalOpen}
            onClose={onCloseModal}
            isEditing={isEditingAddress}
            address={ isEditingAddress ? currentEditingAddress : null }
        />
        </div>
    )
}
