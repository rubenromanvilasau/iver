import { dateToText } from "../../../utils"
import PropTypes from 'prop-types';

export const SellerInfoCard = ( { seller } ) => {
    return (
        <div className='flex flex-col bg-slate-50 rounded-lg pl-4 pr-4 pt-4 pb-8 h-fit w-full'>
            <h2 className='text-xl uppercase font-semibold text-slate-600'>Sold by</h2>
            <hr className="border-slate-200"/>
            <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
                <img src="/img/man.jpg" className='rounded-full w-20 h-20 object-cover' alt="avatar" />
                <div className="flex flex-col">
                    <p className='font-semibold text-lg text-slate-500 '>{seller.name}</p>
                    <p className="font-light text-slate-400 text-xs">@{seller.username}</p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <span className="text-slate-600">Joined: </span>
                <span className="text-slate-500 text-sm">{dateToText(seller.created_on)}</span>
            </div>
            {/* <p className="text-slate-400 text-xs">{`It's his 4 item on sale`}</p> */}
            <div>
            </div>
        </div>    
    )
};

SellerInfoCard.propTypes = {
    seller: PropTypes.object.isRequired,
};
