import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Recursion from "./visualizers/Recursion.jsx";
import Sorts from './visualizers/Sorts.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Recursion' element={<Recursion/>} />
        <Route path='/Sorts' element={<Sorts/>} />
      </Routes>
    </>
  )
}

export default App
