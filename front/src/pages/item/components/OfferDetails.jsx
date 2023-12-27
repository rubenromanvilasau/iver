import { Button } from "flowbite-react";
import { convertToCurrency } from "../../../utils";
import { CountdownTimer } from "../../../components";
import { IoIosPricetag } from "react-icons/io";
import { SiLeaderprice } from "react-icons/si";
import { IoIosTime } from "react-icons/io";
import PropTypes from 'prop-types';	

export const OfferDetails = ({ item, onClickOffer, lastOffer }) => {
    return (
        <section>
        <div className='flex flex-row items-center gap-1'>
            {/* <img className='w-6' src="/icons/price.svg" alt="price icon" /> */}
            <IoIosPricetag className='text-2xl'/>
            <span className='text-l font-semibold'>Price: </span>
            <span>{ convertToCurrency( item.price ) }</span>
        </div>
        <div className='flex flex-row items-center gap-1'>
            {/* <img className='w-6' src="/icons/offer.svg" alt="offer icon" /> */}
            <SiLeaderprice className='text-2xl'/>
            <span className='text-l font-semibold'>Current offer: </span>
            <span>{ convertToCurrency( lastOffer.amount ) }</span>
        </div>
        <div className='flex flex-row items-center gap-1'>
            {/* <img className='w-6' src="/icons/offer.svg" alt="offer icon" /> */}
            <IoIosTime className='text-2xl'/>
            <span className='text-l font-semibold'>Time left: </span>
            { new Date( item.ends_at ) > new Date()
                ? ( <CountdownTimer endDate={ item.ends_at }/> )
                : ( <span className='font-light'> FINISHED</span> )
            }
        </div>
        <Button
            className='mt-4 text-white'
            onClick={ onClickOffer }
        >
            Offer
        </Button>
        </section>
    )
};

OfferDetails.propTypes = {
    item: PropTypes.object.isRequired,
    lastOffer: PropTypes.object.isRequired,
    onClickOffer: PropTypes.func.isRequired,
};