import { useState, useEffect } from 'react'
import { getRandomTweets, getTweets } from '../services/tweetApi'
import LoadingScreen from '../components/LoadingScreen'
import TweetCard from '../components/TweetCard'

export default function Home({ addLikedTweet, removeLikedTweet, liked }) {

    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // getRandomTweets(20)
        getTweets()
            .then(data => setTweets(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {loading && (<LoadingScreen />)}
            {tweets.map((tweet) =>
                <TweetCard
                    key={tweet.id}
                    tweet={tweet} 
                    isLiked={liked.some((t) => t.id === tweet.id)}
                    addLikedTweet={addLikedTweet} 
                    removeLikedTweet={removeLikedTweet} 
                />
            )}
        </>
    )
}
