import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
// import SearchForm from "../SearchForm/SearchForm";
import SearchBar from "../SearchBar/SearchBar";
import * as placeService from "../../services/placeService"
import * as cityService from "../../services/cities"

const NavBar = ({ user, handleLogout }) => {
  const [places, setPlaces] = useState([])

  useEffect(()=> {
    placeService.getAllPlaces()
    .then(places => setPlaces(places))
  }, [])

  return (
    <>
      {user ? (
        <header className="App-header">
          <nav>
            <NavLink to="/">Trouvaille</NavLink>
            <ul>
              Cities
              <li>
                <NavLink to="/cities">Cities</NavLink>
              </li>
              <li>
                <NavLink to="/cities/add">Add City</NavLink>
              </li>
              <li>
                <NavLink to="/:id">Each City</NavLink>
              </li>
            </ul>
            <ul>
              Places
              <li>
                <NavLink to="/places">Places</NavLink>
              </li>
              <li>
                <NavLink to="/places/add">Add a Place</NavLink>
              </li>
            </ul>

            <ul>
              {user.name} {/*  add icon */}
              <li>
                <NavLink to="/itineraries">My Itineraries</NavLink>
              </li>
              <li>
                <NavLink to="/itineraries">Starred Places</NavLink>
              </li>
              <li>
                <NavLink to="/changePassword">Change Password</NavLink>
              </li>
              <li>
                <NavLink to="" onClick={handleLogout}>
                  LOG OUT
                </NavLink>
              </li>
            </ul>
            <SearchBar placeholder="Search here" data={places} />
          </nav>

        </header>
      ) : (
        <header className="App-header">
          <nav>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </nav>
        </header>
      )}
    </>
  );
};

export default NavBar;
