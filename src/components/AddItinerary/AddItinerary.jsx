import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './AddItinerary.module.css'
import * as itineraries from '../../services/itineraries'

const AddItinerary = () => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    place: ''
  })

  useEffect(()=> {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
		const itineraryFormData = new FormData()
		itineraryFormData.append('photo', formData.photo)
    itineraryFormData.append('name', formData.name)
    itineraryFormData.append('age', formData.age)
    itineraryFormData.append('breed', formData.breed)
    props.handleAddPuppy(itineraryFormData)
  }

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  return (
    <div>

    </div>
  );
}

export default AddItinerary;