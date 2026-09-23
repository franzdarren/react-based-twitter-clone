import { useState, useEffect } from 'react'
import { getRandomTweets } from './services/tweetApi'
import LoadingScreen from './components/LoadingScreen'
import TweetCard from './components/TweetCard'

export default function App() {
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    getRandomTweets(5)
      .then(data => setTweets(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

    return (
        <>
            {loading && (<LoadingScreen />)}
            {tweets.map((tweet) =>
                <TweetCard key={tweet.id} tweet={tweet}/>
            )}
        </>
    )
}
