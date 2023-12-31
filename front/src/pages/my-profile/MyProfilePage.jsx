import { Label, TextInput } from "flowbite-react";
import { MdEdit } from "react-icons/md";

export const MyProfilePage = () => {
    return (
        <div className='container md:pl-40 pt-8 pb-8'>
            <h1 className='text-4xl'>My profile</h1>
            <div className='flex row gap-8'>
                <img className='w-40 rounded-full h-fit' src="/img/astronaut.png" alt="" />
                {/* <div className='flex row flex-wrap gap-4'> */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='h-fit'>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your name" />
                        </div>
                        <div className='flex items-center gap-2'>
                            <TextInput 
                                id="email1" 
                                type="email" 
                                placeholder="name@flowbite.com" 
                                disabled
                            />
                            <button className='bg-transparent'>
                                <MdEdit size={24}/>
                            </button>
                        </div>
                    </div>
                    <div  className='h-fit'>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your last name" />
                        </div>
                        <div className='flex items-center gap-2'>
                            <TextInput 
                                id="email1" 
                                type="email" 
                                placeholder="name@flowbite.com" 
                                disabled
                            />
                            <button className='bg-transparent'>
                                <MdEdit size={24}/>
                            </button>
                        </div>
                    </div>   
                    <div  className='h-fit'>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <div className='flex items-center gap-2'>
                            <TextInput 
                                id="email1" 
                                type="email" 
                                placeholder="name@flowbite.com" 
                                disabled
                            />
                            <button className='bg-transparent'>
                                <MdEdit size={24}/>
                            </button>
                        </div>
                    </div>   
                    <div  className='h-fit'>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your username" />
                        </div>
                        <div className='flex items-center gap-2'>
                            <TextInput 
                                id="email1" 
                                type="email" 
                                placeholder="name@flowbite.com" 
                                disabled
                            />
                            <button className='bg-transparent'>
                                <MdEdit size={24}/>
                            </button>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    )
};