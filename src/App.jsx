import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as cityService from './services/cityService'
import * as placeService from './services/placeService'
import * as itineraryService from './services/itineraries'
import AddCity from './pages/AddCity/AddCity'
import CityList from './pages/CityList/CityList'
import EditCity from './pages/EditCity/EditCity'
import CityId from './pages/CityId/CityId'
import Places from './pages/Places/places'
import AddPlace from './pages/AddPlace/AddPlace'
import PlaceId from './pages/PlaceId/PlaceId'
import ItineraryList from './pages/ItineraryList/ItineraryList'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [cities, setCities] = useState([])
  const [city, setCity] = useState([])
  const [places, setPlaces] = useState([])
  const [itineraries, setItineraries] = useState([])
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
  const [navItems, setNavItems] = useState([
    { url: '/cities', name: 'Cities' },
    { url: '/places', name: 'Places' },
    { url: '/itineraries', name: 'My Itineraries' },
  ])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  /* ----------------------------- CITY git ----------------------------- */

  useEffect(() => {
    cityService.getAll()
    .then(allCities => setCities(allCities))
  }, [])


  const handleAddCity = async newCityData => {
    const newCity = await cityService.create(newCityData)
    setCities([...cities, newCity])
    navigate('/cities')
  }

  /* ------------------------ vvv TEST ZONE vvv ------------------------ */

  const handleShowCity = id => {
    cityService.getOne(id)
      .then(city => {
        console.log(':::::: App.jsx -- handleShowCity ::::::', city)
        //setCity(city)   // <-------- WHY DOES THIS GO INFINITE?
      })
  }

  /* ------------------------ ^^^ TEST ZONE ^^^ ------------------------ */
  
    const handleDeleteCity = id => {
      cityService.deleteOne(id)
        .then(deletedCity => setCities(cities.filter(city => city._id !== deletedCity._id)))
    }
  
    const handleUpdateCity = (id, updatedCityData) => {
      for(let pair of updatedCityData.entries()){
        console.log(pair[0], pair[1])
      }
      cityService.update(id, updatedCityData)
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
    cityService.addPlace(newPlace.city, newPlace._id)
    navigate('/places')
  }

  const handleDeletePlace = id => {
    placeService.deleteOne(id)
    .then(deletedPlace => setPlaces(places.filter(place => place._id !== deletedPlace._id)))
    navigate('/places')
  }

  const handleUpdatePlace = updatedPlaceData => {
    placeService.update(updatedPlaceData)
      .then(updatedPlace => {
        const newPlacesArray = places.map(place => place._id === updatedPlace._id ? updatedPlace : place)
        setPlaces(newPlacesArray)
        navigate('/places')
      })
  }

  const handleReview = async newReviewData => {
    console.log("NEW REVIEW DATA", newReviewData)
    const newReview = await placeService.createReview(newReviewData)
    navigate('/places')
  }

  /* ----------------------------- ITINERARY ----------------------------- */
  const handleAddItinerary = async newItineraryData => {
    const newItinerary = await itineraryService.create(newItineraryData)
    setItineraries([...itineraries, newItineraryData])
    navigate('/itineraries')
  }

  useEffect(() => {
    if(user) {
      itineraryService.getAllItineraries()
      .then(allItineraries => setItineraries(allItineraries))
    }
  }, [user])

  const handleDeleteItinerary = id => {
    itineraryService.deleteOne(id)
    .then(deletedItinerary => setItineraries(itineraries.filter(itinerary => itinerary._id !== id)))
  }

  // ---------------------------  ROUTES  ----------------------------------

  return (
        <div className="App">
          <NavBar 
            user={user} 
            handleLogout={handleLogout}
            cities={cities}
            navItems={navItems}
            places={places}
          />
          <Routes>
            <Route 
              path='/cities' 
              element={
                <CityList 
                  cities={cities} />}
            />
            <Route
              path='/cities/add'
              element={
                <AddCity 
                  handleAddCity={handleAddCity}
                  user={user}/>
                } /> 
              <Route
                path='cities/:id'
                element={
                  <CityId
                    city={city}
                    places={places}
                    handleShowCity={handleShowCity}
                  />
                }
              />
          <Route
            path='cities/:id/edit'
            element={
              <EditCity
                cities={cities}
                user={user}
                handleUpdateCity={handleUpdateCity}
                handleDeleteCity={handleDeleteCity} />}
              />
              <Route 
                path="/" 
                element={
                  <Landing 
                    user={user} 
                  />}
              />
              <Route
                path="/signup"
                element={
                  <Signup 
                    handleSignupOrLogin={handleSignupOrLogin} 
                  />}
              />
              <Route
                path="/login"
                element={
                  <Login 
                    handleSignupOrLogin={handleSignupOrLogin} 
                  />}
              />
              <Route
                path="/profiles"
                element={user ? <Profiles /> : <Navigate to="/login" />}
              />
              <Route
                path="/changePassword"
                element={
                  user ? 
                  <ChangePassword 
                    handleSignupOrLogin={handleSignupOrLogin} 
                    /> 
                  : 
                    <Navigate 
                      to="/login" 
                    />}
              />
              {/* -------------- CITIES -------------------- */}
              <Route path='/cities'
                element={
                  user ?
                    <CityList cities={cities} />
                  :
                    <Navigate to="/login" />
                } />
              <Route
                path='/cities/add'
                element={
                  user ?
                    <AddCity
                      handleAddCity={handleAddCity}
                    />
                  :
                    <Navigate to="/login" />
                } />
              <Route
                path='cities/:id'
                element={
                  user ?
                    <CityId
                      // handleCityId={handleCityId}
                      city={cities}
                      places={places}
                      itineraries={itineraries}
                    />
                  :
                    <Navigate to="/login" />
                }
              />
              <Route
                path='cities/:id/edit'
                element={
                  user ?
                    <EditCity
                      cities={cities}
                      handleUpdateCity={handleUpdateCity}
                      handleDeleteCity={handleDeleteCity}
                    />
                  :
                    <Navigate to="/login" />
                }
              />
              <Route
                path='/cities'
                element={
                  user ?
                    <CityList
                      cities={cities}
                    />
                  :
                    <Navigate to="/login"
                    />}
              />
              {/* -------------  PLACES  -------------------- */}
              <Route
                path="/places"
                element={
                  user ? 
                    <Places /> 
                  : 
                    <Navigate 
                      to="/login" 
                    />}
              />
              <Route
                path='/cities/:cityId/:placeId'
                element={
                  <Places
                    cities={cities}
                    places={places} 
                    />}
          />
          <Route
            path='/places/:id'
            element={
              user ?
                <PlaceId 
                  cities={cities}
                  places={places} 
                  handleUpdatePlace={handleUpdatePlace}
                  handleDeletePlace={handleDeletePlace}
                  handleReview={handleReview} 
                />
              :
                <Navigate 
                  to="/login" />
            }
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
                pth='/places/:id'
                element={
                  user ?
                    <PlaceId
                      city={cities}
                      places={places}
                      handleUpdatePlace={handleUpdatePlace}
                      handleDeletePlace={handleDeletePlace}
                    />
                  :
                    <Navigate to="/login" />
                } />
              {/* ----------------- ITINERARIES  ----------------- */}
              <Route
                path="/itineraries"
                element={
                  user ? 
                    <ItineraryList 
                      cities={cities}
                      places={places}
                      itineraries={itineraries}
                    /> 
                  : 
                    <Navigate 
                      to="/login" 
                      />}
              />
            </Routes>
        </div>
  )
}

export default App;
