
export const ItemDetails = ({ item }) => {
    return (
        <div className="">
            <p className='my-2'>{ item.description }</p>
            <div className='flex flex-row items-center gap-1 my-2'>
                <img className='w-6' src="/icons/status.svg" alt="price icon" />
                <span className='font-semibold'>Sold by: </span>
                <span>{ item.seller.name }</span>
            </div>
            <div className='flex flex-row items-center gap-1 my-2'>
                <img className='w-6' src="/icons/status.svg" alt="price icon" />
                <span className='font-semibold'>Status: </span>
                <span>{ item.status }</span>
            </div>
            <div className='flex flex-row items-center gap-1'>
                <img className='w-6' src="/icons/truck.svg" alt="truck icon" />
                <span className='font-semibold'>Delivery mode: </span>
                <span>{ item.shipping_way }</span>
            </div>
        </div>
    )
};