import { useEffect, useState } from "react"
import CategoryService from  '../../services/category.service';
const categoryService = new CategoryService();
import PropTypes from 'prop-types';

export const CategoriesCard = ({ onChangeCategory }) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState( null );

    const fetchCategories = () => {
        categoryService.getAll().then( (res) => {
            console.log('res', res);
            setCategories( res );
        });
    }

    const onClickCategory = ( category ) => {
        onChangeCategory( category );
        setSelectedCategory( category );
    }

    useEffect( () => {
        fetchCategories();
    }, []);

    return (
        <div className="bg-white rounded-md p-4 h-full">
            <ul className="h-fit">
                { categories.map( category => (
                    <li 
                        key={ category.category_id } 
                        className={`cursor-pointer hover:text-slate-900 hover:underline transition-all ease-in duration-200 ${selectedCategory?.category_id === category.category_id ? 'text-slate-900 font-bold underline' : 'text-slate-600'}`}
                        onClick={ () => onClickCategory(category) }
                    >
                        { category.name }
                    </li>
                ))}
                {/* <li 
                    className="text-text-primary"
                >
                    Cars
                    <ul className="ml-4">
                        <li className="text-text-secondary cursor-pointer">Mercedes</li>
                        <li className="text-text-secondary cursor-pointer">BMW</li>
                        <li className="text-text-secondary cursor-pointer">Peugeot</li>
                    </ul>
                </li> */}
            </ul>
        </div>
    )
};

CategoriesCard.propTypes = {
    onChangeCategory: PropTypes.func,
}