import { useFetchCategories } from "../../hooks/index";

export const CategoriesCard = () => {

    

    return (
        <div className="bg-white rounded-md p-4">
            <ul>
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
                <li className="text-text-secondary">Tech</li>
                <li className="text-text-secondary">Cars</li>
                <li className="text-text-secondary">Cars</li>
            </ul>
        </div>
    )
}