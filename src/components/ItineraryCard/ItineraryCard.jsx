import { useState, useRef, useEffect, } from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import * as itineraryService from '../../services/itineraries'
import styles from './ItineraryCard.module.css'

const ItineraryCard = (props, handleDeleteItinerary) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    await itineraryService.deleteOne(id)
    navigate('/cities')
  }

  return ( 
    <div className={styles.container}>
      props.itinerary.owner._id === user.profile ?
        <div>
        <h1> testing It. card </h1>
        <h2> {props.itinerary.name}</h2>
        <p className='card-text'> {props.itinerary.time} </p>
        <p className='card-text'> {props.itinerary.place} </p>
        </div><br /> <br />

      <div className="card-footer">
        <button 
        className="btn btn-sm btn-danger m-left"
        onClick={()=> handleDelete(props.itinerary._id)}
          >
          Delete Entire Itinerary
        </button><br /><br />
      </div>
    </div>
  );
}

export default ItineraryCard;