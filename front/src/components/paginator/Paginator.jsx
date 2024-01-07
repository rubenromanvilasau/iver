import { Pagination } from 'flowbite-react';
import PropTypes from 'prop-types';

export const Paginator = ({ currentPage, totalPages, onPageChange }) => {

    return (
        <div className='flex overflow-x-auto sm:justify-center'>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </div>
    )
};

Paginator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

