import { Button, Card, Timeline } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import { convertToCurrency, dateToText } from '../../utils';
import { CryptoPaymentConfirmModal } from './components/CryptoPaymentConfirmModal';
import { OrderService } from '../../services';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { Loading } from '../../components';
const orderService = new OrderService();

const steps = [
    {
        title: 'Choose payment method',
        // description: 'Choose the payment method you want to use to pay for the item'
        description: "proceed with payment to be the owner of <a href={`http://localhost:5173/item/${checkout.offer.item.item_id}`} rel='noreferrer' target='_blank' className='underline underline-offset-2 text-primary capitalize'>{checkout.offer.item.name}</a>"
    },
    {
        title: 'Payment',
        description: 'Proceed with the payment'
    },
    {
        title: 'Item delivery',
        description: 'Wait for the item to be delivered'
    },
    {
        title: 'Final step',
        description: 'Depending on item&apos;s shipping method contact your item&apos;s seller to clear any detail',
    }
];

// TODO WE HAVE TO VALIDATE USER IS LOGGED, AND IF CHECKOUT ID EXISTS AND BELONGS TO USER ORDER.
export const CheckoutPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { user } = useContext( UserContext );

    const [currentStep, setCurrentStep] = useState(0);
    const [isCryptoPaymentModalOpen, setIsCryptoPaymentModalOpen] = useState( false );
    const [checkout, setCheckout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const changeStep = ( stepNumber ) => {
        if( stepNumber > steps.length ) return;

        setCurrentStep( stepNumber );
    }

    const getCheckout = async() => {
        const res = await orderService.getById( id )
                        .catch( err => {
                            console.log('[CHECKOUTPAGE] ERROR ', err);
                            return;
                        });
        if(res) {
            console.log('checkout', res);
            if( res.offer.user_id !== user.user_id ) navigate('/404');
            if( res.is_payed ) navigate('/404');

            setCheckout( res );
            setIsLoading( false );
        }else{
            navigate('/404');
        }
    }

    const makePayment = async() => {
        console.log('making payment');
        const res = await orderService.update( checkout.order_id, { is_payed: true } )
                        .catch( err => {
                            console.log('[CHECKOUTPAGE] ERROR ', err);
                            return;
                        });

        if( res ) {
            console.log('RES', res);
            changeStep( currentStep + 1 );
        }
    }

    const onCloseCryptoModal = ( isAccepted ) => {
        if( isAccepted ) {
            changeStep(1);
            setIsCryptoPaymentModalOpen( false );
        }else{
            setIsCryptoPaymentModalOpen( false );
        }
    }

    useEffect( () => {
        getCheckout();
    }, []);

    return (
        <div className='container p-4 mx-auto py-8 flex flex-col gap-8'>
            { isLoading 
                ? <div className='w-full h-full flex items-center justify-center'> <Loading/></div>
                : <>
                    <div>
                        <h1 className='text-2xl md:text-4xl text-slate-600'>Hi <span className='text-primary font-bold'>{ user?.name || 'user' }</span> you&apos;re <span className='text-primary'>1</span> click away from your item!</h1>
                        <span className='text-slate-400'>proceed with payment to be the owner of <a href={`http://localhost:5173/item/${checkout.offer.item.item_id}`} rel='noreferrer' target='_blank' className='underline underline-offset-2 text-primary capitalize'>{checkout.offer.item.name}</a></span>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center md:justify-normal w-full">
                        <div className="bg-slate-50 rounded-lg flex flex-col gap-4 p-4 w-52 h-fit">
                            <h2 className='text-slate-600 font-bold uppercase text-xl'>{ checkout.offer.item.name }</h2>
                            <hr />
                            <img src="/img/gtr.jpeg" className='w-full h-auto rounded-sm' alt="" />
                            <hr />
                            <div className="flex items-center justify-between">
                                <span className='text-xs font-bold uppercase text-slate-700'>Quantity:</span>
                                <span className='text-xs font-bold text-slate-700' >x 1</span>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between">
                                <span className='text-m font-bold uppercase text-slate-700'>Total:</span>
                                <span className='text-m font-bold text-slate-700' >{ convertToCurrency( checkout.offer.amount ) }</span>
                            </div>
                        </div>

                        <div className="flex flex-col grow md:gap-4">
                            <Timeline horizontal className='mt-8 mx-auto justify-around md:w-full'>
                                { steps.map( (step, index) => (
                                    <Timeline.Item key={index}>
                                        <Timeline.Point 
                                            className={`${index < currentStep && index !== 0 && 'cursor-pointer' } ${index === currentStep && 'animate-pulse'}`} icon={ index === currentStep ? FaCircle : index < currentStep ? FaCircleCheck : null }
                                            onClick={index < currentStep && index !== 0 ? () => changeStep(index) : null}
                                            />
                                        <Timeline.Content>
                                            <Timeline.Time>{step.title}</Timeline.Time>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                ))}
                            </Timeline>

                            {/* STEP 0: Payment method */}
                            { currentStep === 0 && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 ">
                                    <h2 className='text-xl text-slate-700'>Choose your payment method</h2>
                                    <Button 
                                        className='bg-primary w-64'
                                        // onClick={() => changeStep(currentStep + 1)}
                                        onClick={makePayment}
                                    >
                                        <SiMercadopago 
                                            className='text-2xl mr-2'
                                        /> 
                                        Mercadopago
                                    </Button>

                                    <Button 
                                        className='bg-primary w-64' 
                                        style={ {backgroundColor: '#f6851a'} }
                                        onClick={ () => setIsCryptoPaymentModalOpen( true ) }
                                        // onClick={() => changeStep(currentStep + 1)}
                                    >
                                        <><img width={25} src="/icons/metamask.svg" alt="" className='mr-2'/></>
                                        Metamask
                                    </Button>
                                </div>
                            )}

                            {/* STEP 1: Payment status */}
                            { currentStep === 1 && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 ">
                                    <div className='bg-green-400 rounded-lg p-4 flex flex-col justify-center items-center'>
                                        <h2 className='text-xl text-white'>Payment received successfully</h2>
                                        <img src="/icons/check.svg" alt="Check icon" width={150} />
                                    </div>
                                    <Button 
                                        className='bg-primary w-72' 
                                        onClick={ () => changeStep(currentStep+1) }
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}

                            {/* STEP 2: Payment method */}
                            { currentStep === 2 && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 ">
                                    <Card className='md:w-1/2 w-11/12'>
                                        <h2 className='text-xl text-slate-600 font-bold'>Delivery method</h2>
                                        <p className='text-slate-500'>Your item has the following delivery option:</p>
                                        <p className='text-slate-400'>- {checkout.offer.item.shippingWay.name}</p>
                                        <p className='text-slate-500'>seller&apos;s information will be given to you in <span className='underline underline-offset-2'>next step</span>, so you can get in touch with him and resolve any doubt you could have</p>
                                    </Card>
                                    <Button 
                                        className='bg-primary w-72' 
                                        onClick={ () => changeStep(currentStep+1) }
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}

                            {/* STEP 3: Final step, seller's info */}
                            { currentStep === 3 && (
                                <div className='flex flex-col bg-slate-50 rounded-lg pl-4 pr-4 pt-4 pb-8 h-fit w-full'>
                                    <h2 className='text-xl uppercase font-semibold text-slate-600'>Sold by</h2>
                                    <hr className="border-slate-200"/>
                                    <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
                                        <img src="/img/man.jpg" className='rounded-full w-20 h-20 object-cover' alt="avatar" />
                                        <div className="flex flex-col">
                                            <p className='font-semibold text-lg text-slate-500 '>{checkout.offer.item.seller.name}</p>
                                            <p className="font-light text-slate-400 text-xs">@{checkout.offer.item.username}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <span className="text-slate-600">Joined: </span>
                                        <span className="text-slate-500 text-sm">{dateToText(checkout.offer.item.created_at)}</span>
                                    </div>
                                    {/* <p className="text-slate-400 text-xs">{`It's his 4 item on sale`}</p> */}
                                    <div>
                                    </div>
                                </div>    
                            )}
                        </div>
                    </div>

                    <CryptoPaymentConfirmModal
                        isModalOpen={isCryptoPaymentModalOpen}
                        onClose={onCloseCryptoModal}
                    />
                </>
                

            }
           
        </div>
    )
};