import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function AddPlace(props) {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '', 
    name: '',
    type: '',
    url: '',
    lat: '',
    long: '',
    photo: [],
  })

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    const placeFormData = new FormData()
    placeFormData.append('photo', formData.photo)
    placeFormData.append('address', formData.address)
    placeFormData.append('city', formData.city)
    placeFormData.append('name', formData.name)
    placeFormData.append('type', formData.type)
    placeFormData.append('url', formData.url)
    placeFormData.append('lat', '')
    placeFormData.append('long', '')
    props.handleAddPlace(placeFormData)
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
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
            <h1 className="text-xl font-medium leading-6 text-gray-900">Add a place</h1>
            <br></br>
            <p className="mt-1 text-md text-gray-600">message</p>
            <br></br>
            <Link to="/places" className="underline underline-offset-2 hover:font-bold">Cancel</Link>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form autoComplete='off' ref={formElement} onSubmit={handleSubmit} >
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="grid grid-cols-6 px-4 py-5 gap-6 bg-white sm:p-6">

                <div className="col-span-6">
                  {/* CHANGE THIS IN NOT TO DISTANT FUTURE */}
                  <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">
                    Name of place
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

                <div className="col-span-4">
                  <label htmlFor="type-input" className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    name="type"
                    id="type-input"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option key='' value="" disabled defaultValue={true}>Select a type</option>
                    <option key='1' value="restaurant">Restaurant</option>
                    <option key='2' value="coffee">Coffee Shop</option>
                    <option key='3' value="bar">Bar</option>
                    <option key='4' value="park">Park</option>
                    <option key='5' value="movie-theatre">Movie Theatre</option>
                    <option key='6' value="museum">Museum</option>
                    <option key='7' value="bowling">Bowling</option>
                    <option key='8' value="arcade">Arcade</option>
                    <option key='9' value="shop">Shop</option>
                    <option key='9' value="other">Other</option>
                  </select>
                </div>

                <div className="col-span-6">
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

                <div className="col-span-4">
                  <label htmlFor="city-input" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <select
                    name="city"
                    id="city-input"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option value="" disabled defaultValue={true}>Select a city</option>
                    {props.cities.map((city, i) =>
                      <option key={i + city._id} value={city._id}>
                        {city.city}, {city.state.toUpperCase()}
                      </option>)}
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
                    Website Address:
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="address-input"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-4">
                  <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700">Photo <span className="text-gray-400">(optional)</span></label>
                  <div className="mt-1 flex items-center">
                    <input id="photo-upload" name="photo" type="file" onChange={handleChangePhoto} className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" />
                  </div>
                </div>

                <div className="col-span-6">
                  <button
                    type="submit"
                    disabled={!validForm}
                    className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
      </form>
      </div>
      </div >
    </>
  )
}

export default AddPlace