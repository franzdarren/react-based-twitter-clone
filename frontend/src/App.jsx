import { useState } from 'react'

import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import Liked from './pages/Liked'
import SideBar from './components/SideBar'

function App() {
  const [liked, setLiked] = useState([])

  function addLikedTweet(tweet) {
    setLiked((prev) => [...prev, tweet])
    console.log("called in appjsx");
    // console.log(liked)
  }

  function removeLikedTweet(id) {
    setLiked((prev) => prev.filter((item) => item.id !== id))
    console.log("called REMOVED");
  }

  return (
    <div className="app-layout">
      <SideBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home addLikedTweet={addLikedTweet} removeLikedTweet={removeLikedTweet} liked={liked} />}></Route>
          <Route path="/liked" element={<Liked liked={liked} removeLikedTweet={removeLikedTweet} />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
