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
    population: '', // set up correctly?
    walkable: '',  // set up correctly?
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
						id="type-input"
						name="type"
						value={formData.type}
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
						id="type-input"
						name="type"
						value={formData.type}
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
						id="type-input"
						name="type"
						value={formData.type}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="type-input">
            Walkable?  
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
      </form>
    </div>
  )
}

export default AddCity