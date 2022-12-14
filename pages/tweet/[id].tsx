import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next'
import TimeAgo from 'react-timeago'
import { 
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon,
    ArrowSmallLeftIcon
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Tweet } from "../../typings";
import { useState } from "react";
import { sanityClient } from "../../sanity";
import Link from 'next/link'

interface Props {
    tweet: Tweet[]
}

// export const getStaticPaths : GetStaticPaths = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)
//     const data = await res.json();
//     const tweets: Tweet[] = data.tweets;

//     const paths = tweets.map((tweet: Tweet) => {
//         return {
//             params: { id: tweet._id }
//         }
//     })

//     return {
//         paths,
//         fallback:  false
//     }
// }

export const getServerSideProps : GetServerSideProps = async (context: any) => {
    const { id } = context.params;
        
    const tweetQuery = `*[_id == $tweetId] {
        _id,
        image,
        text,
        username,
        profileImg,
        _createdAt,
    }`

    const res = await sanityClient.fetch(tweetQuery, {
        tweetId: id
    })

    return {
        props: { tweet: res }
    }

}



const Details = ({ tweet }: Props) => {

    const { data: session } = useSession();
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);

    return ( 
        <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
            <Layout> 
                <div className="col-span-8 lg:col-span-5 border-x min-h-screen overflow-scroll scrollbar-hide">
                    <div className='flex items-center justify-start mb-4 pt-5 pl-4'>
                        <Link href='/'>
                            <a>
                                <ArrowSmallLeftIcon className="h-6 w-6 mr-2 text-twitter" />
                            </a>
                        </Link>
                    
                        <h1 className='pb-0 text-x1 font-bold'>Tweet</h1>
                    
                    </div>
            
                    <div className='flex space-x-3 p-5 border-gray-100 border-y'>
                        <img className='h-10 w-10 rounded-full object-cover' src={tweet[0]?.profileImg} alt="" />

                        <div>
                            <div className='flex items-center space-x-1'>
                                <p className='mr-1 font-bold'>{tweet[0].username}</p>
                                <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet[0]?.username?.replace(/\s+/g, '').toLowerCase()}</p>
                                {/* <p className='mr-1 font-bold'>greahehr</p>
                                <p className='hidden text-sm text-gray-500 sm:inline'>@harehjererh</p> */}

                                <TimeAgo className='text-sm text-gray-500' date={tweet[0]._createdAt} />
                            </div>

                            <p className='pt-1'>{tweet[0].text}</p>

                            { tweet[0].image && (
                                <img src={tweet[0].image} alt="" className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' 
                            />)}

                            <div className='flex justify-between mt-5 text-gray-500 lg:space-x-20'>
                                <div 
                                    onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
                                    className='flex cursor-pointer items-center space-x-3'
                                >
                                    <ChatBubbleOvalLeftIcon className='h-5 w-5' />
                                </div>
                                <div className='flex cursor-pointer items-center space-x-3'>
                                    <ArrowPathRoundedSquareIcon className='h-5 w-5' />
                                </div>
                                <div className='flex cursor-pointer items-center space-x-3'>
                                    <HeartIcon className='h-5 w-5' />
                                </div>
                                <div className='flex cursor-pointer items-center space-x-3'>
                                    <ArrowUpTrayIcon className='h-5 w-5' />
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                </div>
            </Layout>
        </div>
     );
}
 
export default Details;
