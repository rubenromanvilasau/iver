import { Link } from "react-router-dom"
import { FaBitcoin, FaEthereum } from "react-icons/fa";


export const NewItemCard = () => {
    return (
        <div className="bg-white w-72 rounded-md cursor-pointer transition-all ease-in duration-200 p-6 hover:transition-none">
            <img src="/img/gtr.jpeg" className="w-full rounded-md h-36" alt="Funko image"/>
            <h5 className="font-bold text-text-primary text-xl mt-2">Nissan GTR</h5>
            
            <div className="mt-2">
                <div className="flex flex-row items-center gap-1">
                    <p className="text-slate-600 text-sm font-bold">Floor price:</p>
                    <p className="text-slate-500 text-sm font-semibold">$15.000</p>
                </div>
                <div className="flex flex-row gap-1 items-center mt-4">
                    <FaBitcoin title="BTC" className="text-orange-400 text-xl"/>
                    <FaEthereum title="ETH" className="text-slate-500 text-xl"/>
                </div>
                
                <div className="border-b-2 mt-2 border-slate-100"></div>
                <p className="text-primary text-base font-semibold mt-4">HIGHEST BID: <span className="text-slate-500 text-base underline">$15.500</span></p>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div className="bg-slate-400 rounded-xl p-2 text-slate-100 text-sm font-semibold">1H:2M:3S</div>
                    <Link><div className=""><span className="text-slate-500 text- font-semibold p-2 rounded-xl transition-all ease-in duration-200 hover:bg-primary hover:text-slate-100 border-2">BID NOW</span></div></Link>
                </div>

            </div>
        </div>
    )
}