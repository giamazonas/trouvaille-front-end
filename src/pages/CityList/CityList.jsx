import { useState, useRef, useEffect } from 'react'
import styles from './CityList.module.css'
import CityCard from '../../components/CityCard/CityCard'

const CityList = props => {

  return (  
    <>
      <h1></h1>
      <div className="h-56 grid md:grid-cols-3 lg:grid-cols-5 content-start">
        {props.cities.map(city => ( 
          <CityCard 
            key={city._id}
            city={city}
            // insert photo link
            handleUpdateCity={props.handleUpdateCity}
            handleDeleteCity={props.handleDeleteCity}
            /> 
        ))}
      </div>
    </>
  );
}

export default CityList