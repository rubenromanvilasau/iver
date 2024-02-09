import { dateToText } from "../../../utils"

export const SellerInfoCard = ( { seller } ) => {
    return (
        <div className='md:w-1/5 bg-slate-50 rounded-lg pl-4 pr-4 pt-4 pb-8 h-fit'>
            <h2 className='text-xl uppercase font-semibold text-slate-600'>Sold by</h2>
            <hr className="border-slate-200"/>
            <div className="flex flex-row items-center gap-4 mt-4">
                <img src="/img/man.jpg" className='rounded-full w-20 h-20 object-cover' alt="avatar" />
                <div className="flex flex-col">
                    <p className='font-semibold text-lg text-slate-500'>{seller.name}</p>
                    <p className="font-light text-slate-400 text-xs">@{seller.username}</p>
                </div>
            </div>
            <div className="mt-4">
                <span className="text-slate-600">Joined: </span>
                <span className="text-slate-500 text-sm">{dateToText(seller.created_on)}</span>
            </div>
            <div>
            </div>
        </div>    
    )
}
