import { Link } from 'react-router-dom'

function CityCard({city, handleDeleteCity}) {
  return (
    <div> 
    <img 
    src={``} 
    alt="city"
    className="card-img-top" 
    />
    <div className="card-body">
      <h2 className="card-text">
      <Link

        className='btn btn-sm btn-warning'
        to={`/cities/${city._id}`}
        state={{city}}
        
      >{city.city}</Link></h2>
      <p className="card-text">{city.state}</p>
    </div>
    <div className="card-footer">
      <Link

        className='btn btn-sm btn-warning'
        to={`/${city._id}/edit`}
        state={{city}}
        
      >
        Edit
      </Link>
      <button
        className="btn btn-sm btn-danger m-left"
        onClick={()=> handleDeleteCity(city._id)}
      >
        Delete
      </button>
    </div>
    </div>  
  )
}

export default CityCard