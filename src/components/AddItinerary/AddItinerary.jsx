import { useState, useRef, useEffect } from 'react'
import styles from './AddItinerary.module.css'

const AddItinerary = (props) => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    place: '',
  })

  useEffect(()=> {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
		const itineraryFormData = new FormData()
		itineraryFormData.append('name', formData.name)
    itineraryFormData.append('time', formData.time)
    itineraryFormData.append('place', formData.place)
    props.handleAddItinerary(itineraryFormData)
  }

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  return (
    <div>
       <h1>Add to your Itinerary</h1>
       <form autoComplete = 'off' ref={formElement} onSubmit={handleSubmit}>
       <div>
          <label htmlFor="city-input">
            City Name
          </label>
          <input
						type="text"
						className="form-control"
						id="city-input"
						name="city"
						value={formData.city}
						onChange={handleChange}
						required
					/>
        </div>

      </form>

       
    </div>
  );
}

export default AddItinerary;