import { FaRegUser, FaCrown } from "react-icons/fa";
import PropTypes from 'prop-types';
import { MdOutlineNewReleases } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { convertToCurrency } from "../../../utils";
import { CountdownTimer } from "../../../components";
import { BsCurrencyDollar } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Button } from "flowbite-react";

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
                <span className="text-slate-500 text-3xl whitespace-nowrap">{ convertToCurrency(lastOffer ?? '$0') }</span>
            </div>
            <div className="flex flex-row justify-between mt-4">
                <div className='bg-slate-400 w-fit rounded-xl pl-4 pr-4 pb-2 pt-2 uppercase mt-4'>
                    <CountdownTimer
                        endDate={ item.ends_at }
                    />
                </div>
                <Button
                    className=' ml-16 bg-yellow-400 transition-all ease-in duration-200 text-white font-extrabold uppercase hover:bg-yellow-500 rounded-lg'
                    onClick={ onClickNewOffer }
                    disabled={ !user.token || user.rut === item.seller_id  || new Date( item.ends_at ) < new Date() }
                >
                    Offer
                </Button>
            </div>
        </div>
    )
};

ItemDetails.propTypes = {
    item: PropTypes.object.isRequired,
};