import React from 'react'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    UserIcon,
    EnvelopeIcon,
    ClipboardDocumentListIcon,
    HomeIcon,
    EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

import SidebarRow from './SidebarRow'

function Sidebar() {
    const { data: session } = useSession();
    

  return (
    <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>
        <Link href="/">
          <a> 
          <img className='m-3 h-10 w-10' src="https://links.papareact.com/drq" alt="logo" />
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

        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More"/>
    </div>
  )
}

export default Sidebar