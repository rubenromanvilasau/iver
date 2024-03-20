import { useEffect, useState } from 'react';
import { OrderService } from '../../services';
import { convertToCurrency, dateToText } from '../../utils';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
const orderService = new OrderService();

import { isAfter } from 'date-fns';
export const MyOrdersPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect( () => {
        orderService.getAll()
            .then( response => {
                console.log( 'ORDERS ',response );
                setOrders( response );
            } )
            .catch( err => console.log( err.data ) );
    },[]);

    return (
        <div className="flex flex-col p-8 box-border w-full">
            <h1 className='text-4xl text-slate-600'>My Orders</h1>
            <div className="overflow-x-auto my-4">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>
                            <span className='text-base font-bold text-text-secondary'>Order</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className='text-base font-bold text-text-secondary'>Item</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className='text-base font-bold text-text-secondary'>Expiration date</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className='text-base font-bold text-text-secondary'>Status</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className='text-base font-bold text-text-secondary'>Total</span>
                        </Table.HeadCell>

                    </Table.Head>
                    <Table.Body>
                        { orders.map( ({ order_id, expires_at, is_payed, offer, checkout_id}) => (
                            <Table.Row key={order_id}>
                                <Table.Cell >
                                    <span className='font-bold'>#{order_id}</span>
                                </Table.Cell>
                                <Table.Cell className='capitalize'>
                                    { offer.item.name}
                                </Table.Cell>
                                <Table.Cell>
                                    { dateToText(expires_at) }
                                </Table.Cell>
                                <Table.Cell>
                                    <div className={`${is_payed ? 'bg-green-400' : (isAfter(expires_at, new Date()) ? 'bg-orange-400' : 'bg-red-600')} text-xs md:text-md py-2 px-1 uppercase font-semibold rounded-md text-center text-white`}>{ is_payed ? 'Paid' : (isAfter(expires_at, new Date()) ? 'Pending' : 'NOT PAID')}</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className='font-bold text-lg capitalize'>{convertToCurrency( offer.amount )}</span>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link replace to={`../item/${offer.item.item_id}`}>
                                        <Button className='uppercase font-semibold'>
                                            Item
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                { isAfter(expires_at, new Date()) && 
                                    <Link replace to={`../checkout/${checkout_id}`}>
                                        <Button className='uppercase font-semibold bg-primary'>
                                            Order
                                        </Button>
                                    </Link>
                                }
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}