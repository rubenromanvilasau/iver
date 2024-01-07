import { useEffect, useState } from "react"
import CategoryService from  '../../services/categories.service';
const categoryService = new CategoryService();
import PropTypes from 'prop-types';

export const CategoriesCard = ({ onChangeCategory }) => {

    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        categoryService.getAll().then( (res) => {
            console.log('res', res);
            setCategories( res );
        });
    }

    useEffect( () => {
        fetchCategories();
    }, []);

    return (
        <div className="bg-white rounded-md p-4 h-fit">
            <ul>
                { categories.map( category => (
                    <li 
                        key={ category.category_id } 
                        className="text-text-primary cursor-pointer"
                        onClick={ () => onChangeCategory( category ) }
                    >
                        { category.name }
                    </li>
                ))}
                <li 
                    className="text-text-primary"
                >
                    Cars
                    <ul className="ml-4">
                        <li className="text-text-secondary cursor-pointer">Mercedes</li>
                        <li className="text-text-secondary cursor-pointer">BMW</li>
                        <li className="text-text-secondary cursor-pointer">Peugeot</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
};

CategoriesCard.propTypes = {
    onChangeCategory: PropTypes.func,
}