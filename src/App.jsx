import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import Places from './pages/Places/places'
import AddPlace from './pages/AddPlace/AddPlace'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as cityService from './services/cities'
import * as placeService from './services/placeService'
import * as itineraryService from './services/itineraries'
import AddCity from './pages/AddCity/AddCity'
import CityList from './pages/CityList/CityList'
import EditCity from './pages/EditCity/EditCity'
import CityId from './pages/CityId/CityId'
import Itineraries from './pages/ItineraryList/ItineraryList'
import Search from './components/Search/Search'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [cities, setCities] = useState([])
  const [places, setPlaces] = useState([])
  const [itineraries, setItineraries] = useState([])
  const navigate = useNavigate()


  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

    /* ----------------------------- CITY ----------------------------- */
  
    useEffect(() => {
      cityService.getAll()
        .then(allCities => setCities(allCities))
    }, [])
  
    
    const handleAddCity = async newCityData => {
      const newCity = await cityService.create(newCityData)
      setCities([...cities, newCity])
      navigate('/cities')
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
          navigate('/cities')
        })
    }

  /* ----------------------------- PLACE ----------------------------- */
  
  useEffect(() => {
    placeService.getAllPlaces()
    .then(allPlaces => setPlaces(allPlaces))
  }, [])
  
  const handleAddPlace = async newPlaceData => {
    const newPlace = await placeService.create(newPlaceData)
    setPlaces([...places, newPlace])
    navigate('/places')
  }
  
  const handleDeletePlace = id => {
    placeService.deleteOne(id)
    .then(deletedPlace => setPlaces(places.filter(place => place._id !== deletedPlace._id)))
  }

  const handleUpdatePlace = updatedPlaceData => {
    placeService.update(updatedPlaceData)
    .then(updatedPlace => {
      const newPlacesArray = places.map(place => place._id === updatedPlace._id ? updatedPlace : place)
      setPlaces(newPlacesArray)
      navigate('/')
    })
  }

  /* ----------------------------- ITINERARY ----------------------------- */

  useEffect(() => {
    itineraryService.getAllItineraries()
      .then(allItineraries => setItineraries(allItineraries))
  }, [])


  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} 
        cities={cities}
        // places={places}
      />
      <main>
        <Routes>
          <Route path='/cities' element={<CityList cities={cities} /> }
          />
          <Route
            path='/cities/add'
            element={
              <AddCity 
                handleAddCity={handleAddCity}
              />
            } />
          <Route 
            path='cities/:id'
            element={
              <CityId 
                // handleCityId={handleCityId}
                city={cities}
                places={places}
                //  itineraries={itineraries}
              />
            } 
          />
          <Route
            path='cities/:id/edit'
            element={
              <EditCity
                handleUpdateCity={handleUpdateCity}
                handleDeleteCity={handleDeleteCity}
                city={cities}
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
            element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin} /> : <Navigate to="/login" />}
          />
          <Route
            path="/places"
            element={user ? <Places /> : <Navigate to="/login" />}
          />
          <Route
            path="/places/add"
            element={
              user ? 
                <AddPlace 
                  handleAddPlace={handleAddPlace} 
                  cities={cities}
                /> 
              : 
                <Navigate to="/login" />
              }
          />
          <Route
            path="/itineraries"
            element={user ? <Itineraries /> : <Navigate to="/login" />}
          />
          <Route 
            path="/search"
            element={
              <Search
                cities={cities} />
              }
          />
        </Routes>

      </main>
    </div>
  )
}

export default App
