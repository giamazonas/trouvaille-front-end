import { NavLink } from "react-router-dom";
import { useState, useEffect, Fragment } from 'react'
// import SearchForm from "../SearchForm/SearchForm";
import SearchBar from "../SearchBar/SearchBar";
import * as placeService from "../../services/placeService"
// import { Popover, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/solid'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}


const NavBar = ({ user, handleLogout }) => {
  const [places, setPlaces] = useState([])

  useEffect(()=> {
    placeService.getAllPlaces()
    .then(places => setPlaces(places))
  }, [])

  return (
    <>
      { user ? (
        
        <header className="App-header">
          <nav>
            <h2><NavLink to="/">Trouvaille</NavLink></h2>
            <ul>
              <li>
                <NavLink to="/cities">Cities</NavLink>
              </li>
              <li>
                <NavLink to="/cities/add">add city</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/places">Places</NavLink>
              </li>
              <li>
                <NavLink to="/places/add">add a place</NavLink>
              </li>
            </ul><br />

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
            <SearchBar placeholder="Search here" data={places} /><br />
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
