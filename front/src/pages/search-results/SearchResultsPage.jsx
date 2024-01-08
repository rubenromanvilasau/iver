import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoriesCard, CountdownTimer, Loading, Paginator } from "../../components/index";
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
            <h1 className="text-2xl text-text-primary">Results for: <span className="text-text-secondary text-xl">{ query }</span></h1>
            <div className="flex flex-row gap-4 w-full mt-4">
                <CategoriesCard
                    onChangeCategory={onChangeCategory}
                />
                <ul className="w-full">
                    { items.data.map( item => 
                        ( <Link to={`/item/${item.item_id}`} key={item.item_id}>
                            <li className="bg-white rounded-md cursor-pointer mt-4" >
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
                    totalPages={Math.floor( items.count / pageSize )}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
};