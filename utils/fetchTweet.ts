import { Tweet } from "../typings";

export const fetchTweet = async (tweetId: string) => {
    const res = await fetch(`/api/getTweet?tweetId=${tweetId}`)

    const tweet: Tweet[] = await res.json();

    return tweet;
}