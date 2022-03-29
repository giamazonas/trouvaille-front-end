import { useState, useRef, useEffect } from 'react'
import styles from './CityList.module.css'
import CityCard from '../../components/CityCard/CityCard'

const CityList = props => {

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Cities</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {props.cities.map(city => (
            <div className="group relative">
              <CityCard
              key={city._id}
              city={city}
              // insert photo link
              handleUpdateCity={props.handleUpdateCity}
              handleDeleteCity={props.handleDeleteCity}
            />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CityList