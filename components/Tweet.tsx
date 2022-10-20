import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import { 
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Props {
    tweet: Tweet
}

function Tweet({ tweet }: Props) {

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    
    const { data: session } = useSession();

    const picArr = new Array();
    picArr[0] = "https://pbs.twimg.com/profile_images/1565569734954741761/BmvRYV3M_400x400.jpg";
    picArr[1] = "https://pbs.twimg.com/media/Fe_RRtFX0AAbGy7?format=jpg&name=4096x4096";
    picArr[2] = "https://pbs.twimg.com/profile_images/1564837922058240000/cPXMOMNj_400x400.jpg";
    picArr[3] = "https://pbs.twimg.com/profile_images/1562670743778893824/-qKakTfc_400x400.jpg";
    picArr[4] = "https://pbs.twimg.com/profile_images/1570687235682361346/33cQhkiZ_400x400.jpg";
    picArr[5] = "https://pbs.twimg.com/profile_images/1564278063633797120/KzzwMt66_400x400.jpg";
    picArr[6] = "https://pbs.twimg.com/profile_images/1564280861821833216/6x6vnvmu_400x400.jpg";
    picArr[7] = "https://pbs.twimg.com/profile_images/1583041088079613952/5uuOH53i_400x400.jpg";
    picArr[8] = "https://pbs.twimg.com/profile_images/1560949537820348417/z-6DUGc__400x400.jpg";
    
    const namesArr = ['Thrown➕','frisk➕','KRISSΞH➕','laffy➕','Andi➕','noisewar➕','NFDoggo➕','End➕','Adventure.KPR➕']
   
    let index = Math.floor(9*Math.random())

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id);
        setComments(comments);
    }

    useEffect(() => {
        refreshComments();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentToast = toast.loading('Posting Comment...')

         // Comment logic
        const comment: CommentBody = {
            comment: input,
            tweetId: tweet._id,
            username: session?.user?.name || namesArr[index],
            profileImg: session?.user?.image || picArr[index],
        }

        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(comment),
            method: 'POST',
        })

        toast.success('Comment Posted!', {
          id: commentToast,
        })
    
        setInput('')
        setCommentBoxVisible(false)
        refreshComments()
    }
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100 cursor-pointer hover:bg-gray-50'>
         
            <div className='flex space-x-3'>
                <img className='h-10 w-10 rounded-full object-cover' src={tweet.profileImg} alt="" />

                <div>
                <Link href={`/tweet/${tweet._id}`}>
                    <div>
                        <div className='flex items-center space-x-1'>
                            <p className='mr-1 font-bold'>{tweet.username}</p>
                            <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()}</p>

                            <TimeAgo className='text-sm text-gray-500' date={tweet._createdAt} />
                        </div>

                        <p className='pt-1'>{tweet.text}</p>
                
                

                        { tweet.image && (
                            <img src={tweet.image} alt="" className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' 
                        />)}
                    </div>
                </Link>
                    <div className='flex justify-between mt-5 text-gray-500'>
                        <div 
                            onClick={() => setCommentBoxVisible(!commentBoxVisible)}
                            className='flex cursor-pointer items-center space-x-3'
                        >
                            <ChatBubbleOvalLeftIcon className='h-5 w-5' />
                            <p>{comments.length}</p>
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
        

        {/*Comment Box Logic */}
        {commentBoxVisible && (
            <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
                    type="text" 
                    placeholder='Write a comment...' 
                />
                <button 
                    type="submit"
                    disabled={!input} 
                    className='text-twitter disabled:text-gray-200'
                >
                    Post
                </button>
            </form>          
        )}

        { comments?.length > 0 && (
            <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-gray-100 p-5'>
                { comments.map(comment => (
                    <div key={comment._id} className='relative flex space-x-2'>
                        <hr className='absolute left-5 top-9 h-10 border-x border-twitter/30' />
                        <img src={comment.profileImg} className='h-7 w-7 object-cover mt-2 rounded-full' alt="" />
                    
                        <div>
                            <div className='flex items-center space-x-1'>
                                <p className='mr-1 font-bold'>{comment.username}</p>
                                <p className='hidden text-sm text-gray-500 lg:inline'>@{comment.username.replace(/\s+/g, '').toLowerCase()} </p>
                            
                                <TimeAgo className='text-sm text-gray-500' date={comment._createdAt} />
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                      
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Tweet
