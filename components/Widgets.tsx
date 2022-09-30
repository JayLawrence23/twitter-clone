import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  return (
    <div className='px-2 mt-2 col-span-2 lg:inline hidden'>
        {/* Search */}
        <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2 text-gray-400'>
            <MagnifyingGlassIcon className='h-5 w-5'/>
            <input 
                className='flex-1 outline-none bg-transparent' 
                type="text" 
                placeholder='Search Twitter' 
            />

        </div>
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName="CryptoSyn_"
            options={{height: 1000}}
        />
    </div>
  )
}

export default Widgets