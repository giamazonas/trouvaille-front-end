import { useState, useRef, useEffect } from 'react'
import * as placeService from '../../services/placeService'
import { useLocation } from 'react-router-dom'

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
    placeService.getOne(location.state.place._id)
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
              <li key={location.state.place._id}>
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

          <div className="max-w-2xl mx-auto px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
            <div className="relative">

              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{location.state.place.name}</h1>
                <h2 className="mt-4 text-gray-500">

                  {location.state.place.url ?
                    <a className="underline hover:text-gray-600" href={location.state.place.url}>
                      {location.state.place.url}
                    </a>
                    :
                    <>
                    <p>website not available</p>
                    </>}
                </h2>
              </div>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div key={location.state.place.address} className="border-t border-gray-200 pt-4">
                  <dt className="mt-2 text-sm text-gray-500">Address</dt>
                  <dd className="font-medium text-gray-900">{location.state.place.address}</dd>
                </div>
                <div key={location.state.place.type} className="border-t border-gray-200 pt-4">
                  <dt className="mt-2 text-sm text-gray-500">Type</dt>
                  <dd className="font-medium text-gray-900">{location.state.place.type}</dd>
                </div>
              </dl>

              <div className="col-span-2 lg:h-200 mt-10">
                <div className="flex flex-col">
                  <div className="h-200 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                    <img
                      src={location.state.place.photo ? location.state.place.photo : `https://picsum.photos/100/200?random=433`}
                      alt="place"
                      className="w-full h-full object-center object-cover aspect-none lg:w-full"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="col-span-2 py-10">
                <h1 className="font-medium text-gray-900 border-b border-gray-200 pb-4">Reviews</h1>

                {location.state.place.reviews.map((review) =>
                  <ul key={location.state.place._id} className="font-medium text-gray-900 border-b border-gray-150 mx-3 px-2">
                    <li className="mt-2 font-medium text-gray-700"> Rating: {review.rating} </li>
                    <li className="mt-1 text-sm text-gray-500"> {review.comment} </li>
                    <li className="text-xs text-gray-400 flex justify-end"> {new Date(review.createdAt).toLocaleDateString()} </li>
                  </ul>
                )}

                <div className="col-span-2 mt-2 text-sm px-4 text-gray-500">
                  <form autoComplete='off' ref={formElement} onSubmit={handleSubmit} >
                    <div>
                      <p className="mt-10 text-md font-bold text-gray-700">Leave a review!</p>
                      <div className="px-2 mt-3 gap-x-6 gap-y-10 sm:gap-y-16 lg:gap-x-8">
                        <label htmlFor="rating-input">
                          <p className="inline-flex mt-2 pr-5 text-sm text-gray-500">
                            Rating</p>
                        </label>
                        <span className="font-medium text-gray-900">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            className="mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md relative inline-flex items-right pl-5 pr-1 py-2 border text-sm font-medium"
                            id="rating-input"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                          />
                        </span>
                      </div>
                      <div className="px-2 mt-3">
                        <label htmlFor="comment-input">Comment</label>
                        <textarea
                          type="text"
                          className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          id="comment-input"
                          rows={2}
                          name='comment'
                          value={formData.comment}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 px-2 py-3">
                      <button
                        type="submit"
                        className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        disabled={!validForm}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
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

export default PlaceId