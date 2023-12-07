import { Dropdown, Tooltip } from "flowbite-react";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const sortOptions = [
    {
        label: 'Price',
        value: 'price'
    },
    {
        label: 'Name',
        value: 'name'
    },
    {
        label: 'Date',
        value: 'date'
    }
];

export const SortDropdown = () => {

    const [currentSort, setCurrentSort] = useState( null );
    const [isAscendant, setIsAscendant] = useState( false );

    return (
        <>
            <Dropdown label={ !currentSort ? 'Sort by' : currentSort.label }>
                { sortOptions.map( option => (
                    <Dropdown.Item 
                        key={option.value}
                        onClick={ () => setCurrentSort( option ) }
                    >
                        { option.label }
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <div 
                className='flex items-center justify-center ml-1 cursor-pointer'
                onClick={ () => setIsAscendant( !isAscendant ) }
            >
                <Tooltip content={ isAscendant ? 'Ascendant' : 'Descendant' }>
                    { isAscendant 
                            ? <FaArrowUp/> 
                            : <FaArrowDown/>
                    }
                </Tooltip>
            </div>
        </>
    )
};