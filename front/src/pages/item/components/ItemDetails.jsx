import { FaRegUser, FaCrown } from "react-icons/fa";
import PropTypes from 'prop-types';
import { MdOutlineNewReleases } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { convertToCurrency } from "../../../utils";
import { CountdownTimer } from "../../../components";
import { BsCurrencyDollar } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const ItemDetails = ({ item , onClickNewOffer, lastOffer }) => {
    const { user } = useContext( UserContext );
    
    return (
        <div className="">
            <div className='flex flex-row items-center gap-1 my-2'>
                <FaRegUser className='text-3xl text-primary'/>
                <span className='font-semibold text-slate-600'>Sold by: </span>
                <span className="text-slate-500">{ item.seller.name }</span>
            </div>
            <div className='flex flex-row items-center gap-1 my-2'>
                <MdOutlineNewReleases className="text-3xl text-primary" />
                <span className='font-semibold text-slate-600'>Status: </span>
                <span className="text-slate-500">{ item.status.name }</span>
            </div>
            <div className='flex flex-row items-center gap-1 my-2'>
                <TbTruckDelivery className="text-3xl text-primary"/>
                <span className='font-semibold text-slate-600'>Delivery mode: </span>
                <span className="text-slate-500">{ item.shippingWay.name }</span>
            </div>

            <div className='flex flex-row items-center gap-1 my-2'>
                <BsCurrencyDollar className="text-3xl text-primary"/>
                <span className='font-semibold text-slate-600'>Floor price: </span>
                <span className="text-slate-500">{ convertToCurrency(item.price) }</span>
            </div>

            <hr className="border-slate-300"/>
            <div className='flex flex-row items-center gap-1 mt-8'>
                <FaCrown className="text-3xl text-primary"/>
                <span className='font-semibold text-primary uppercase text-xl whitespace-nowrap'>Highest bid: </span>
                <span className="text-slate-500 text-3xl whitespace-nowrap">{ convertToCurrency(lastOffer.amount ?? '$0') }</span>
            </div>
            <div className="flex flex-row justify-between items-end mt-4">
                <div className='bg-slate-400 h-11 w-fit rounded-xl pl-4 pr-4 pb-2 pt-2 uppercase mt-4'>
                    <CountdownTimer
                        endDate={ item.ends_at }
                    />
                </div>
                <button
                    className=' bg-yellow-400 transition-all ease-in duration-200 text-white text-md h-fit font-extrabold uppercase hover:bg-transparent border-yellow-400 border-2 hover:text-yellow-400 rounded-lg px-4 py-2'
                    onClick={ onClickNewOffer }
                    // disabled={ !user?.token || user.rut === item.seller_id  || new Date( item.ends_at ) < new Date() }
                >
                    Offer
                </button>
            </div>
        </div>
    )
};

ItemDetails.propTypes = {
    item: PropTypes.object.isRequired,
    onClickNewOffer: PropTypes.func.isRequired,
    lastOffer: PropTypes.object.isRequired,
};