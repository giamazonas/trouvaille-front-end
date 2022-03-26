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
        to={`/cities/${city._id}/edit`}
        state={{city}}
        
      >
        Edit
      </Link>
      
    </div>
    </div>  
  )
}

export default CityCard