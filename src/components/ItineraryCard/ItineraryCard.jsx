import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import * as itineraryService from '../../services/itineraries'
import styles from './ItineraryCard.module.css'

const ItineraryCard = (props) => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const navigate = useNavigate()
  const [nameData, setNameData] = useState()
  const [itinerearyData, setItineraryData] = useState([{}])

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
    console.log(nameData)
    console.log(itinerearyData)
  }

  const handleChange = (evt) => {
    // console.log('itinerearyData: ',itinerearyData)
    setItineraryData({...itinerearyData, [evt.target.value]: evt.target.name })
  }
  const handleTextChange = evt => {
    setNameData({ ...nameData, [evt.target.name]: evt.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formElement} >
        <div className={styles.container}>
        <label htmlFor="name-input">
            Name your itinerary!
          </label>
          <input
						type="text"
						className="form-control"
						id="name-input"
						name="name"
						value={itinerearyData.name}
						onChange={handleTextChange}
            required
					/>
          <ul className={styles.timeSlots}>
            {
              props.city?.places.map(place => (
                <li key={place._id} className={styles.time} >
                  <div>
                    <h1>
                      {place.name}
                      <label htmlFor={place.name}>
                        <select  name={place.name} id={place.name} onChange={handleChange}>
                          <option value="" disabled defaultValue={true}>Select A Time</option>
                          {
                            options.map(hour => (
                              <option key={hour.label} value={hour.value}>{hour.label}</option>
                            ))
                          }
                        </select>
                      </label>
                    </h1>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="card-footer">
            <button  disabled={!validForm} >
              Save Itinerary
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ItineraryCard;