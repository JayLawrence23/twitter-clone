import React, { useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
    tweets: Tweet[]
}
  
function Feed({ tweets: tweetsProp }: Props) {

    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

    const handleRefresh = async () => {
        const refreshToast = toast.loading('Refreshing...');

        const tweets = await fetchTweets();
        setTweets(tweets);

        toast.success('Feed Updated!', {
            id: refreshToast
        })
    }


  return (
    <div className='col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide'>
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-x1 font-bold'>Home</h1>
            <ArrowPathIcon onClick={handleRefresh} className='h-6 w-6 cursor-pointer text-twitter
            transition-all duration-500 ease-out hover:rotate-180 active:scale-125 m-2' />
        </div>
        {/*Tweetbox */}
        <div>
            <TweetBox setTweets={setTweets}/>
        </div>

        <div>
            { tweets.map(tweet => (
                <TweetComponent key={tweet._id} tweet={tweet}/>
            )  
            )}
        </div>
    </div> 
  )
}

export default Feed