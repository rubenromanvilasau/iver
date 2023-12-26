import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CategoriesCard } from "../../components/index";
import { ItemService } from "../../services";
const itemService = new ItemService();

export const SearchResultsPage = () => {
    let { query } = useParams();

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log('searchParams', searchParams.get('keywords'	));
        // console.log('query', query);
      return () => {
      }
    }, [searchParams])
    
    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl text-text-primary">Results for: <span className="text-text-secondary text-xl">{ searchParams.get('keywords'	) }</span></h1>
            <div className="flex flex-row gap-4 w-full mt-4">
                <CategoriesCard/>
                <ul>
                    <li className="bg-white rounded-md mt-4 cursor-pointer">
                        <div className="flex flex-row justify-between gap-4 p-4 box-border">
                            <div className="flex flex-col items-center">
                                <h2 className="text-text-primary">Product name</h2>
                                <img className="w-48" src="/img/funko.jpg" alt="" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-text-secondary">Product description</p>
                                <p className="text-text-secondary">Product price</p>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-text-secondary">Time left:</p>
                                <p className="text-text-primary">1h:5m:2:s</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};