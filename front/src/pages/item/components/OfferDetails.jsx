import { Button } from "flowbite-react";
import { convertToPrice } from "../../../utils";


export const OfferDetails = ({ item, openPutOfferModal, lastOffer }) => {
    return (
        <section>
        <div className='flex flex-row items-center gap-1'>
            <img className='w-6' src="/icons/price.svg" alt="price icon" />
            <span className='text-l font-semibold'>Price: </span>
            <span className='price'>{ convertToPrice( item.price ) }</span>
        </div>
        <div className='flex flex-row items-center gap-1'>
            <img className='w-6' src="/icons/offer.svg" alt="offer icon" />
            <span className='text-l font-semibold'>Current offer: </span>
            <span className='price'>{ convertToPrice( lastOffer.amount ) }</span>
        </div>
        <div className='flex flex-row items-center gap-1'>
            <img className='w-6' src="/icons/offer.svg" alt="offer icon" />
            <span className='text-l font-semibold'>Time left: </span>
            <span className='price'>{}</span>
        </div>
        <Button
            className='mt-4 text-white'
            onClick={ openPutOfferModal }
        >
            Offer
        </Button>
        </section>
    )
};