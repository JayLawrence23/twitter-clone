import React from 'react'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    UserIcon,
    EnvelopeIcon,
    ClipboardDocumentListIcon,
    HomeIcon,
    EllipsisHorizontalCircleIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

import SidebarRow from './SidebarRow'

function Sidebar() {
    const { data: session } = useSession();
    

  return (
    <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>
          <Link href="/">
            <a className='flex items-center'> 
            <img className='m-3 h-10 w-10' src="https://links.papareact.com/drq" alt="logo" />
            <span className='font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500'>KPR</span>
            </a>
          </Link>
        { session && (
            <>
            <SidebarRow Icon={HomeIcon} title="Home"/>
            <SidebarRow Icon={HashtagIcon} title="Explore"/>
            <SidebarRow Icon={BellIcon} title="Notifications"/>
            <SidebarRow Icon={EnvelopeIcon} title="Messages"/>
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
            <SidebarRow Icon={ClipboardDocumentListIcon} title="Lists"/>
            </>
        )
        }
        <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'}/>
        <a href="https://kprverse.com/" target="_BLANK">
          <SidebarRow Icon={GlobeAltIcon} title="kprverse.com"/>
        </a> 
        <a href="https://twitter.com/KPRVERSE" target="_BLANK">
          <SidebarRow Icon={BookmarkIcon} title="KPR"/>
        </a> 

        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More"/>
    </div>
  )
}

export default Sidebar