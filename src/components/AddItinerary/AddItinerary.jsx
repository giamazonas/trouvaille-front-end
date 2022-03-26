import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './AddItinerary.module.css'
import * as itineraries from '../../services/itineraries'

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
  }

  // const handleChange = evt => {
  //   setFormData({...formData, [evt.target.name]: evt.target.value})
  // }

  return (
    <div className={styles.container}>
<<<<<<< HEAD
       <h1>Add to your Itinerary</h1>
       <form onSubmit={handleSubmit}></form>
=======
      <h1>Add to your Itinerary</h1>
      <form onSubmit={handleSubmit}></form>
>>>>>>> 49178784942cee19d8c385fceb87e880cc4a2097
    </div>
  );
}

export default AddItinerary;