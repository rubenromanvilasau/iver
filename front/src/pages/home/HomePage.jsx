import './home-page.scss';
import { Banner, ItemCard, Loading, SortDropdown } from "../../components";
import { useFetchItems } from "../../hooks";


export const HomePage = () => {

    const { items, isLoading, error } = useFetchItems();
    console.log( 'items', items)

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

        </div>
    )
}