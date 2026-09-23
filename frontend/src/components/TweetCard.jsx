import { useState } from 'react'
import { formatDate } from '../utils/formatDate'
import './TweetCard.css'

export default function TweetCard({ tweet }) {
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
