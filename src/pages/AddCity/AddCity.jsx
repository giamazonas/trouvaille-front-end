import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AddCity(props) {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    desc: '',
    city: '',
    state: '',
    zip: [],
    population: '',
    walkable: true,
    photo: [],
  })

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    const cityFormData = new FormData()
    cityFormData.append('photo', formData.photo)
    cityFormData.append('desc', formData.desc)
    cityFormData.append('city', formData.city)
    cityFormData.append('state', formData.state)
    cityFormData.append('zip', formData.zip)
    cityFormData.append('population', formData.population)
    cityFormData.append('walkable', formData.walkable)
    props.handleAddCity(cityFormData)
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
            <h1 className="text-xl font-medium leading-6 text-gray-900">Add a city</h1>
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
                  {/* <p className="mt-2 text-sm text-gray-500"></p> */}
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
      </div>
    </>
  )
}

export default AddCity