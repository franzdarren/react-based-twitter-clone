import {React, useState, useEffect} from 'react'
import { getRandomTweets } from './services/tweetApi'
import './App.css'

export default function Practice13() {
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

//COMPONENTS    
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
})

function formatDate(isoString) {
    return dateFormatter.format(new Date(isoString)) + " UTC"
}

function LoadingScreen(){
    return(
        <h3>fetching tweets... </h3>
    )
}

function TweetCard({ tweet }) {
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);

    return (
        <div className='tweet-card'>
            <img className='avatar' src={tweet.author.avatar} alt={tweet.author.name} />

            <div className='tweet-body'>
                <div className='tweet-header'>
                    <span className='identity'>
                        <h2 className='name'>{tweet.author.name}</h2>
                        {tweet.author.verified && <span className='verified' title='Verified'>✓</span>}
                        <span className='handle'>@{tweet.author.handle}</span>
                    </span>
                    <time className='created-at' dateTime={tweet.createdAt}>
                        {formatDate(tweet.createdAt)}
                    </time>
                </div>

                <p className='content'>{tweet.content}</p>

                <div className='tweet-media'>
                    {tweet.image && (
                        <img className='tweet-image' src={tweet.image} alt='' loading='lazy' />
                    )}
                </div>

                <div className='tweet-stats'>
                    <span className='stat stat--reply'><span className='stat__icon'>🗨</span>{tweet.replies}</span>
                    <span className='stat stat--retweet'><span className='stat__icon'>RT</span>{tweet.retweets}</span>
                    <span onClick={()=> liked ? setLiked(false) : setLiked(true)} className='stat stat--like'><span className='stat__icon'>♥</span>{liked ? tweet.likes+1 : tweet.likes}</span>
                </div>
            </div>
        </div>
    )
}

function header(){
    
}
