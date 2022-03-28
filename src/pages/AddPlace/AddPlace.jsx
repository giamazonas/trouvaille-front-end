import { useState, useRef, useEffect } from 'react'
import styles from './AddPlace.module.css'
import { useNavigate } from 'react-router-dom'


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
  const navigate = useNavigate()

	useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleSubmit = evt => {
    // console.log('evt: ', evt)
    // console.log('formData: ', formData)
    evt.preventDefault()
    const placeFormData = new FormData()
    placeFormData.append('photo', formData.photo)
    placeFormData.append('address', formData.address)
    placeFormData.append('city', formData.city)
    placeFormData.append('name', formData.name)
    placeFormData.append('type', formData.type)
    props.handleAddPlace(placeFormData)
  }

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleChangePhoto = (evt) => {
    setFormData({...formData, photo: evt.target.files[0]})
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
						required
					/>
        </div>
        <div>
          <label htmlFor="city-input" >
            City (required)
          </label>
          <br />
          <select 
              name="city" 
              id="city-input"
              value={formData.city}
              className='form-control'
              onChange={handleChange}
              required
            >
            <option value="" disabled defaultValue={true}>Select A City</option>
            {props.cities.map((city, i) => 
              <option key={i + city._id} value={city._id}>
                {city.city}, {city.state.toUpperCase()}
              </option>)}
            </select>
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
						required
					/>
        </div>
        <div>
          <label htmlFor="type-input" >
            Type 
            <select 
              name="type" 
              id="type-input"
              value={formData.type}
              className='form-control'
              onChange={handleChange}
              required
            >
              <option key='0' value="" disabled defaultValue={true}>Select A Type</option>
              <option key='1' value="restaurant">Restaurant</option>
              <option key='2' value="coffee">Coffee Shop</option>
              <option key='3' value="bar">Bar</option>
              <option key='4' value="park">Park</option>
              <option key='5' value="movie-theatre">Movie Theatre</option>
              <option key='6' value="museum">Museum</option>
              <option key='7' value="bowling">Bowling</option>
              <option key='8' value="arcade">Arcade</option>
              <option key='9' value="shop">Shop</option>
            </select>
          </label>
        </div>
        <br />
        <div className="form-group mb-4">
          <label htmlFor="photo-upload" className="form-label">
            Upload Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
          />
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