import React from 'react'
import { 
    PhotoIcon,
    MagnifyingGlassCircleIcon,
    FaceSmileIcon,
    CalendarIcon,
    MapPinIcon
 } from '@heroicons/react/24/outline'

function TweetBox() {
  return (
    <div className='flex space-x-2 p-5'>
        <img className='h-14 w-14 object-cover rounded-full mt-4' src="https://links.papareact.com/gll" alt="user" />
    
        <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input 
                    className='h-24 w-full text-xl outline-none placeholder:text-xl'
                    type="text" 
                    placeholder="What's Happening?" 
                />

                <div className='flex items-center justify-between'>
                    <div className='flex space-x-2 text-twitter'>
                        <PhotoIcon className='h-5 w-5'/>
                        <MagnifyingGlassCircleIcon className='h-5 w-5'/>
                        <FaceSmileIcon className='h-5 w-5'/>
                        <CalendarIcon className='h-5 w-5'/>
                        <MapPinIcon className='h-5 w-5'/>
                    </div>

                    <button className='bg-twitter px-5 py-2 font-bold text-white rounded-full'>Tweet</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TweetBox