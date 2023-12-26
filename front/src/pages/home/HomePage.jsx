import './home-page.scss';
import { Banner, ItemCard, Loading, Paginator, SortDropdown } from "../../components";
import { useFetchItems } from "../../hooks";
import { useEffect, useState } from 'react';

export const HomePage = () => {

    const { items, isLoading, error } = useFetchItems();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    console.log( 'items', items);

    const onPageChange = ( pageNumber ) => setCurrentPage( pageNumber );

    useEffect(() => {
    
    
    }, [currentPage])
    

    if( isLoading ) {
        return <Loading/>
    }

    return (
        <div className='container mx-auto gap-4 p-4'>
            <div className='flex content-center w-full'>
                <Banner/>
            </div>
            <div className='w-full flex justify-end mt-4'>
                <SortDropdown/>
            </div>
            <section className='mt-2 flex flex-row content-center flex-wrap gap-4 w-11/12'>
                {
                    isLoading 
                        ? <Loading/> 
                        : items.map( item => <ItemCard key={ item.item_id } {...item}/> )
                }
            </section>
            <div className='mt-4'>
                <Paginator
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}