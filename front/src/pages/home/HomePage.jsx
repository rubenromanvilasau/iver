import { Banner, ItemCard, Loading } from "../../components";
import './home-page.scss';
import { useFetchItems } from "../../hooks";

export const HomePage = () => {

    const { items, isLoading, error } = useFetchItems();
    console.log( 'items', items)

    return (
        <div className="container">
            <div className="banner-container">
                <Banner/>
            </div>
            <section id="items">
                {
                    isLoading 
                        ? <Loading/> 
                        : items.map( item => <ItemCard key={ item.item_id } {...item}/> )
                }
            </section>
        </div>
    )
}