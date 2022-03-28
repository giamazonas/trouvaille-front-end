import { useState, useRef, useEffect } from 'react'
import styles from './AddCity.module.css'

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
    setFormData({...formData, photo: evt.target.files[0]})
  }

  return(
    <div className={styles.container}>
      <br /><h1> Add City </h1><br /><br />
      <form autoComplete = 'off' ref={formElement} onSubmit={handleSubmit} >
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
        </div><br />
        <div>
          <label htmlFor="state-input">
            State
          </label>
          <input
						type="text"
						className="form-control"
						id="state-input"
						name='state'
						value={formData.state}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div>
          <label htmlFor="zip-input">
            Zip
          </label>
          <input
						type="text"
						className="form-control"
						id="zip-input"
						name="zip"
						value={formData.zip}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div>
          <label htmlFor="desc-input">
            Description
          </label>
          <input
						type="text"
						className="form-control"
						id="desc-input"
						name="desc"
						value={formData.desc}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div>
          <label htmlFor="population-input">
            Population
          </label>
          <input
						type="text"
						className="form-control"
						id="population-input"
						name="population"
						value={formData.population}
						onChange={handleChange}
						required
					/>
        </div><br />
        <div>
          <label htmlFor="walkable-input">
            Walkable?  
          </label> 
          <input
						type="checkbox"
						className="form-control"
						id="walkable-input"
						name="walkable"
						value={formData.walkable}
						onChange={handleChange}
					/>
        </div><br />
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
						Add City
					</button>
				</div>
      </form>
    </div>
  )
}

export default AddCity