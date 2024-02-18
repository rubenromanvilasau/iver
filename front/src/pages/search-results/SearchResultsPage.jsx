import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoriesCard, CountdownTimer, ItemCard, Loading, Paginator } from "../../components/index";
import { useFetchItems } from "../../hooks";
import { convertToCurrency } from "../../utils/convert-to-price";

const pageSize = 10; //Number of pages to show in paginator

export const SearchResultsPage = () => {
    let { query } = useParams();
    const [filter, setFilter] = useState( `?keyword=${query}` );
    const [currentPage, setCurrentPage] = useState( 1 );
    const { items, isLoading } = useFetchItems({ pageNumber: currentPage, filter, });

    useEffect(() => {
        setFilter( `?keyword=${query}` );
    },[ query ])

    const onPageChange = ( pageNumber ) => setCurrentPage( pageNumber );

    const onChangeCategory = ( category ) => {
        setFilter( `?keyword=${query}&category=${category.category_id}` );
    }

    if( isLoading ) {
        return <div className='flex justify-center'><Loading/></div>
    }
    
    return (
        <div className="container p-4 mx-auto mt-4">
            <h1 className="text-2xl text-text-primary uppercase">Results for: <span className="text-text-secondary text-xl unde">{ query }</span></h1>
            <div className="flex flex-row gap-4 w-full mt-4">
                <CategoriesCard
                    onChangeCategory={onChangeCategory}
                />
                { items.data.length > 0 ? items.data.map( item => 
                    <ItemCard
                        key={item.item_id}
                        {...item}
                    />)

                    :
                    <div className="w-full flex justify-center h-full items-center">
                        <h2 className="text-slate-500 uppercase">0 results</h2>
                    </div>
                }
            </div>
            <div className="mt-4">
                <Paginator
                    currentPage={currentPage}
                    totalPages={Math.floor( items.count / pageSize )}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
};