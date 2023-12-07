import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchResultsPage = () => {

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log('searchParams', searchParams);
    
      return () => {
      }
    }, [searchParams])
    

    return (
        <div className="container mx-auto">
            <ul>
                <li>
                    
                </li>
            </ul>
        </div>
    )
};