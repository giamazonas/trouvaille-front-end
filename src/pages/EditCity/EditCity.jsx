import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as cityService from '../../services/cities'

function EditCity(city) {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState({})
  const [formData, setFormData] = useState(location.state.city._id)
  const [validForm, setValidForm] = useState(true)
  const formElement = useRef()


  console.log('location.state: ', location.state.city._id)

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => setCityDetails(city))
  }, [])

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
    city.handleUpdateCity(formData)
  }

  const handleDeleteCity = id => {
    cityService.deleteOne(id)
      .then(deletedCity => setCityDetails(city.filter(city => city._id !== deletedCity._id)))
  }

  const handleChangePhoto = (evt) => {
    setFormData({...formData, photo: evt.target.files[0]})
  }

  return (
    <>
      <h1>Edit {location.state.city.city} </h1>
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
        </div>
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
        </div>
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
        </div>
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
        </div>
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
        </div>
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
        </div>
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
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
						// disabled={!validForm}
					>
						Edit City
					</button>
				</div>
      </form> 
      <div className='city-container'>
        {location.state.city._id ?
          <>

            <h2 className='city-details'>{location.state.city.city}</h2>
            <h3>{location.state.city.desc}</h3>
            <h4>{location.state.city.population}</h4>
            <h4>Walkable?  {location.state.city.walkable ? 'you can walk!' : 'get a bike'}</h4>
          </>
          :
          <>
            <h2>Loading City Details...</h2>
          </>
        }
      </div>
      <button
        className="btn btn-sm btn-danger m-left"
        onClick={()=> handleDeleteCity(location.state.city._id)}
      >
        Delete City
      </button>

    </>
  )
}

export default EditCity