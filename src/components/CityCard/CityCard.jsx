import { Link } from 'react-router-dom'
import styles from './CityCard.module.css'

function CityCard({ city, handleDeleteCity }) {
  return (
    <div className={styles.container}>
      <img
        src={city.photo ? city.photo : `https://picsum.photos/100/200?random=433`}
        alt="city"
        className="card-img-top"
      />
      <div className="card-body">
        <h2 className="card-text">
          <Link

            className='btn btn-sm btn-warning'
            to={`/cities/${city._id}`}
            state={{ city }}

          >{city.city}</Link></h2>
        <p className="card-text">{city.state}</p>
      </div>
      <div className="card-footer">
        <Link

          className='btn btn-sm btn-warning'
          to={`/cities/${city._id}/edit`}
          state={{ city }}

        >
          Edit
        </Link>

      </div>
    </div>
  )
}

export default CityCard