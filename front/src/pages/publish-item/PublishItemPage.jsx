import './publish-item-page.scss';
// import { mockCategories } from '../../mock-data/categories';
import { useContext, useEffect, useRef, useState } from 'react';
import { createItem, getItemsCategories } from '../../services/items.service';
import { UserContext } from '../../context/UserContext';
import { Loading } from '../../components';

export const PublishItemPage = () => {

    const { user } = useContext( UserContext );

    const nameRef = useRef( null );
    const priceRef = useRef( null );
    const descriptionRef = useRef( null );
    const categoryRef = useRef( null );
    const [isLoading, setIsLoading] = useState( true );
    const [categories, setCategories] = useState([]);

    const handlePublishItem = () => {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        console.log('category',category)

        const item = {
            name,
            price,
            description,
            categoryId: 1,
            sellerId: user.rut,
            statusId: 1,
            shippingWay: 1,
        };

        // createItem( item )
        //     .catch( err => console.log( err ));

        console.log( item );
    }

    const fetchCategories = () => {
        getItemsCategories()
            .then( categories => {
                setCategories( categories );
                setIsLoading( false );
            })
            .catch( err => console.log( err ));
    }

    const onChangeCategory = (e ) => {
        console.log( e, categoryRef.current.value );
    }

    useEffect(() => {
        fetchCategories();
        return () => {
            setCategories([]);
        }
    }, [])

    if( isLoading ) return ( <Loading/> );
    
    return (
       <div className='publish-item-container'>
            {
                isLoading 
                ? <Loading/>
                : <div className="publish-card">
                    <h1>Publish your item</h1>
                    <hr/>
                    <div className="input">
                        <label htmlFor="name">Name</label>
                        <input 
                            ref={ nameRef} 
                            name='name' 
                            type="text" 
                            placeholder='Item name'
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="price">Price</label>
                        <input 
                            ref={ priceRef } 
                            name='price' 
                            type="number" 
                            placeholder='Price'
                        />
                    </div>
                    <div className="input description">
                        <label htmlFor="name">Description</label>
                        <textarea 
                            ref={ descriptionRef }
                            name='description' 
                            type="text" 
                            placeholder='Description'
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="category">Category</label>
                        <select 
                            name="category" 
                            id="category"
                            ref={ categoryRef }
                            onChange={ onChangeCategory }
                        >
                            {
                                categories.map( category => (
                                    <option 
                                        key={ category.category_id } 
                                        value={ category }
                                    >{ category.name }</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="upload-img">
                        <img src="/icons/image.svg" alt="image icon" />
                        <span>upload</span>
                    </div>
                    <button
                        className='btn-publish'
                        onClick={ handlePublishItem }
                    >Publish</button>
                </div>
            }
       </div>
    )
}