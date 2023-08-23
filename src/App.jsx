import { useState, useEffect} from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import CreateForm from './Components/CreateForm'
import ResponsiveAppBar from './Components/NavBar'
import { MovieDataContext } from './MovieDataContext'
import CardList from './Components/CardList'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then(response => response.json())
      .then(json => {
        setData(json.result)
      })
  
    // return () => {
    //   second
    // }
  }, [])
  

  return (
    <>
    <MovieDataContext.Provider value={data}>
      <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post" element={<CreateForm />} />
          <Route path="/card" element={<CardList />} />
        </Routes>
    </MovieDataContext.Provider>
    </>
  )
}

export default App
