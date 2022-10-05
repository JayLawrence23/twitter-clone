// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity';
import { Tweet } from '../../typings';

const tweetQuery = groq`
*[_id == $tweetId] {
    image,
    text,
    username,
    _createdAt,
  }`

type Data = Tweet[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { tweetId } = req.query;

    const tweet: Tweet[] = await sanityClient.fetch(tweetQuery, {
        tweetId,
    })

  res.status(200).json(tweet)
}
