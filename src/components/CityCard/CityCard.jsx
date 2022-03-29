import { Link } from 'react-router-dom'
import styles from './CityCard.module.css'

function CityCard({ city }) {
  return (
    <>
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <Link to={`/cities/${city._id}`} state={{ city }}>
          <img
            src={city.photo ? city.photo : `https://picsum.photos/100/200?random=433`}
            alt="city"
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          /></Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link
              className='btn btn-sm btn-warning'
              to={`/cities/${city._id}`}
              state={{ city }}
            >{city.city}</Link></h3>
          <p className="mt-1 text-sm text-gray-500">{city.state}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          <Link
            className='editBtn'
            to={`/cities/${city._id}/edit`}
            state={{ city }}
          >Edit</Link>
        </p>
      </div>
    </>
  )
}

export default CityCard