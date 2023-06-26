import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const AllRestaurants = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating

  return (
    <Link to={`/restaurant/${id}`} className="Link" testid="restaurant-item">
      <li className="resturant-card">
        <img src={imageUrl} className="restuarant-image" alt="restaurant" />
        <div className="rating-description">
          <h1 className="heading1">{name}</h1>
          <p className="para2">{cuisine}</p>
          <div className="rating-container">
            <FaStar size="15px" color="#FFCC00" />
            <p className="rating">{rating}</p>
            <p className="para2">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default AllRestaurants
