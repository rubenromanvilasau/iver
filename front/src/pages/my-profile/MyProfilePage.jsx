import { Label, TextInput } from "flowbite-react";

export const MyProfilePage = () => {
    return (
        <div className='container p-4'>
            <h1 className='text-4xl'>My profile</h1>
            <div className='flex row'>
                <img className='w-80 rounded-full' src="/img/astronaut.png" alt="" />
                <div className='flex row flex-wrap'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
                    </div>                
                </div>
            </div>
        </div>
    )
};