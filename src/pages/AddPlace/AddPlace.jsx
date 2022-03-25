import { useState, useRef, useEffect } from 'react'

function AddPlace(props) {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    name: '',
    type: '',
    url: '',
    photo: '',
  })

	useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleSubmit = evt => {
    // TBD
  }

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  return(
    <div>
      <h1>Add Place</h1>
      <form autoComplete='off' ref={formElement} onSubmit={handleSubmit} >
        <div>
          <label htmlFor="address-input">
            Address (required)
          </label>
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
          {/* CHANGE THIS IN NOT TO DISTANT FUTURE */}
          <label htmlFor="city-input">
            City (required)
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
          {/* CHANGE THIS IN NOT TO DISTANT FUTURE */}
          <label htmlFor="name-input">
            Name (required)
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
        </div>
        <div>
        {/* CHANGE THIS IN NOT TO DISTANT FUTURE */}
          <label htmlFor="type-input">
            Type (required)
          </label>
          <input
						type="text"
						className="form-control"
						id="type-input"
						name="type"
						value={formData.type}
						onChange={handleChange}
						required
					/>
        </div>
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