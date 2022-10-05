import React from 'react'
import { FCC } from '../typings'
import Sidebar from './Sidebar'
import Widgets from './Widgets'

interface ILayoutProps {}

const Layout: FCC<ILayoutProps> = ({ children }) => {
  return (
    <main className='grid grid-cols-10'>
        <Sidebar />
            { children}
        <Widgets />
    </main>
  )
}

export default Layout