import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate, NavLink } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as cityService from './services/cities'
import AddCity from './pages/AddCity/AddCity'
import CityList from './pages/CityList/CityList'
import EditCity from './pages/EditCity/EditCity'
import CityId from './pages/CityId/CityId'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [cities, setCities] = useState([])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(()=> {
    cityService.getAll()
    .then(allCities => setCities(allCities))
  }, [])

  const handleAddCity = async newCityData => {
    const newCity = await cityService.create(newCityData)
    setCities([...cities, newCity])
    navigate('/')
  }

  const handleDeleteCity = id => {
    cityService.deleteOne(id)
    .then(deletedCity => setCities(cities.filter(city => city._id !== deletedCity._id)))
  }

  const handleUpdateCity = updatedCityData => {
    cityService.update(updatedCityData)
    .then(updatedCity => {
      const newCitiesArray = cities.map(city => city._id === updatedCity._id ? updatedCity : city)
      setCities(newCitiesArray)
      navigate('/')
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        Cities 
        <NavBar user={user} handleLogout={handleLogout} />
        <nav>
          <NavLink to='/'>City List</NavLink>
          <NavLink className='m-left' to='/add'>Add City</NavLink>
          <NavLink to='/:id/edit'>Edit City</NavLink>
          <NavLink to='/:id'>Each City</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route 
            path='/add' 
            element={
              <AddCity 
                handleAddCity={handleAddCity} 
              />
            } />
            {/* <Route 
            path='/:id' 
            element={
              <CityId 
                handleCityId={handleCityId} 
              />
            } 
          /> */}
          <Route 
            path='/:id/edit' 
            element={
              <CityId 
                handleUpdateCity={handleUpdateCity} 
              />
            } 
          />
          <Route 
            path='/:id/edit' 
            element={
              <CityId 
                handleDeleteCity={handleDeleteCity} 
              />
            } 
          />
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
      </Routes>
      </main>
    </div>
  )
}

export default App
