import Select from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom'
import * as itineraryService from '../../services/itineraries'
import styles from './ItineraryCard.module.css'

const ItineraryCard = (props, handleDeleteItinerary) => {
  const location = useLocation()
  const navigate = useNavigate()
  const hours = ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am',
    '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm']

  const handleDelete = async (id) => {
    await itineraryService.deleteOne(id)
    navigate('/cities')
  }

  let options =[{}]

  hours.map((hour,i) =>(
    options[i]=({value: i, label: hour})
  ))
  console.log('++++ props.places ++++', options)

  return (
    <div>
      <div className={styles.container}>
        <ul className={styles.timeSlots}>
          {
            props.city?.places.map(place => (
              <li key={place._id} className={styles.time} >
                <div>
                  <h1>
                    {place.name}
                    <Select options={options} />
                  </h1>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-sm btn-danger m-left"
        >
          Delete Entire Itinerary
        </button>
      </div>
    </div>
  )
}

export default ItineraryCard;