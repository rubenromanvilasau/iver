import { Banner, ItemCard, Loading } from "../../components";
import './home-page.scss';
import { useFetchItems } from "../../hooks";

export const HomePage = () => {

    const { items, isLoading, error } = useFetchItems();
    console.log( 'items', items)

    return (
        <div className="container gap-4 p-4">
            <div className="flex content-center w-full">
                <Banner/>
            </div>
            <section className="mt-2 flex flex-row content-center flex-wrap gap-4 w-11/12">
                {
                    isLoading 
                        ? <Loading/> 
                        : items.map( item => <ItemCard key={ item.item_id } {...item}/> )
                }
            </section>
        </div>
    )
}