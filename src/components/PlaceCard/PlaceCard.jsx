import { Link } from 'react-router-dom'
import styles from './PlaceCard.module.css'

function PlaceCard({ place }) {
  return (
    <div className={styles.container}>
      <img
        src={place.photo ? place.photo : 'https://picsum.photos/200/300?random=4'}
        alt={`${place.name}`}
        className="card-img-top"
      />
      <div className="card-body">
        <h2 className="card-text">{place.name}</h2>
        <h3 className="card-text">{place.type}</h3>
      </div>
      <div className="card-footer">
        <h4>{place.address}</h4>
      </div>
    </div>
  )
}

export default PlaceCard