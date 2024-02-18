import { Button, Table } from "flowbite-react"
import { convertToCurrency, formatDate } from "../../../utils"
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ItemsTable = ({ items }) => {
    
    return (
        <div className="overflow-x-auto my-4">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>#</span>
                    </Table.HeadCell>

                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>Name</span>
                    </Table.HeadCell>

                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>Floor price</span>
                    </Table.HeadCell>

                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>Last Offer</span>
                    </Table.HeadCell>

                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>Date</span>
                    </Table.HeadCell>

                </Table.Head>
                <Table.Body>
                    { items?.map( (item, i) => (
                        <Table.Row key={item.item_id}>
                            <Table.Cell >
                                <span className='font-bold'>#{i}</span>
                            </Table.Cell>
                            
                            <Table.Cell>
                                <span>{ item.name }</span>
                            </Table.Cell>
                            
                            <Table.Cell>
                                <span>{ convertToCurrency( item.price ) }</span>
                            </Table.Cell>
                            
                            <Table.Cell>
                                <span className="text-primary font-semibold">{ convertToCurrency( item.offers[0]?.amount ?? 0 ) }</span>
                            </Table.Cell>
                            
                            <Table.Cell>
                                <span>{ formatDate( item.created_at ) }</span>
                            </Table.Cell>
                            
                            <Table.Cell>
                                <Link to={`/item/${item.item_id}`}>
                                    <Button className="uppercase font-semibold">
                                        View
                                    </Button>
                                </Link>
                            </Table.Cell>
                        
                        </Table.Row>
                    )) }
                </Table.Body>
            </Table>
        </div>
    )
};

ItemsTable.propTypes = {
    items: PropTypes.array,
}
