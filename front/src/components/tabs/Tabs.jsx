
export const Tabs = ({ tabs, onClickTab, currentTab }) => {
    return (
        <div className="flex flex-row mt-4">
            <ul className='flex flex-row items-center gap-4'>
            { tabs.map( (tab, index) => (
                <li 
                    key={index}
                    className={`rounded-lg p-4 cursor-pointer border-2 transition-all ease-linear duration-200 ${currentTab === tab ? 'border-primary bg-slate-100 text-slate-500' : 'bg-slate-100 text-slate-500'}`}
                    onClick={() => onClickTab(tab)}
                >
                    {tab}
                </li>
            ))}
            </ul>
        </div>    
    )
}
