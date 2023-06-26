import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {BiSearch} from 'react-icons/bi'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import AllRestaurants from '../AllResturants'
import Counter from '../Counter'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const allRestaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    carouselStatus: carouselApiStatusConstants.initial,
    carouselData: [],
    allRestaurantsStatus: allRestaurantsApiStatusConstants.initial,
    allResturentDate: [],
    selectSortByValue: sortByOptions[0].value,
    activePage: 1,
    searchInput: '',
    loaderFooter: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getCarouselData()
    this.getAllRestaurantsData()
  }

  getAllRestaurantsData = async () => {
    const {selectSortByValue, searchInput, activePage} = this.state
    this.setState({
      allRestaurantsStatus: allRestaurantsApiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const {restaurants} = data
      const convertedData = restaurants.map(object => ({
        costForTwo: object.cost_for_two,
        cuisine: object.cuisine,
        groupByTime: object.group_by_time,
        hasOnlineDelivery: object.has_online_delivery,
        hasTableBooking: object.has_table_booking,
        id: object.id,
        imageUrl: object.image_url,
        isDeliveringNow: object.is_delivering_now,
        location: object.location,
        menuType: object.menu_type,
        name: object.name,
        opensAt: object.opens_at,
        userRating: {
          rating: object.user_rating.rating,
          ratingColor: object.user_rating.rating_color,
          ratingText: object.user_rating.rating_text,
          totalReviews: object.user_rating.total_reviews,
        },
      }))
      this.setState({
        allRestaurantsStatus: allRestaurantsApiStatusConstants.success,
        allResturentDate: convertedData,
        loaderFooter: true,
      })
    } else if (response.ok === false) {
      this.setState({
        allRestaurantsStatus: allRestaurantsApiStatusConstants.failure,
      })
    }
  }

  getCarouselData = async () => {
    this.setState({carouselStatus: carouselApiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        carouselStatus: carouselApiStatusConstants.success,
        carouselData: data.offers,
      })
    }
  }

  getSelectedRestaurants = event => {
    this.setState(
      {selectSortByValue: event.target.value},
      this.getAllRestaurantsData,
    )
  }

  getSearchedRestaurants = event => {
    this.setState({searchInput: event.target.value}, this.getAllRestaurantsData)
  }

  carouselDisplayLoading = () => (
    <div className="Loader" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  restaurantsDisplayLoading = () => (
    <div className="Loader" data-testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  displayCarouselImages = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="SliderContainer">
        <Slider {...settings}>
          {carouselData.map(each => (
            <img
              src={each.image_url}
              alt="offer"
              key="carousel-image"
              className="CarouselImage"
            />
          ))}
        </Slider>
      </div>
    )
  }

  onRenderFinalCarousel = () => {
    const {carouselStatus} = this.state
    switch (carouselStatus) {
      case carouselApiStatusConstants.success:
        return this.displayCarouselImages()

      case carouselApiStatusConstants.inProgress:
        return this.carouselDisplayLoading()

      default:
        return null
    }
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  onRenderFilterSection = () => {
    const {selectSortByValue} = this.state
    return (
      <>
        <div className="filter-container">
          <div>
            <h1 className="heading">Popular Restaurants</h1>
            <p className="para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="search-container">
            <input
              id="searchInput"
              type="search"
              placeholder="Search Restaurant Here.."
              onChange={this.getSearchedRestaurants}
            />
            <BiSearch className="search-icon" />
          </div>
          <div className="selectByValues">
            <BsFilterLeft className="icon" />
            <p className="sort">Sort By</p>

            <select
              value={selectSortByValue}
              id="sortBy"
              className="selectBy"
              onChange={this.getSelectedRestaurants}
            >
              {sortByOptions.map(eachOption => (
                <option id={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr" />
      </>
    )
  }

  renderAllRestuarantsView = () => {
    const {allResturentDate} = this.state
    return (
      <ul className="all-restuarant-container">
        {allResturentDate.map(eachResturant => (
          <AllRestaurants item={eachResturant} id={eachResturant.id} />
        ))}
      </ul>
    )
  }

  renderFinalResturantView = () => {
    const {allRestaurantsStatus} = this.state
    switch (allRestaurantsStatus) {
      case allRestaurantsApiStatusConstants.success:
        return this.renderAllRestuarantsView()
      case allRestaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()

      default:
        return null
    }
  }

  render() {
    const {loaderFooter} = this.state
    return (
      <div className="home-container">
        <Header />
        {this.onRenderFinalCarousel()}
        {this.onRenderFilterSection()}
        {this.renderFinalResturantView()}
        <Counter pageChangeFunction={this.getActivePage} />
        {loaderFooter && <Footer />}
      </div>
    )
  }
}
export default Home

// ccbp submit RJSCPP63AV
