import { useState, useRef, useEffect, } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import * as placeService from '../../services/placeService'
import { ExclamationIcon } from '@heroicons/react/outline'

function EditPlace({ places, handleDeletePlace, handleUpdatePlace }) {
  const location = useLocation()
  const [placeDetails, setPlaceDetails] = useState({})
  const formElement = useRef()
  const [validForm, setValidForm] = useState(true)
  const [formData, setFormData] = useState({
    // _id: location.state.place._id,
    address: '',
    city: '', 
    name: '',
    type: '',
    url: '',
    photo: [],
  })

  const navigate = useNavigate()

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  useEffect(() => {
    placeService.getOne(location.state.place)
      .then(place => setPlaceDetails(place))
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const placeFormData = new FormData()
    placeFormData.append('photo', formData.photo)
    placeFormData.append('address', formData.address)
    placeFormData.append('city', formData.city.city)
    placeFormData.append('name', formData.name)
    placeFormData.append('type', formData.type)
    placeFormData.append('url', formData.url)
    const updatedPlace = await handleUpdatePlace(location.state.place, placeFormData)
    navigate(`/places`)
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleDelete = async (id) => {
    await handleDeletePlace(id)
    navigate('/places')
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
            <h1 className="text-xl font-medium leading-6 text-gray-900">Manage place</h1>
            <div className="grid grid-cols-2 gap-y-1">
              <div className="col-span-2">
                <h2 className="mt-7 text-lg font-bold leading-6 text-gray-600"><span className="mt-5 text-md font-medium text-gray-600">Current info of </span>{location.state.place.name}, in {location.state.place.city.city}</h2>
              </div>
              <div className="mt-3 col-span-2">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Address</p>
                <p className="mt-1 text-md text-gray-600">{location.state.place.address}</p>
              </div>
              <div className="col-span-1">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Type: </p>
                <p className="mt-1 text-md text-gray-600">{location.state.place.type}</p>
              </div>
              <div className="col-span-1">
                <p className="mt-1 text-md font-bold text-gray-500 underline underline-offset-2">Website: </p>
                <p className="mt-1 text-md text-gray-600">{location.state.place.url}</p>
              </div>

              <div className="mt-7 col-span-2">
                <Link to="/places" className="block w-full underline underline-offset-2 hover:font-bold">Go back to all Places </Link><br />
                <Link to="/cities" className="block w-full underline underline-offset-2 hover:font-bold">Go back to all Cities </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form autoComplete='off' ref={formElement} onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="grid grid-cols-6 px-4 py-5 gap-6 bg-white sm:p-6">
              <div className="col-span-6">
                  <h1 className="text-xl font-medium leading-6 text-black">Edit {location.state.place.name},  in {location.state.place.city.city}</h1>
                </div>

                <div className="col-span-4">
                  <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="city-input" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="city-input"
                    name='city'
                    value={formData.city.city}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="address-input" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="address-input"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="type-input" className="block text-sm font-medium text-gray-700" >
                    Type
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="type-input"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <select
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="url-input"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  >
                  </select>
                </div>

                <div className="col-span-6">
                  <button
                    type="submit"
                    disabled={!validForm}
                    className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onChange={handleChange}
                    onClick={(e) => handleSubmit(e, location.state.place)}
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
                  <h1 className="text-xl font-medium leading-6 text-black"><ExclamationIcon className="h-6 w-6 text-gray-600 inline" aria-hidden="true" /> Delete {location.state.place.name}, in  {location.state.place.city.city}</h1>
                </div>

                <div className="col-span-6">
                  <button
                    type="submit"
                    className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 disabled:bg-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => handleDelete(location.state.place)}
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

export default EditPlace