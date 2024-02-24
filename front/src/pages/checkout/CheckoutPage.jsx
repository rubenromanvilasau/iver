import { Button, Timeline } from 'flowbite-react'
import { useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import { convertToCurrency } from '../../utils';
import { CryptoPaymentConfirmModal } from './components/CryptoPaymentConfirmModal';

const steps = [
    {
        title: 'Choose payment method',
        description: 'Choose the payment method you want to use to pay for the item'
    },
    {
        title: 'Payment',
        description: 'Proceed with the payment'
    },
    {
        title: 'Item delivery',
        description: 'Wait for the item to be delivered'
    }
];

export const CheckoutPage = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [isCryptoPaymentModalOpen, setIsCryptoPaymentModalOpen] = useState( false );

    const changeStep = ( stepNumber ) => {
        if( stepNumber > steps.length ) return;

        setCurrentStep( stepNumber );
    }

    return (
        <div className='container p-4 mx-auto py-8 flex flex-col gap-8'>
            <div>
                <h1 className='text-2xl md:text-4xl text-slate-600'>Hi <span className='text-primary font-bold'>User</span> you&apos;re <span className='text-primary'>1</span> click away from your item!</h1>
                <span className='text-slate-400'>proceed with payment to be the owner of <a href='http://localhost:3000/item/1' rel='noreferrer' target='_blank' className='underline underline-offset-2 text-primary'>ITEM</a></span>
            </div>
            <div className="flex flex-row flex-wrap justify-center md:justify-normal w-full">
                <div className="bg-slate-50 rounded-lg flex flex-col gap-4 p-4 w-52 h-fit">
                    <h2 className='text-slate-600 font-bold uppercase text-xl'>Nissan GTR</h2>
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
                        <span className='text-m font-bold text-slate-700' >{ convertToCurrency( 13500 ) }</span>
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
                                onClick={() => changeStep(currentStep + 1)}
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
                </div>
            </div>

            <CryptoPaymentConfirmModal
                isModalOpen={isCryptoPaymentModalOpen}
                onClose={() => setIsCryptoPaymentModalOpen( false )}
            />
           
        </div>
    )
};