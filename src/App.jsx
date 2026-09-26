import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Recursions from "./visualizers/Recursions.jsx";
import Sorts from './visualizers/Sorts.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Recursions' element={<Recursions />} />
        <Route path='/Sorts' element={<Sorts/>} />
      </Routes>
    </>
  )
}

export default App
