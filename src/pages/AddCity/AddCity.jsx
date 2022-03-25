import { useState, useRef, useEffect } from 'react'

function AddCity(props) {
  const formElement = useRef()
  const [validForm, setValidForm] =
  useState(false)
  const [formData, setFormData] =
  useState({
    desc: '',
    city: '',
    state: '',
    zip: '',
    population: '', 
    walkable: '', 
    photo: '',
  })

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    //
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }


  return(
    <div>
      <h1> Add City </h1>
      <form autoComplete = 'off' ref={formElement} onSubmit={handleSubmit} >
        <div>
          <label htmlFor='name-input' className='form-control' id='address-input'
          name='address'
          value={formData.address}
          onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="name-input">
            City Name
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
          <label htmlFor="type-input">
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
          <label htmlFor="type-input">
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
          <label htmlFor="type-input">
            Description
          </label>
          <input
						type="text"
						className="form-control"
						id="description-input"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="type-input">
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
          <label htmlFor="type-input">
            Walkable?  
          </label> 
          <input
						type="checkbox"
						className="form-control"
						id="walkable-input"
						name="walkable"
						value={formData.walkable}
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
						Add City
					</button>
				</div>
      </form>
    </div>
  )
}

export default AddCity