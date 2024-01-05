import './home-page.scss';
import { Banner, ItemCard, Loading, Paginator, SortDropdown } from "../../components";
import { useFetchItems } from "../../hooks";
import { useEffect, useState } from 'react';

const sortOptions = [
    {
        label: 'Price',
        value: 'price'
    },
    {
        label: 'Name',
        value: 'name'
    },
    {
        label: 'Date',
        value: 'ends_at'
    },
];

export const HomePage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState( '' );
    const { items, isLoading } = useFetchItems({ pageNumber: currentPage, filter, });
    const [currentSortOption, setCurrentSortOption] = useState( null );
    const [isAscendant, setIsAscendant] = useState( false );


    const onChangeDirection = ( isAscendant ) => { setIsAscendant( isAscendant ) };
    const onChangeSort = ( sortOption ) => { setCurrentSortOption( sortOption ) };
    const onPageChange = ( pageNumber ) => setCurrentPage( pageNumber );

    useEffect(() => {
        if( !currentSortOption ) return;

        const newFilter = `?page=${currentPage}&orderBy=${currentSortOption.value}&direction=${isAscendant ? 'asc' : 'desc'}`;

        setFilter( newFilter );
    }, [isAscendant, currentSortOption])


    

    if( isLoading ) {
        return <Loading/>
    }

    return (
        <div className='container mx-auto gap-4 p-4'>
            <div className='flex content-center w-full overflow-hidden'>
                <Banner/>
            </div>
            <div className='w-full flex justify-end mt-4'>
                <SortDropdown
                    sortOptions={ sortOptions }
                    currentSort={ currentSortOption }
                    isAscendant={ isAscendant }
                    onChangeSort={ onChangeSort }
                    onChangeDirection={ onChangeDirection }
                />
            </div>
            <section className='mt-2 flex flex-row justify-center md:justify-start items-center flex-wrap gap-4 w-full'>
                { isLoading 
                    ? <Loading/> 
                    : items.map( item => <ItemCard key={ item.item_id } {...item}/> )
                }
            </section>
            <div className='mt-4'>
                <Paginator
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}