import { Link } from 'react-router-dom';
import './banner.scss';
import { Button } from 'flowbite-react';

export const Banner = () => {
    return (
        <section className='flex flex-col justify-center items-center w-full bg-white p-2 md:p-8 rounded-md'>
            <div className="inline-block overflow-hidden md:whitespace-nowrap mx-auto tracking-widest title">
                <h1 className='text-5xl title-text'>Where you offer what you are willing to</h1>
            </div>
            <Link className='mt-4' to={ '/publish' }>
                <Button className='bg-primary'>Start now</Button>
            </Link>
        </section>
    )
};
