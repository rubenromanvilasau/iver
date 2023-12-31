import { useEffect } from 'react';
import { OrdersService } from '../../services';
import { convertToCurrency } from '../../utils';
import { Button, Table } from 'flowbite-react';
const ordersService = new OrdersService();


export const MyOrdersPage = () => {

    useEffect( () => {
        ordersService.getAll()
            .then( response => console.log( response ) )
            .catch( err => console.log( err.data ) );
    },[]);

    return (
        <div className="flex flex-col p-8 box-border">
            <h1 className='text-4xl font-bold text-text-primary'>My Orders</h1>
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
                        <span className='text-base font-bold text-text-secondary'>Date</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>Status</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='text-base font-bold text-text-secondary'>Total</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell >
                            <span className='font-bold'># {1}</span>
                        </Table.Cell>
                        <Table.Cell>
                            1
                        </Table.Cell>
                        <Table.Cell>
                            1
                        </Table.Cell>
                        <Table.Cell>
                            1
                        </Table.Cell>
                        <Table.Cell>
                            {convertToCurrency( 1 )}
                        </Table.Cell>
                        <Table.Cell>
                            <Button>
                                View
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>
            </div>
        </div>
    )
}