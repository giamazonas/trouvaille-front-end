import { useState, useRef, useEffect, } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import * as cityService from '../../services/cityService'
import styles from './EditCity.module.css'
import { ExclamationIcon } from '@heroicons/react/outline'

function EditCity({ city, handleDeleteCity, handleUpdateCity }) {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState({})
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    _id: location.state.city._id,
    desc: '',
    city: '',
    state: '',
    zip: [],
    population: '',
    walkable: true,
    photo: [],
  })

  const navigate = useNavigate()

  console.log(location.state.city._id)

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => setCityDetails(city))
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(formData)
    const cityFormData = new FormData()
    cityFormData.append('photo', formData.photo)
    cityFormData.append('desc', formData.desc)
    cityFormData.append('city', formData.city)
    cityFormData.append('state', formData.state)
    cityFormData.append('zip', formData.zip)
    cityFormData.append('population', formData.population)
    cityFormData.append('walkable', formData.walkable)
    const updatedCity = await handleUpdateCity(location.state.city._id, cityFormData)
    navigate("/cities")
  }

  const handleChange = evt => {
    let value
    if (evt.target.checked) {
      value = evt.target.checked
    } else {
      value = evt.target.value
    }
    setFormData({ ...formData, [evt.target.name]: value });
  }

  const handleDelete = async (id) => {
    await handleDeleteCity(id)
    navigate('/cities')
  }

  const handleChangePhoto = (evt) => {
    setFormData({ ...formData, photo: evt.target.files[0] })
  }

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h1 className="text-xl font-medium leading-6 text-gray-900">Manage city</h1>
            <div className="grid grid-cols-2 gap-y-1">
              <div className="col-span-2">
                <h2 className="mt-7 text-lg font-bold leading-6 text-gray-600"><span className="mt-5 text-md font-medium text-gray-600">Current info of </span>{location.state.city.city}, {location.state.city.state}</h2>
              </div>
              <div className="mt-3 col-span-2">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Zip</p>
                <p className="mt-1 text-md text-gray-600">{location.state.city.zip}</p>
              </div>
              <div className="col-span-1">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Population</p>
                <p className="mt-1 text-md text-gray-600">{location.state.city.population}</p>
              </div>
              <div className="col-span-1">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Walkable?</p>
                <p className="mt-1 text-md text-gray-600">{location.state.city.walkable ? `Yes` : `No`}</p>
              </div>
              <div className="col-span-2">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Description</p>
                <p className="mt-1 text-md text-gray-600">{location.state.city.desc}</p>
              </div>

              <div className="mt-7 col-span-2">
                <Link to="/places" className="block w-full underline underline-offset-2 hover:font-bold">Go back to Cities</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form autoComplete='off' ref={formElement} onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="grid grid-cols-6 px-4 py-5 gap-6 bg-white sm:p-6">
              <div className="col-span-6">
                  <h1 className="text-xl font-medium leading-6 text-black">Edit {location.state.city.city}, {location.state.city.state}</h1>
                </div>

                <div className="col-span-4">
                  <label htmlFor="city-input" className="block text-sm font-medium text-gray-700">City name
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="city-input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="state-input" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="state-input"
                    name='state'
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="zip-input" className="block text-sm font-medium text-gray-700">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="zip-input"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="population-input" className="block text-sm font-medium text-gray-700" >
                    Population
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="population-input"
                    name="population"
                    value={formData.population}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="walkable-input" className="block text-sm font-medium text-gray-700">
                    Walkable?
                  </label>
                  <select
                    name="walkable"
                    id="walkable-input"
                    value={formData.walkable}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option key="1" value={true} defaultValue={true}>Yes</option>
                    <option key="0" value={false}>No</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="desc-input" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="desc-input"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="required"
                    defaultValue={''}
                  />
                  <p className="mt-2 text-sm text-gray-500"></p>
                </div>

                <div className="col-span-6">
                  <button
                    type="submit"
                    disabled={!validForm}
                    className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onChange={handleChange}
                    onClick={(e) => handleSubmit(e, location.state.city._id)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form autoComplete='off' ref={formElement} onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="grid grid-cols-6 px-4 py-5 gap-6 bg-white sm:p-6">

                <div className="col-span-6">
                  <h1 className="text-xl font-medium leading-6 text-black"><ExclamationIcon className="h-6 w-6 text-gray-600 inline" aria-hidden="true" /> Delete {location.state.city.city}, {location.state.city.state}</h1>
                </div>

                <div className="col-span-6">
                  <button
                    type="submit"
                    className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 disabled:bg-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => handleDelete(location.state.city._id)}
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditCity