import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { dateToText } from "../../utils";

const notifications = [
    {
        id: 1,
        text: 'Pablo ofertó por tu item: Funko',
        created_at: new Date().setHours( new Date().getHours() - 1 ),
        itemId: 6,
    }

];

export const Notifications = () => {
    return (
        <>
            <Dropdown 
                label={<><img className='w-8 bg-none' src="/icons/notification.svg" alt="notification icon"/></>}
                arrowIcon={false}
                inline
            >
                <Dropdown.Header>
                    <span className="block text-sm text-gray font-semibold">All notifications</span>
                </Dropdown.Header>
                { notifications.map( notification => (
                    <Dropdown.Item key={notification.id}>
                        <Link to={'/item/6'}>
                            <div className="w-full">
                                <span className="block text-sm">{ notification.text }</span>
                                <span className="block text-xs text-right">{ dateToText( notification.created_at ) }</span>
                            </div>
                        </Link>
                    </Dropdown.Item>
                ))}
            </Dropdown>    
            { notifications.length > 0 &&
                <span className="relative flex h-3 w-3 top-3 right-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            }
        </>
    )
}