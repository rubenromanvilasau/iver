import { Link } from "react-router-dom"
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { convertToCurrency } from "../../utils";
import { CountdownTimer } from "../countdown-timer/CountdownTimer";
import PropTypes from 'prop-types';

export const ItemCard = ({ item_id, name, price, offers, ends_at, seller, images }) => {
    return (
        <div className="bg-white w-72 rounded-md transition-all ease-in duration-200 p-6 hover:transition-none">
            <img src={images[0] ? `http://localhost:4000/${images[0].image_url}`: '/img/gtr.jpeg'} className="w-full rounded-md h-36 object-contain" alt={name + ' image'}/>
            <h5 className="font-bold text-text-primary text-xl mt-2 capitalize overflow-hidden whitespace-nowrap truncate" title={name}>{name}</h5>
            
            <div className="mt-2">
                <div className="flex flex-row items-center gap-1">
                    <p className="text-slate-600 text-sm font-bold">Floor price:</p>
                    <p className="text-slate-500 text-sm font-semibold">{convertToCurrency(price)}</p>
                </div>

                { seller.preferences?.accepts_crypto_payments
                    && (
                        <div className="flex flex-row gap-1 items-center mt-4">
                            <FaBitcoin title="BTC" className="text-orange-400 text-xl"/>
                            <FaEthereum title="ETH" className="text-slate-500 text-xl"/>
                        </div>
                )}
                
                <div className="border-b-2 mt-2 border-slate-100"></div>
                <p className="text-primary text-base font-semibold mt-4">HIGHEST BID: <span className="text-slate-500 text-base underline">{convertToCurrency(offers[0]?.amount ?? 0)}</span></p>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div className="bg-slate-400 rounded-xl p-2 text-slate-100 text-sm font-semibold">
                        <CountdownTimer
                            endDate={ends_at}
                        />
                    </div>
                    <Link to={`item/${item_id}`}><div className=""><span className="text-slate-100 text- font-semibold p-2 rounded-xl transition-all ease-in duration-200 bg-primary hover:bg-slate-200 hover:text-primary border-2">BID NOW</span></div></Link>
                </div>

            </div>
        </div>
    )
};

ItemCard.propTypes = {
    item_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.array,
    price: PropTypes.number.isRequired,
    offers: PropTypes.array.isRequired,
    ends_at: PropTypes.string.isRequired,
    seller: PropTypes.object,
}