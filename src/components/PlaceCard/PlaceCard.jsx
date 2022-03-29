import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import styles from './PlaceCard.module.css'

function PlaceCard({ place }) {
  return (
    <>
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <Link
          to={`/places/${place._id}`}
          state={{ place }}
        >
          <img
            src={place.photo ? place.photo : 'https://picsum.photos/200/300?random=4'}
            alt={`${place.name}`}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          /></Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="text-md text-gray-900">
            <Link
              to={`/places/${place._id}`}
              state={{ place }}
            >{place.name}</Link></h2>
          <h1 className="mt-1 text-sm text-gray-700">{place.city?.city}</h1>
          <h2 className="mt-1 text-sm text-gray-700">{place.city?.state}</h2>
          <h3 className="mt-1 text-sm text-gray-700">{place.type}</h3>
          <h4 className="mt-1 text-sm text-gray-700">{place.address}</h4>
        </div>
      </div>
    </>
  )
}

export default PlaceCard