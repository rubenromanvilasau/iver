import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const SearchResultsPage = () => {
    let { query } = useParams();

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log('searchParams', searchParams);
    
      return () => {
      }
    }, [searchParams])
    
    return (
        <div className="container mx-auto mt-4">
        <h1 className="text-2xl text-text-primary">Results for: <span className="text-text-secondary text-xl">{ query }</span></h1>
            <ul>
                <li>
                    
                </li>
            </ul>
        </div>
    )
};