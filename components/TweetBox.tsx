import React, { useRef, useState, Dispatch, SetStateAction } from 'react'
import { 
    PhotoIcon,
    MagnifyingGlassCircleIcon,
    FaceSmileIcon,
    CalendarIcon,
    MapPinIcon
 } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}
function TweetBox({ setTweets }: Props) {
    const [input, setInput] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
    
    const addImagetoTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

    const picArr = new Array();
    picArr[0] = "https://pbs.twimg.com/media/Fe_RRtFX0AAbGy7?format=jpg&name=4096x4096";
    picArr[1] = "https://pbs.twimg.com/media/FeqzGcAXkAEXF_k?format=jpg&name=4096x4096";
    picArr[2] = "https://pbs.twimg.com/media/FeeI-DqWIAQqbtA?format=jpg&name=4096x4096";
    picArr[3] = "https://pbs.twimg.com/media/FeT2JH2XwAAdxuW?format=jpg&name=4096x4096";
    picArr[4] = "https://pbs.twimg.com/media/FdmJrxOWAAEY7bp?format=jpg&name=large";
    picArr[5] = "https://pbs.twimg.com/media/FceDu3ZWYAEI-5C?format=jpg&name=large";
    picArr[6] = "https://pbs.twimg.com/media/FfcRwgZXwAkfGyz?format=jpg&name=4096x4096";
    picArr[7] = "https://pbs.twimg.com/media/FfSKEalWAAAxsAt?format=jpg&name=4096x4096";
    picArr[8] = "https://pbs.twimg.com/media/FfNCUgFWAAImunh?format=jpg&name=4096x4096";
    
    const namesArr = ['Adventure.KPR➕','KRISSΞH➕','laffy➕','Thrown➕','NFDoggo➕','noisewar➕','Andi➕','End➕','frisk➕']
   
    let pic = Math.floor(9*Math.random())
    let names = Math.floor(9*Math.random())


    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || namesArr[names],
            profileImg: session?.user?.image || picArr[pic],
            image: image,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })

        const json = await result.json();

        const newTweets = await fetchTweets();
        setTweets(newTweets);

        toast('Tweet Posted', {
            icon: '🚀'
        })

        return json;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        postTweet();

        setInput('');
        setImage('');
        setImageUrlBoxIsOpen(false);
    }
  return (
    <div className='flex space-x-2 p-5'>
        <img 
            className='h-14 w-14 object-cover rounded-full mt-4' 
            src={session?.user?.image || picArr[pic]} 
            alt="user"
        />
    
        <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='h-24 w-full text-xl outline-none placeholder:text-xl'
                    type="text" 
                    placeholder="What's Happening?" 
                />

                <div className='flex items-center justify-between'>
                    <div className='flex space-x-2 text-twitter'>
                        <PhotoIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                        <MagnifyingGlassCircleIcon className='h-5 w-5'/>
                        <FaceSmileIcon className='h-5 w-5'/>
                        <CalendarIcon className='h-5 w-5'/>
                        <MapPinIcon className='h-5 w-5'/>
                    </div>

                    <button 
                        disabled={!input } 
                        onClick={handleSubmit}
                        className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>
                        Tweet 
                    </button>
                </div>

                { imageUrlBoxIsOpen && (
                    <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                        <input 
                            className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                            ref={imageInputRef}
                            type="text" 
                            placeholder='Enter Image URL...'
                        />
                        <button type='submit' onClick={addImagetoTweet} className='font-bold text-white'>Add Image</button>
                    </form>
                )}

                { image && <img className='mt-10 h-40 w-full rounded-xl object-contain' src={image} alt="" />}
            </form>
        </div>
    </div>
  )
}

export default TweetBox