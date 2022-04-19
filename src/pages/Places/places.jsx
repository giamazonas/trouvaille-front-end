import { Link } from 'react-router-dom'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import SearchBar from "../../components/SearchBar/SearchBar";


const Places = ({places}) => {

  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Places
          </h2>
          <div className="flex justify-end mx-5 text-base font-medium text-gray-900"><SearchBar className="z-10" placeholder="Quick search" data={places} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {places.length ?
              places.map((place, i) => (
                <div key={place._id + i} className="group relative">
                  <PlaceCard place={place} />
                </div>
              ))
              :
              <div>
                <p>No places yet</p>
                <Link to="/places/add">Add a Place</Link>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Places

