import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TowerOfHanoi from "./visualizers/TowerOfHanoi.jsx";
import Sorts from './visualizers/Sorts.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/TowerOfHanoi' element={<TowerOfHanoi/>} />
        <Route path='/Sorts' element={<Sorts/>} />
      </Routes>
    </>
  )
}

export default App
