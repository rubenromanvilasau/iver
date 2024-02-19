import { Button, Timeline } from 'flowbite-react'
import { useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";

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

    const changeStep = ( stepNumber ) => {
        if( stepNumber > steps.length ) return;

        setCurrentStep( stepNumber );
    }

    return (
        <div className='container mx-auto py-8'>
            <h1 className='text-4xl text-slate-600'>You're <span className='text-primary'>1</span> click away from your hapiness!</h1>
            <span className='text-slate-400'>Proceed with payment to be the owner of the item <span className='underline underline-offset-2 text-primary'>ITEM</span></span>
            <Timeline horizontal className='mt-8 mx-auto justify-around w-1/2'>
                { steps.map( (step, index) => (
                    <Timeline.Item key={index}>
                        <Timeline.Point 
                            className={`${index < currentStep && 'cursor-pointer' } ${index === currentStep && 'animate-pulse'}`} icon={ index === currentStep ? FaCircle : index < currentStep ? FaCircleCheck : null }
                            onClick={index < currentStep ? () => changeStep(index) : null}
                            />
                        <Timeline.Content>
                            <Timeline.Time>{step.title}</Timeline.Time>
                        </Timeline.Content>
                    </Timeline.Item>
                ))}
            </Timeline>

            {/* STEP 0: Payment method */}
            { currentStep === 0 && (
                <div className="flex flex-col justify-center items-center gap-2 mt-4">
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
                        style={{backgroundColor: '#f6851a'}}
                        onClick={() => changeStep(currentStep + 1)}
                    >
                        <><img width={25} src="/icons/metamask.svg" alt="" className='mr-2'/></>
                        Metamask
                    </Button>
                </div>
            )}
        </div>
    )
};