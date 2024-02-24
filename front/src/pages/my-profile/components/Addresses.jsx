import { Modal } from "flowbite-react"
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { NewAddressModal } from "../../../components";
import UserService from "../../../services/user.service";
import { UserContext } from "../../../context/UserContext";
const userService = new UserService();

export const Addresses = () => {
    const { user } = useContext( UserContext );
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [addresses, setAddresses] = useState([]);

    const getUserAddresses = async() => {
        const addresses = await userService.getAddresses( user?.rut )
                            .catch( err => console.error( err ));
        console.log('addresses', addresses.data);
        setAddresses( addresses.data );
    }
    useEffect(() => {
        getUserAddresses();
    },[])
    
    return (
        <div className="rounded-md bg-slate-200 p-4 transition-all ease-in duration-300 mt-4 md:mt-0">
            <div className="border-2 text-slate-400 rounded-md border-slate-400 flex gap-2 p-4">
                <span>Av Jorge Alessandri Rodriguez 19320</span>
                <MdEdit size={20} className="text-primary cursor-pointer"/>
            </div>

            <div className="flex justify-end">
                <button 
                    className="flex mt-4 items-center gap-1 text-slate-500 cursor-pointer right-0 hover:text-slate-700 hover:underline"
                    onClick={() => setIsModalOpen( true )}
                >
                    <span>New Address</span>
                    <FaPlus/>
                </button>
            </div>

        <NewAddressModal
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen( false )}
        />
        </div>
    )
}
