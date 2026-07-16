import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import TowerOfHanoi from "./Visualizers/TowerOfHanoi.jsx";
import BubbleSort from './Visualizers/BubbleSort.jsx'

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
