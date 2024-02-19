import { Button, Timeline } from "flowbite-react"
import { HiArrowNarrowRight } from "react-icons/hi"
import { ItemCard } from "../../components"
import { Link } from "react-router-dom"

export const InstructionsPage = () => {
    return (
        <div className="container p-8 w-full">
            <h1 className="text-4xl text-slate-600 ">How to use Iver ?</h1>
            <hr className="border-slate-400 "/>
            <p className="text-m text-slate-500 mt-2">Iver is a platform for buying and selling items, each item has a floor price and people can offer amounts higher than that one. Here's how to use it:</p>

            <Timeline horizontal className="mt-4">
                <Timeline.Item>
                    <Timeline.Point/>
                    <Timeline.Content>
                        <Timeline.Time>1st step</Timeline.Time>
                        <Timeline.Title>Look for any item that you'd like to offer</Timeline.Title>
                        <Timeline.Body>
                            For example:
                            <ItemCard
                                item_id={1}
                                name="GTR R35"
                                price={100000}
                                offers={[{ amount: 125000 }]}
                                ends_at="2021-09-01T00:00:00"
                                seller={{ preferences: { accepts_crypto_payments: true } }}
                            />
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                    <Timeline.Point/>
                    <Timeline.Content>
                        <Timeline.Time>2nd step</Timeline.Time>
                        <Timeline.Title>Click on "BID NOW" to go to item's page</Timeline.Title>
                        <Timeline.Body>
                            Once you're in there, offer the amount you'd like to pay and click on "BID NOW"
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>


                <Timeline.Item>
                    <Timeline.Point/>
                    <Timeline.Content>
                        <Timeline.Time>3rd step</Timeline.Time>
                        <Timeline.Title>Stay alert if someone offer more than you</Timeline.Title>
                        <Timeline.Body>
                            If a new offer is placed, you can offer a higher amount to get the item
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                    <Timeline.Point/>
                    <Timeline.Content>
                        <Timeline.Time>4th step</Timeline.Time>
                        <Timeline.Title>Once the time limit is reached</Timeline.Title>
                        <Timeline.Body>
                            The highest offer wins the item and will be notified by email to proceed with the payment
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>

            <div className="flex justify-end items-start">
                <Link to={'/'}>
                    <Button className="mt-8 bg-primary">Start now <HiArrowNarrowRight className="ml-2"/></Button>
                </Link>
            </div>
        </div>
    )
}