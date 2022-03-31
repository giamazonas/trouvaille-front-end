import { Link } from 'react-router-dom'

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
          <h2 className="text-md text-gray-900">
            <Link
              to={`/cities/${city._id}`}
              state={{ city }}
            >{city.city}</Link></h2>
          <h3 className="mt-1 text-sm text-gray-700">{city.state}</h3>
        </div>
        <p className="mt-1 text-sm text-gray-700">
          <Link
            className="italic underline underline-offset-2 hover:font-bold text-gray-800"
            to={`/cities/${city._id}/edit`}
            state={{ city }}
          >manage</Link>
        </p>
      </div>
    </>
  )
}

export default CityCard;