import { useState, useRef, useEffect } from 'react';
import * as placeService from '../../services/placeService';
import { useLocation } from 'react-router-dom';
import { MapBox } from '../../components/MapBox/MapBox';
import styles from './PlaceId.module.css'

const PlaceId = (props, handleReview) => {
  let location = useLocation()
  const [placeDetails, setPlaceDetails] = useState({})
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    _id: location.state.place._id,
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
      {location.state.place._id ?
        <div className="bg-white">
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
            </div>
          </div>
          <nav aria-label="Breadcrumb" className="py-3">
            <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
              <li key={location.state.place.id}>
                <div className="flex items-center">
                  <p className="mr-2 text-sm font-medium text-gray-900">
                    {location.state.place.type}
                  </p>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <p aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {location.state.place.name}
                </p>
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{location.state.place.name}</h2>
              <p className="mt-4 text-gray-500">
                URL?
                <h4>{location.state.place.url}</h4>
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div key={location.state.place.id} className="border-t border-gray-200 pt-4">
                  <dt className="mt-2 text-sm text-gray-500">Address</dt>
                  <dd className="font-medium text-gray-900">{location.state.place.address}</dd>
                </div>
                <div key={location.state.place.id} className="border-t border-gray-200 pt-4">
                  <dt className="mt-2 text-sm text-gray-500">Type</dt>
                  <dd className="font-medium text-gray-900">{location.state.place.type}</dd>
                </div>
                <div key={location.state.place.id} className="col-span-2">
                  <img
                    src={location.state.place.photo ? location.state.place.photo : `https://picsum.photos/100/200?random=433`}
                    alt="place"
                    className="card-img-top"
                  />
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="col-span-2">
                <h1 className="font-medium text-gray-900 border-b border-gray-200 pb-4">Reviews</h1>
              
              {location.state.place.reviews.map((review) =>
                <ul className="font-medium text-gray-900 border-b border-gray-150 mx-3 px-2">
                  <li> {review.rating} </li>
                  <li> {review.comment} </li>
                </ul>
              )}
              </div>

              <div className="review-container">
                <h2>Add a Review!</h2><br />
                <form autoComplete='off' ref={formElement} onSubmit={handleSubmit} >
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
            </div>
          </div>
        </div>

        :
        <>
          <h2>Loading Place Details...</h2>
        </>
      }
    </>
  )
}

export default PlaceId;