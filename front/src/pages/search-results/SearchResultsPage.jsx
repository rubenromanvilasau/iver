import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoriesCard, CountdownTimer, Loading, Paginator } from "../../components/index";
import { useFetchItems } from "../../hooks";
import { convertToCurrency } from "../../utils/convert-to-price";

export const SearchResultsPage = () => {
    let { query } = useParams();
    const [filter, setFilter] = useState( `?keyword=${query}` );
    const [currentPage, setCurrentPage] = useState( 1 );
    const { items, isLoading, error } = useFetchItems({ pageNumber: currentPage, filter, });


    useEffect(() => {
        setFilter( `?keyword=${query}` );
    },[ query ])

    const onPageChange = ( pageNumber ) => setCurrentPage( pageNumber );

    if( isLoading ) {
        return <Loading/>
    }
    
    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl text-text-primary">Results for: <span className="text-text-secondary text-xl">{ query }</span></h1>
            <div className="flex flex-row gap-4 w-full mt-4">
                <CategoriesCard/>
                <ul className="w-full">
                    { items.map( item => 
                        ( <Link to={`/item/${item.item_id}`} key={item.item_id}>
                            <li className="bg-white rounded-md cursor-pointer " >
                                <div className="flex flex-row justify-between gap-4 p-4 box-border">
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-text-primary">{ item.name }</h2>
                                        <img className="w-48" src="/img/funko.jpg" alt="" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-text-secondary">{ item.description }</p>
                                        <p className="text-text-secondary">{ convertToCurrency( item.price ) }</p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-text-secondary">Time left:</p>
                                        <CountdownTimer
                                            endDate={item.ends_at }
                                        />
                                    </div>
                                </div>
                            </li>
                        </Link> )
                    )}
                </ul>
            </div>
            <div className="mt-4">
                <Paginator
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
};