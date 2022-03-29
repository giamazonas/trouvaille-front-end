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
    console.log('ADD IT', itineraryFormData )
  }

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  return (
    <div className={styles.container}>
      <h1>Add to your Itinerary</h1>
      <form autoComplete = 'off' ref={formElement} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-input">
            Name
          </label>
          <input
						type="text"
						className="form-control"
						id="name-input"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div>
          <label htmlFor="time-input">
            Time
          </label>
          <input
						type="text"
						className="form-control"
						id="time-input"
						name='time'
						value={formData.time}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div>
          <label htmlFor="place-input">
            Place
          </label>
          <input
						type="text"
						className="form-control"
						id="place-input"
						name='place'
						value={formData.place}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Add Itinerary
					</button>
				</div>
      </form>
    </div>
  );
}

export default AddItinerary;