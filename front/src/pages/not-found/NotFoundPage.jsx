
export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-primary text-4xl font-bold uppercase"><span className="text-slate-500 capitalize">Seems like you got lost in</span> space</h1>
            <img className='w-96 h-96 animation-rotate transition duration-1000 ' src="/img/astronaut.png" alt="astronaut image" />
            <h2 className="text-slate-500 font-bold text-xl">404 Not found!</h2>
        </div>
    )
};
