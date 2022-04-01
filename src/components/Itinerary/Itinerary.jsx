import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'

function Itinerary({ place }) {
  return (
    <>
    
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <Link
          to={`/places/${place._id}`}
          state={{ place }}
        >Place name comes here</Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="text-md text-gray-900">
            <Link
              to={`/places/${place._id}`}
              state={{ place }}
            >{place.name}</Link></h2>
          <h4 className="mt-1 text-sm text-gray-700">{place.type}</h4>
          <h4 className="mt-1 text-sm text-gray-700">{place.address}</h4>
          <h4 className="mt-1 text-sm text-gray-700">{place.city?.city}</h4>
          <h4 className="mt-1 text-sm text-gray-700">{place.city?.state}</h4>
        </div>
      </div>
    </>
  )
}

export default Itinerary