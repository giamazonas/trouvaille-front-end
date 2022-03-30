import { useState, useRef, useEffect, Component } from 'react'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import * as cityService from '../../services/cityService'
import styles from './EditCity.module.css'

function EditCity({city, handleDeleteCity, handleUpdateCity}) {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState({})
  const formElement = useRef()
  const [validForm, setValidForm] = useState(true)
  const [formData, setFormData] = useState({_id: location.state.city._id,
    desc: '',
    city: '',
    state: '',
    zip: [],
    population: '', 
    walkable: true, 
    photo: [], 
  })
  
  const navigate = useNavigate()

  console.log(location.state.city._id)

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)

	}, [formData])

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => setCityDetails(city))
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(formData)
    const cityFormData = new FormData()
    cityFormData.append('photo', formData.photo)
    cityFormData.append('desc', formData.desc)
    cityFormData.append('city', formData.city)
    cityFormData.append('state', formData.state)
    cityFormData.append('zip', formData.zip)
    cityFormData.append('population', formData.population)
    cityFormData.append('walkable', formData.walkable)
    const updatedCity = await handleUpdateCity(location.state.city._id, cityFormData)

    console.log(updatedCity)
    // await handleUpdateCity(formData)

    /// pass location.stat.city.id into placeformdata 
    navigate("/cities") 
  }

  const handleChange = evt => {
    let value
    if (evt.target.checked) {
      value = evt.target.checked 
    }else {
      value = evt.target.value
    }
    setFormData({...formData, [evt.target.name]: value });
  }

  const handleDelete = async (id) => {
    await handleDeleteCity(id)
    navigate('/cities')
  }

  const handleChangePhoto = (evt) => {
    setFormData({...formData, photo: evt.target.files[0]})
  }

  // async componentDidMount() {
  //   const cityDetails = await getCityDetails();
  //   this.setState({ results: cityDetails.results });
  //   console.log(this.state.results)
  // }


  return (
    <>
    <div className={styles.container}><br />
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
        </div><br />
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
        </div><br />
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            onClick={(e)=> handleSubmit(e, location.state.city._id)}
            onChange={handleChange}
						disabled={!validForm}
					>
						Edit City
					</button>
				</div><br /><br />
      </form> 
      <div className={styles.cityContainer} id='cityInfo'>
        <h2>City info currently:</h2><br />
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
      <br />
      <br />
      <button
        className="btn btn-sm btn-danger m-left"
        onClick={()=> handleDelete(location.state.city._id)}
      >
        Delete City
      </button>
      <br />
      <br />
      <br />
    </div>
    </>
  )
}

export default EditCity