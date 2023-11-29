import './my-orders-page.scss';
import { Button, Table } from 'flowbite-react';

export const MyOrdersPage = () => {
    return (
        <div className="orders-container">
            <h1 className='text-4xl font-bold'>My Orders</h1>
            <div className="overflow-x-auto my-4">
                <Table striped>
                <Table.Head>
                    <Table.HeadCell>
                        <span className='text-base font-bold'>Order</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='text-base font-bold'>Item</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='text-base font-bold'>Date</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='text-base font-bold'>Status</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='text-base font-bold'>Total</span>
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
                            {(1).toLocaleString('es-cl', {currency: 'CLP', style: 'currency'})}
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