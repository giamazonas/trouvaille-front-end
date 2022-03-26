import { useState, useRef, useEffect } from 'react'
import styles from './AddPlace.module.css'

function AddPlace(props) {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '', //object.Id ref city
    name: '',
    type: '',
    url: '',
    photo: [],
  })

	useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleSubmit = evt => {
    // console.log('evt: ', evt)
    // console.log('formData: ', formData)
    evt.preventDefault()
    const placeFormData = new FormData()
    placeFormData.append('address', formData.address)
    placeFormData.append('city', formData.city)
    placeFormData.append('name', formData.name)
    placeFormData.append('type', formData.type)
    props.handleAddPlace(placeFormData)
  }

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  return(
    <div className={styles.container}>
      <h1>Add Place</h1>
      <form autoComplete='off' ref={formElement} onSubmit={handleSubmit} >
        <div>
          <label htmlFor="address-input">
            Address (required)
          </label>
          <br />
          <input
						type="text"
						className="form-control"
						id="address-input"
						name="address"
						value={formData.address}
						onChange={handleChange}
						// required
					/>
        </div>
        <div>
          {/* CHANGE THIS IN NOT TO DISTANT FUTURE */}
          <label htmlFor="city-input">
            City (required)
          </label>
          <br />
          <select 
              name="city" 
              id="city-input"
              value={formData.city}
              className='form-control'
              onChange={handleChange}
              // required
            >
              {props.cities.map((city) => 
                <option value={city._id}>{city.city}</option>)}
            </select>
          {/* <input
						type="text"
						className="form-control"
						id="city-input"
						name="city"
						value={formData.city}
						onChange={handleChange}
						required
					/> */}
        </div>

        <br />

        <div>
          {/* CHANGE THIS IN NOT TO DISTANT FUTURE */}
          <label htmlFor="name-input">
            Name of place (required)
          </label>
          <br />
          <input
						type="text"
						className="form-control"
						id="name-input"
						name="name"
						value={formData.name}
						onChange={handleChange}
						// required
					/>
        </div>
        <div>
          <label htmlFor="type-input">
            Type 
            <select 
              name="type" 
              id="type-input"
              value={formData.type}
              className='form-control'
              onChange={handleChange}
              // required
            >
              <option value="restaurant">Restaurant</option>
              <option value="coffee">Coffee Shop</option>
              <option value="bar">Bar</option>
              <option value="park">Park</option>
              <option value="movie-theatre">Movie Theatre</option>
              <option value="museum">Museum</option>
              <option value="bowling">Bowling</option>
              <option value="arcade">Arcade</option>
              <option value="shop">Shop</option>
            </select>
          </label>
        </div>
        <br />
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
						disabled={!validForm}
					>
						Add Place
					</button>
				</div>
      </form>
    </div>
  )
} 

export default AddPlace