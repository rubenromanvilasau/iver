import { Dropdown, Tooltip } from "flowbite-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import PropTypes from 'prop-types';

export const SortDropdown = ({ sortOptions, currentSort, isAscendant, onChangeSort, onChangeDirection }) => {

    return (
        <>
            <Dropdown inline className='text-text-secondary' label={ !currentSort ? 'Sort by' : currentSort.label }>
                { sortOptions.map( option => (
                    <Dropdown.Item 
                        key={option.value}
                        onClick={ () => onChangeSort( option ) }
                    >
                        { option.label }
                    </Dropdown.Item>
                ))}
            </Dropdown>
            { currentSort &&
                <div 
                    className='flex items-center justify-center ml-1 cursor-pointer'
                    onClick={ () => onChangeDirection( !isAscendant ) }
                >
                    <Tooltip content={ isAscendant ? 'Ascendant' : 'Descendant' }>
                        { isAscendant 
                            ? <FaArrowUp className="text-text-secondary"/> 
                            : <FaArrowDown className="text-text-secondary"/>
                        }
                    </Tooltip>
                </div>
            }
        </>
    )
};

SortDropdown.propTypes = {
    sortOptions: PropTypes.array.isRequired,
    currentSort: PropTypes.object,
    isAscendant: PropTypes.bool.isRequired,
    onChangeSort: PropTypes.func.isRequired,
    onChangeDirection: PropTypes.func.isRequired
};