import PropTypes from 'prop-types';

export const ItemHeader = ({ item, viewersAmount }) => {
    return (
        <div className='flex flex-col gap-2 justify-between'>
            <div
        >
                <h1 className='text-3xl text-slate-600 uppercase font-semibold'>{ item.name }</h1>
                <div className="flex items-center gap-1">
                    <img className='w-6 animate-pulse' src="/icons/eye.svg" alt="eye icon" />
                    <span className='text-base text-slate-400'>{ viewersAmount } people watching this right now</span>
                </div>
            </div>
        </div>
    )
};

ItemHeader.propTypes = {
    item: PropTypes.object.isRequired,
    viewersAmount: PropTypes.number.isRequired,
}