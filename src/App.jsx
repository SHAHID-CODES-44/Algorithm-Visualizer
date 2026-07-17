import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TowerOfHanoi from "./visualizers/TowerOfHanoi.jsx";
import BubbleSort from './visualizers/BubbleSort.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/TowerOfHanoi' element={<TowerOfHanoi/>} />
        <Route path='/BubbleSort' element={<BubbleSort/>} />
      </Routes>
    </>
  )
}

export default App
