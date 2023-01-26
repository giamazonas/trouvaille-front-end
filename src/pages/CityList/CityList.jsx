import CityCard from '../../components/CityCard/CityCard'

const CityList = props => {

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Cities</h2>
        {/* <div className="ml-4">
          <p className="text-base font-medium text-gray-900">Quick Search</p>
          <SearchBarCity placeholder="Search here" data={cities} />
        </div> */}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {props.cities.map(city => (
            <div key={city._id + city.name} className="group relative">
              <CityCard
                city={city}
                handleUpdateCity={props.handleUpdateCity}
                handleDeleteCity={props.handleDeleteCity}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CityList