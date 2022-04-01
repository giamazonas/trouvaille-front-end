// import { NavLink } from "react-router-dom";
import { useState, useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import * as placeService from "../../services/placeService"
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, XIcon } from '@heroicons/react/solid'
import { MenuIcon } from '@heroicons/react/outline'
import SearchBar from "../SearchBar/SearchBar";
import SearchBarCity from "../SeachBarCity/SearchBarCity";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
const NavBar = ({ user, handleLogout, profileId }) => {
  const [places, setPlaces] = useState([])
  const [cities, setCities] = useState([])
  const location = useLocation()

  useEffect(() => {
    placeService.getAllPlaces()
      .then(places => setPlaces(places))
  }, [])

  return (
    <>
      {user ? (
        <Popover className="relative bg-white">
          <div className="h-full mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="text-xl flex justify-start lg:w-0 lg:flex-1">
                <a href="/">trouvaille.</a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>

              <Popover.Group as="nav" className="hidden md:flex space-x-10" id="menu">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                        )}
                      >
                        <span>Cities</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              <a
                                href="/cities"
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Cities</p>
                                  <p className="mt-1 text-sm text-gray-500">Browse all cities</p>
                                </div>
                              </a>
                              <a
                                href="/cities/add"
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Add a City</p>
                                  <p className="mt-1 text-sm text-gray-500">Add a new city</p>
                                </div>
                              </a>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">Quick Search</p>
                                <SearchBarCity placeholder="Search here" data={cities} />
                              </div>
                            </div>
                          </div>
                          {/* <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                              <div>
                                <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">Admin</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                  <li className="text-base truncate">
                                    <a href="/cities/add" className="font-medium text-gray-900 hover:text-gray-700">
                                      Add a City
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div> */}

                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                        )}
                      >
                        <span>Places</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              <a
                                href="/places"
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Places</p>
                                  <p className="mt-1 text-sm text-gray-500">Browse all places</p>
                                </div>
                              </a>
                              <a
                                href="/places/add"
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Add a Place</p>
                                  <p className="mt-1 text-sm text-gray-500">Add a new place</p>
                                </div>
                              </a>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">Quick Search</p>
                                <SearchBar placeholder="Search here" data={places} />
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>

              <Popover.Group as="nav" className="flex justify-end hidden md:flex md:flex-1 lg:w-0" id="profile">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex justify-end text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                        )}
                      >
                        <span>{user.name}</span>
                        <span className="inline-block h-7 w-7 mx-3 rounded-full overflow-hidden bg-gray-100" aria-hidden="true">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>

                        {/* <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          
                        /> */}

                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:-translate-x-1">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              <a
                                href={`/itineraries/${profileId}`}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">My Itineraries</p>
                                </div>
                              </a>
                              {/* <a
                                href="/starred"
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Starred Places</p>
                                </div>
                              </a> */}
                            </div>

                            <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                              <div>
                                <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">Account</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                  <li className="text-base truncate">
                                    <a href="/changePassword" className="font-medium text-gray-900 hover:text-gray-700">
                                      Change Password
                                    </a>
                                  </li>
                                  <li className="text-base truncate">
                                    <a href="/" className="font-medium text-gray-900 hover:text-gray-700" onClick={handleLogout}>
                                      Sign out
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>

            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel focus className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div><span>trouvaille.</span></div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      <a
                        href="/cities"
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">All Cities</span>
                      </a>
                      <a
                        href="/places"
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">All Places</span>
                      </a>
                      <a
                        href={`/itineraries/${profileId}`}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">My Itineraries</span>
                      </a>
                      {/* <a
                        href="/starred"
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">Starred Places</span>
                      </a> */}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <a
                    href="/places/add"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">Add a Place</span>
                  </a>
                  <a
                    href="/cities/add"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">Add a City</span>
                  </a>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <a href="/changePassword" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Change Password
                    </a>
                  </div>
                  <div>
                    <a href="/" className="text-gray-600 hover:text-gray-500" onClick={handleLogout}>
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>

        </Popover>
      ) : (
        <Popover className="relative bg-white">
          <div className="h-full mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="text-xl flex justify-center lg:w-0 lg:flex-1">
                <a href="/">trouvaille.</a>
              </div>
            </div>
          </div>
        </Popover>
      )
      }
    </>
  );
};
export default NavBar;