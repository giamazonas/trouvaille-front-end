import { Link } from 'react-router-dom'
import styles from './ItineraryList.module.css'

const ItineraryList = (props) => {
  // console.log(props)
  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-p6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">My Itineraries</h2>

          {!props.itineraries ?
            <div>
              <p>...Itineraries loading </p>
              <p> You should start one, <Link
                className='btn btn-sm btn-warning'
                to={`/cities/`}
              >here</Link>!</p>
            </div>
            :
            <>
              {props.itineraries.itineraries.map(itinerary =>
                <div key={itinerary._id} className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-2 sm:px-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {itinerary.name}</h3>
                  </div>
                  {itinerary.timePlace.map((place, i) =>
                    <div className="border-t border-gray-200">
                      <dl key={place.places + place.time}>
                        <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            { parseInt(place.time) >= 12 ? ( parseInt(place.time) > 13 ? `${parseInt(place.time) - 12}:00 p.m` : `${place.time}:00 p.m`) : `${place.time}:00 a.m` }
                         </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">at {place.places}</dd>
                        </div>
                      </dl>
                    </div>
                  )}
                </div>
              )}
            </>

          }
        </div>
      </div>
    </>
  )
}

export default ItineraryList