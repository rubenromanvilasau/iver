import { Dropdown } from "flowbite-react"
import { Link } from "react-router-dom"

export const Notifications = () => {
    return (
        <Dropdown 
            label={<><img className='w-8 bg-none' src="/icons/notification.svg" alt="notification icon"/></>}
            arrowIcon={false}
            inline
        >
            <Dropdown.Header>
                <span className="block text-sm text-gray font-semibold">All notifications</span>
            </Dropdown.Header>
            <Dropdown.Item>
                <Link to={'/item/6'}>
                    <div className="w-full">
                        <span className="block text-sm">{ 'Pablo ofertó por tu item' }</span>
                        <span className="block text-xs text-right">{ '5m ago'}</span>
                    </div>
                </Link>
            </Dropdown.Item>
        </Dropdown>    
    )
}