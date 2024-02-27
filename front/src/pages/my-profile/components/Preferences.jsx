import { Checkbox, ToggleSwitch } from "flowbite-react"
import { useContext, useState } from "react"
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { UserContext } from "../../../context/UserContext";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { UserService } from "../../../services";

const userService = new UserService();

const cryptocurrencies = [
    {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: <FaBitcoin title="BTC" className="text-orange-400 text-xl"/>
    },
    {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        icon: <FaEthereum title="ETH" className="text-slate-500 text-xl"/>
    }
];

export const Preferences = () => {

    const { user } = useContext( UserContext );
    const [userPreferences, setUserPreferences] = useState({
        user_id: '',
        accepts_crypto_payment: false,
        email_notificactions: true,
    });
    const [isInfoChanged, setIsInfoChanged] = useState(false);

    //Update user accepts crypto payment preference
    const updateAcceptsCrypto = async (e) => {
        setIsInfoChanged( true );

        const acceptsCrypto = e;
        setUserPreferences({ accepts_crypto_payment: acceptsCrypto });
        await userService.updateUserPreferences( user.rut, { accepts_crypto_payments: acceptsCrypto } )
            .then( res => {
                console.log('Updated user', res);
                showSuccessToast('Your preferences has been updated succesfully!');
            
            })
            .catch( err => {
                console.log('Error updating user', err);
                showErrorToast('Error updating your preferences :(');
                return;
            })
    }

    return (
        <div className='w-fit'>
            <h2 className='text-xl text-slate-400 font-semibold mt-8 md:mt-0'>Payments</h2>
            <hr className='border-slate-400'/>
            <p className='text-slate-400 w-96'>You can accept crypto as payment method when someone buys an item from you, client will be able to pay you with normal currency or crypto</p>
            <ToggleSwitch
                className='mt-4'
                label='I want to accept crypto as payments'
                checked={userPreferences.accepts_crypto_payment}
                onChange={updateAcceptsCrypto}
            />
            {    userPreferences.accepts_crypto_payment && (
                <>
                    <h3 className='text-lg text-slate-400 mt-4'>Accepted currencies</h3>
                    <div className='rounded-md  border-2 border-slate-300 p-4'>
                        { cryptocurrencies.map( (currency, i) => (
                                <div 
                                    className="flex flex-row items-center gap-2" 
                                    key={i}
                                >
                                    <Checkbox/>
                                    <span className='text-slate-400'>{ currency.symbol }</span>  
                                    { currency.icon }
                                </div>

                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}