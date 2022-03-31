import { useState, useRef, useEffect } from 'react';
import * as placeService from '../../services/placeService';
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
// import { MapBox } from '../../components/MapBox/MapBox';
=======
>>>>>>> 8fc227dc2e9be3c1d8946e74e79c457c7f57090a
import styles from './PlaceId.module.css'

const PlaceId = (props, handleReview) => {
  let location = useLocation()
  const [placeDetails, setPlaceDetails] = useState({})
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({_id: location.state.place._id,
    rating: 0,
    comment: "",
  }, 
  )

  useEffect(() => {
    placeService.getOne(location.state.place.id)
    .then(place => setPlaceDetails(place))
  }, [])

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleReview(formData)
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  console.log('PRACTICE')
  return (
    <>
      <img
        src={location.state.place.photo ? location.state.place.photo : `https://picsum.photos/100/200?random=433`}
        alt="place"
        className="card-img-top"
      />
      <div className={styles.container}>
      {location.state.place._id ?
          <>
            <h2>{location.state.place.name}</h2>
            <h4>{location.state.place.address}</h4>
            {/* <h4>{location.state.place.city.city}</h4> */}
            <h4>{location.state.place.type}</h4>
            <h4>{location.state.place.url}</h4><br />
            <h4> -- Reviews -- </h4>
            {location.state.place.reviews.map((review) => 
                <li> {review.comment} </li>

                )   
              } 
            <br /> <br />
            <div className="review-container">
              <h2>Add a Review! </h2><br />
                <form autoComplete = 'off' ref={formElement} onSubmit={handleSubmit} >
                  <div>
                    <label htmlFor="rating-input">
                      Rating
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="form-control"         
                      id="rating-input"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="comment-input">
                      Share your opinion!
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="comment-input"
                      name='comment'
                      value={formData.comment}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <br /><br />
                  <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-fluid"
                    disabled={!validForm}
                  >
                    Save your review!
                  </button>
                </div>
              </form>
            </div>
          </>
          :
          <>
            <h2>Loading Place Details...</h2>
          </>
        }
      </div>
    </>
  )
}

export default PlaceId;