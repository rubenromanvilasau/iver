import { Pagination } from 'flowbite-react';

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
}