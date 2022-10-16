import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Layout from '../components/Layout'

import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets}: Props) => {

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter</title>
        <meta name="twitterclone" content="Synthesis Twitter Clone powered by Next JS" />
        <link rel="icon" href="/twittericon.png" />
      </Head>

      <Toaster/>
    
      <Layout>
        {/* Feed */}
        <Feed tweets={tweets} />
      </Layout>

        
    
      
    
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    }
  }
}