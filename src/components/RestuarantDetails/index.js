import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import PuffLoader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestuarantDetails extends Component {
  state = {
    resturantStatus: restaurantsApiStatusConstants.initial,
    restuarantsData: [],
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getRestuarantData()
  }

  convertItemsData = foodArray => {
    const item = {
      cost: foodArray.cost,
      foodType: foodArray.food_type,
      id: foodArray.id,
      imageUrl: foodArray.image_url,
      name: foodArray.name,
      rating: foodArray.rating,
    }

    return item
  }

  convertData = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      foodItems: object.food_items.map(eachItem =>
        this.convertItemsData(eachItem),
      ),
      restaurantId: object.id,
      imageUrl: object.image_url,
      itemCount: object.items_count,
      location: object.location,
      name: object.name,
      opensAt: object.opens_at,
      rating: object.rating,
      reviewsCount: object.reviews_count,
    }
    return converted
  }

  getRestuarantData = async () => {
    this.setState({resturantStatus: restaurantsApiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const convertedData = this.convertData(data)
      console.log(convertedData)
      this.setState({
        resturantStatus: restaurantsApiStatusConstants.success,
        restuarantsData: convertedData,
      })
    }
  }

  renderResturantDetails = () => {
    const {restuarantsData} = this.state

    const {
      costForTwo,
      name,
      restaurantId,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restuarantsData
    const {foodItems} = restuarantsData

    return (
      <>
        <div className="rest-banner-box">
          <div className="rest-image-details" key={restaurantId}>
            <img src={imageUrl} alt="rest-banner" className="rest-d-image" />
            <div className="rest-d-details">
              <h1 className="rest-d-name">{name}</h1>
              <h5 className="rest-d-cuisine">{cuisine}</h5>
              <h4 className="rest-d-location">{location}</h4>
              <div className="rest-d-rating-costfortwo-box">
                <div className="rest-review-rating-box">
                  <div className="rest-d-rating-box">
                    <AiFillStar color="#ffffff" />
                    <h4 className="rest-d-rating">{rating}</h4>
                  </div>
                  <h4 className="rest-d-reviews-count">
                    {reviewsCount}+ Ratings
                  </h4>
                </div>
                <h1 className="rest-d-separation-pipe">|</h1>
                <div className="rest-d-costfortwo-box">
                  <h3 className="rest-d-costfortwo-amount">
                    <BiRupee /> {costForTwo}
                  </h3>
                  <h5 className="rest-d-costfortwo-text">Cost for two</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(e => (
            <FoodItem foodItem={e} restaurantName={name} key={e.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="cart-loader-box">
      <PuffLoader
        color="#F7931E"
        loading="true"
        size={130}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )

  renderFinalResturantView = () => {
    const {resturantStatus} = this.state
    switch (resturantStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderResturantDetails()
      case restaurantsApiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderFinalResturantView()}
        <Footer />
      </div>
    )
  }
}

export default RestuarantDetails
