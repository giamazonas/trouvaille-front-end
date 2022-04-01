import { useState, useEffect, useRef } from 'react';
import styles from './ItineraryCard.module.css'

const ItineraryCard = (props) => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [nameData, setNameData] = useState()
  const [itineraryData, setItineraryData] = useState([{}])

  const hours = ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am','12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm']
  let options =[{}]
  hours.map((hour,i) =>(
    options[i]=({value: i, label: hour})
  ))

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [nameData])
  const handleSubmit = evt => {
    evt.preventDefault()
    itineraryData[24] = nameData
    props.handleAddItinerary(itineraryData)
  }

  const handleChange = (evt) => {
    setItineraryData({...itineraryData, [evt.target.value]: evt.target.name })
  }
  const handleTextChange = evt => {
    setNameData({ ...nameData, [evt.target.name]: evt.target.value })
  }

  return (
    <form onSubmit={handleSubmit} ref={formElement}>
      <div className="w-full grid grid-cols-3 p-2 min-h-80 lg:max-h-200 overflow-y">
        <div className="col-span-3 px-2 h-15">
          <div className="border-b py-2">
            <label className="font-medium text-gray-900">
              Add places to your itinerary!
            </label>
          </div>

          <div>
            <label htmlFor="name-input" className="pt-2 block text-sm font-medium text-gray-700">Itinerary name
            </label>
            <input
              type="text"
              className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm overflow-hidden sm:text-sm border-gray-300 rounded-md"
              id="name-input"
              name="name"
              value={itineraryData.name}
              onChange={handleTextChange}
              placeholder="required"
              required
            />
          </div>
          <label htmlFor="name-input" className="pt-4 pb-2 block text-sm font-medium font-bold text-gray-700">Places
          </label>
        </div>

        {props.city?.places.map(place => (
          <>
            <div className="col-span-2 px-2 h-17">
              <label htmlFor={place.name} className="font-small text-gray-700">
                <p key={place.name}>{place.name}</p>
                <p key={place.type}className="pl-2 italic font-small text-gray-500">{place.type}</p>
              </label>
            </div>
            <select key={place.id} className="col-span-1 px-4 mt-1 mx-2 focus:ring-gray-500 focus:border-gray-500 shadow-sm overflow-hidden sm:text-sm border-gray-300 rounded-md" name={place._id} id={place.name} onChange={handleChange}>
              <option value="" disabled defaultValue={true}>Select A Time</option>
              {
                options.map(hour => (
                  <option key={hour.label} value={hour.value}>{hour.label}</option>
                ))
              }
            </select>
          </>
        ))
        }

        <div className="col-span-3 px-2">
          <button
            disabled={!validForm}
            className="mt-4 block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ItineraryCard