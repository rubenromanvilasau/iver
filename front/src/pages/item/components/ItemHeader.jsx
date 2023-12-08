
export const ItemHeader = ({ item, viewersAmount }) => {
    return (
        <div className='flex flex-col gap-2 justify-between'>
            <div className="title">
                <h1 className='text-3xl text-text-primary'>{ item.name }</h1>
                <div className="flex items-center">
                    <img className='w-6' src="/icons/eye.svg" alt="eye icon" />
                    <span className='text-sm text-text-secondary'>{ viewersAmount } people watching this right now</span>
                </div>
            </div>
        </div>
    )
}