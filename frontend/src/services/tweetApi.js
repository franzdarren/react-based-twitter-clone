// EVERYTHING HERE IS MADE BY AI, THIS IS JUST FOR PRACTICE 


const DATA_URL = "/tweets.json"

// Pretend the network is slow so loading spinners are actually visible.
// Set to 0 when you get tired of waiting.
const FAKE_LATENCY_MS = 600

// The fetched tweets, kept after the first load so we do not re-download
// the file on every single call. Starts as null = "not loaded yet".
let cache = null

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

// Loads (and caches) the raw tweet array. Everything below builds on this.
async function loadTweets() {
    if (cache) return cache

    const response = await fetch(DATA_URL)

    if (!response.ok) {
        throw new Error(`Failed to load tweets: ${response.status}`)
    }

    const json = await response.json()
    await delay(FAKE_LATENCY_MS)

    cache = json.tweets
    return cache
}

/* ---------------------------------------------------------------
   Endpoints - each returns a Promise, same as a real API would.
   --------------------------------------------------------------- */

// Every tweet, newest first.
export async function getTweets() {
    const tweets = await loadTweets()
    return [...tweets].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
}

// `count` tweets picked at random, no duplicates.
export async function getRandomTweets(count = 5) {
    const tweets = await loadTweets()
    const shuffled = [...tweets].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

// A single tweet, or null if that id does not exist.
export async function getTweetById(id) {
    const tweets = await loadTweets()
    return tweets.find((tweet) => tweet.id === id) ?? null
}

// Every tweet from one account, newest first.
export async function getTweetsByHandle(handle) {
    const tweets = await loadTweets()
    return tweets
        .filter((tweet) => tweet.author.handle.toLowerCase() === handle.toLowerCase())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Matches the tweet text, the display name, or the handle.
export async function searchTweets(query) {
    const tweets = await loadTweets()
    const q = query.trim().toLowerCase()

    if (!q) return []

    return tweets.filter(
        (tweet) =>
            tweet.content.toLowerCase().includes(q) ||
            tweet.author.name.toLowerCase().includes(q) ||
            tweet.author.handle.toLowerCase().includes(q)
    )
}

// The most-liked tweets, for a "trending" panel.
export async function getTopTweets(count = 5) {
    const tweets = await loadTweets()
    return [...tweets].sort((a, b) => b.likes - a.likes).slice(0, count)
}

// The distinct accounts in the dataset, for a "who to follow" panel.
export async function getAuthors() {
    const tweets = await loadTweets()
    const seen = new Map()

    for (const tweet of tweets) {
        if (!seen.has(tweet.author.handle)) {
            seen.set(tweet.author.handle, tweet.author)
        }
    }

    return [...seen.values()]
}
